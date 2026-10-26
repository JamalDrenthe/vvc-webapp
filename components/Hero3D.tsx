import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * VVC. 3D Hero — scroll-driven WebGL logo scene.
 *
 * Layout: een hoge "scroll-track" (outer) met een sticky 100vh stage (inner).
 * De scroll-voortgang van de track (0..1) stuurt het 3D-logo, de hero-kaart en de slogan.
 * Daarna loopt de pagina gewoon door met de bestaande secties.
 */

const PINK = '#f01159';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (min: number, max: number, v: number) => {
  const x = clamp01((v - min) / (max - min));
  return x * x * (3 - 2 * x);
};
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// SVG-coördinaten (viewBox van het logo) -> 3D-eenheden
const sx = (x: number) => (x - 500) * 0.0195;
const sy = (y: number) => (278 - y) * 0.0195;

function createRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(50, 40, 460, 470);
  grad.addColorStop(0.0, '#f01159');
  grad.addColorStop(0.32, '#df8fd9');
  grad.addColorStop(0.64, '#d44ec0');
  grad.addColorStop(0.84, '#491444');
  grad.addColorStop(1.0, '#f01159');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLetterPivot(
  shape: THREE.Shape,
  extrude: THREE.ExtrudeGeometryOptions,
  materials: THREE.Material[],
  outlineMat: THREE.LineBasicMaterial
) {
  const geo = new THREE.ExtrudeGeometry(shape, extrude);
  geo.computeBoundingBox();
  const center = new THREE.Vector3();
  geo.boundingBox!.getCenter(center);
  geo.translate(-center.x, -center.y, -center.z);

  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const pts = shape
    .getPoints(48)
    .map((p) => new THREE.Vector3(p.x - center.x, p.y - center.y, (extrude.depth ?? 0.4) / 2 + 0.045));
  mesh.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), outlineMat));

  const group = new THREE.Group();
  group.position.set(center.x, center.y, 0.05);
  group.add(mesh);
  group.userData = { homePos: group.position.clone(), homeRotZ: 0, isDot: false };
  return group;
}

interface Hero3DProps {
  onNavigate?: (page: string) => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onNavigate }) => {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sloganBoxRef = useRef<HTMLDivElement>(null);
  const sloganWrapRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLSpanElement>(null);
  const phrase2Ref = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGLineElement>(null);
  const sectionLabelRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    const track = trackRef.current;
    if (!mount || !track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- renderer ----------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 150);
    camera.position.set(0, 0, 15.2);

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(5.5, 8.5, 11.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 30;
    Object.assign(keyLight.shadow.camera, { left: -6.5, right: 6.5, top: 6.5, bottom: -6.5 });
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const pinkRim = new THREE.PointLight(0xf01159, 1.8, 26);
    pinkRim.position.set(6, -4, 5);
    scene.add(pinkRim);
    const plumSide = new THREE.PointLight(0xa54a97, 1.35, 26);
    plumSide.position.set(-6, 4, 4);
    scene.add(plumSide);

    // ---------- logo ----------
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const ringTex = createRingTexture();
    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(4.15, 0.068, 36, 220),
      new THREE.MeshPhysicalMaterial({ map: ringTex, roughness: 0.18, metalness: 0.15, clearcoat: 0.75 })
    );
    ringMesh.castShadow = true;
    logoGroup.add(ringMesh);

    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.15, 0.032, 20, 180),
      new THREE.MeshBasicMaterial({ color: 0xf01159, transparent: true, opacity: 0.32 })
    );
    glowRing.position.z = -0.18;
    logoGroup.add(glowRing);

    const discGeo = new THREE.CylinderGeometry(4.11, 4.11, 0.12, 120);
    discGeo.rotateX(Math.PI / 2);
    const disc = new THREE.Mesh(discGeo, new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.38, metalness: 0.15 }));
    disc.position.z = -0.22;
    disc.receiveShadow = true;
    logoGroup.add(disc);

    const frontMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0.15, metalness: 0.04, clearcoat: 0.75, clearcoatRoughness: 0.15
    });
    const sideMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1e4f0, emissive: 0xb81d62, emissiveIntensity: 0.22, roughness: 0.25, metalness: 0.1, clearcoat: 0.5
    });
    const outlineMat = new THREE.LineBasicMaterial({ color: 0xe3cce1, transparent: true, opacity: 0.85 });
    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.42, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 0.032, bevelThickness: 0.042
    };

    const v1 = new THREE.Shape();
    v1.moveTo(sx(354), sy(223));
    v1.lineTo(sx(387.5), sy(223));
    v1.lineTo(sx(392.5), sy(296));
    v1.lineTo(sx(426.5), sy(223));
    v1.lineTo(sx(459), sy(223));
    v1.lineTo(sx(405.5), sy(330));
    v1.lineTo(sx(369.5), sy(330));
    v1.closePath();

    const v2 = new THREE.Shape();
    v2.moveTo(sx(459), sy(223));
    v2.lineTo(sx(492.5), sy(223));
    v2.lineTo(sx(497.5), sy(296));
    v2.lineTo(sx(531.5), sy(223));
    v2.lineTo(sx(564), sy(223));
    v2.lineTo(sx(510.5), sy(330));
    v2.lineTo(sx(474.5), sy(330));
    v2.closePath();

    const c = new THREE.Shape();
    c.moveTo(sx(657), sy(260));
    c.bezierCurveTo(sx(655), sy(234), sx(636), sy(220), sx(608), sy(220));
    c.bezierCurveTo(sx(574), sy(220), sx(549), sy(246), sx(546), sy(282));
    c.bezierCurveTo(sx(543), sy(313), sx(565), sy(332), sx(598), sy(332));
    c.bezierCurveTo(sx(626), sy(332), sx(646), sy(317), sx(652), sy(291));
    c.lineTo(sx(620), sy(288));
    c.bezierCurveTo(sx(616), sy(301), sx(608), sy(306), sx(598), sy(306));
    c.bezierCurveTo(sx(583), sy(306), sx(577), sy(295), sx(579), sy(280));
    c.bezierCurveTo(sx(581), sy(260), sx(592), sy(246), sx(608), sy(246));
    c.bezierCurveTo(sx(618), sy(246), sx(624), sy(252), sx(625), sy(263));
    c.closePath();

    const letters: THREE.Group[] = [];
    [v1, v2, c].forEach((shape) => {
      const g = makeLetterPivot(shape, extrude, [frontMat, sideMat], outlineMat);
      logoGroup.add(g);
      letters.push(g);
    });

    const dotShape = new THREE.Shape();
    dotShape.absellipse(0, 0, 15.4 * 0.0195, 13.5 * 0.0195, 0, Math.PI * 2, false, 0);
    const dotGeo = new THREE.ExtrudeGeometry(dotShape, {
      depth: 0.46, bevelEnabled: true, bevelSegments: 8, steps: 1, bevelSize: 0.038, bevelThickness: 0.048
    });
    dotGeo.center();
    const dotMesh = new THREE.Mesh(
      dotGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0xf01159, emissive: 0xd41159, emissiveIntensity: 0.42, roughness: 0.14, metalness: 0.08, clearcoat: 0.9
      })
    );
    dotMesh.castShadow = true;
    dotMesh.receiveShadow = true;
    const dotGroup = new THREE.Group();
    dotGroup.position.set(sx(669), sy(317.5), 0.06);
    dotGroup.rotation.z = THREE.MathUtils.degToRad(24);
    dotGroup.add(dotMesh);
    dotGroup.userData = { homePos: dotGroup.position.clone(), homeRotZ: dotGroup.rotation.z, isDot: true };
    logoGroup.add(dotGroup);
    letters.push(dotGroup);

    // ---------- interactie ----------
    let targetScroll = 0;
    let smoothScroll = 0;
    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
    let clickImpulse = 0, clickWaveClock = 0, clickSpinBoost = 0;
    let visible = true;
    let rafId = 0;

    const stage = stageRef.current!;

    const spawnWave = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      const wave = document.createElement('div');
      wave.className = 'vvc-hero-wave';
      wave.style.left = `${clientX - rect.left}px`;
      wave.style.top = `${clientY - rect.top}px`;
      stage.appendChild(wave);
      window.setTimeout(() => wave.remove(), 950);
    };

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onCanvasClick = (e: MouseEvent) => {
      clickImpulse = 1;
      clickWaveClock = 0.001;
      clickSpinBoost = Math.PI * 2;
      spawnWave(e.clientX, e.clientY);
    };
    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      targetScroll = clamp01(-rect.top / total);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    renderer.domElement.addEventListener('click', onCanvasClick);
    onScroll();
    if (reduceMotion) smoothScroll = targetScroll;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(track);

    // ---------- loop ----------
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      smoothScroll = reduceMotion ? targetScroll : lerp(smoothScroll, targetScroll, 0.075);
      mouseX = lerp(mouseX, targetMouseX, 0.08);
      mouseY = lerp(mouseY, targetMouseY, 0.08);

      if (clickImpulse > 0.001) clickImpulse = Math.max(0, clickImpulse - dt * 1.4);
      if (clickSpinBoost > 0.001) clickSpinBoost *= Math.pow(0.07, dt);
      if (clickWaveClock > 0) {
        clickWaveClock += dt * 5.2;
        if (clickWaveClock > Math.PI * 2.2) clickWaveClock = 0;
      }

      const s = smoothScroll;

      // hero-kaart
      const fadeOut = smoothstep(0.04, 0.35, s);
      const card = cardRef.current;
      if (card) {
        card.style.opacity = String(1 - fadeOut);
        card.style.transform = `translate3d(0, ${(-fadeOut * 75).toFixed(1)}px, 0) scale(${(1 - fadeOut * 0.06).toFixed(3)})`;
        card.style.pointerEvents = 1 - fadeOut < 0.15 ? 'none' : 'auto';
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - smoothstep(0.0, 0.06, s));

      // HUD
      progressRef.current?.setAttribute('x2', (348 + s * 652).toFixed(1));
      if (sectionLabelRef.current) {
        sectionLabelRef.current.textContent = s < 0.35 ? '01 // INTRO' : s < 0.75 ? '02 // OVER VVC & DE CLUB' : '03 // WERKWIJZE';
      }

      // logo-compositie
      const isDesktop = window.innerWidth >= 1024;
      const introFocus = 1 - smoothstep(0.02, 0.4, s);
      const offX = isDesktop ? 3.55 * introFocus : 0.85 * introFocus;
      const offY = isDesktop ? 0.25 * introFocus : 1.75 * introFocus;
      const offZ = isDesktop ? -0.8 * introFocus : -4.2 * introFocus;

      const deconstruct = Math.sin(smoothstep(0.12, 0.7, s) * Math.PI);
      const lockIn = smoothstep(0.5, 0.88, s);
      const raiseY = smoothstep(0.2, 0.6, s) * 1.15;

      logoGroup.position.set(offX, offY + raiseY + Math.sin(time * 1.5) * 0.05, offZ);
      const tiltY = Math.sin(s * Math.PI * 2) * 0.36 * (1 - lockIn * 0.65) - introFocus * 0.28;
      const tiltX = deconstruct * -0.22 + introFocus * 0.08;
      logoGroup.rotation.y = tiltY + mouseX * 0.18 + Math.sin(time * 0.8) * 0.04;
      logoGroup.rotation.x = tiltX - mouseY * 0.12 + Math.cos(time * 0.7) * 0.03;

      ringMesh.rotation.z = time * 0.14 + s * Math.PI * 1.6 + clickSpinBoost * 0.5;
      ringMesh.rotation.y = deconstruct * 0.38;
      ringMesh.rotation.x = deconstruct * 0.25;
      ringMesh.scale.setScalar(1 + deconstruct * 0.04 + clickImpulse * 0.12);

      glowRing.rotation.z = -time * 0.18 - s * Math.PI;
      glowRing.scale.setScalar(1.01 + deconstruct * 0.07 + clickImpulse * 0.22);
      (glowRing.material as THREE.MeshBasicMaterial).opacity = 0.26 + deconstruct * 0.35 + clickImpulse * 0.45;

      letters.forEach((grp, idx) => {
        const home = grp.userData.homePos as THREE.Vector3;
        const stagger = idx * 0.55;
        const zStep = deconstruct * (1.18 - idx * 0.18);
        const yArc = deconstruct * Math.sin(s * Math.PI * 3 + stagger) * 0.34;
        const xSpread = deconstruct * (idx - 1.5) * 0.24;
        const wave = clickWaveClock > 0 ? Math.max(0, Math.sin(clickWaveClock - idx * 0.55)) : 0;

        grp.position.set(
          home.x + xSpread,
          home.y + yArc + wave * 0.28,
          home.z + zStep + wave * 1.15 + clickImpulse * 0.25
        );
        grp.rotation.y = deconstruct * Math.sin(s * Math.PI * 2 + idx) * 0.48 + wave * 0.85;
        grp.rotation.x = deconstruct * Math.cos(s * Math.PI * 2 + idx) * 0.26 - wave * 0.4;

        if (grp.userData.isDot) {
          grp.scale.setScalar(1 + Math.sin(time * 3.8) * 0.06 + lockIn * 0.16 + clickImpulse * 0.48);
          grp.rotation.z = grp.userData.homeRotZ + s * Math.PI * 2 + clickSpinBoost;
        } else {
          grp.scale.setScalar(1 + deconstruct * 0.06 + wave * 0.14);
        }
      });

      camera.position.set(
        mouseX * 0.35,
        mouseY * 0.25,
        15.2 - deconstruct * 1.1 + lockIn * 0.35 - clickImpulse * 0.65
      );
      camera.lookAt(0, -0.15, 0);

      pinkRim.position.x = Math.cos(time * 1.1 + s * 4) * 6.5;
      pinkRim.position.y = Math.sin(time * 1.1 + s * 4) * 4.5;
      pinkRim.intensity = 1.6 + deconstruct * 0.8 + clickImpulse * 2.0;

      // slogan
      const p1 = Math.max(smoothstep(0.18, 0.42, s), clickImpulse * 0.95);
      const e1 = easeOutBack(p1);
      const box = sloganBoxRef.current;
      const ph1 = phrase1Ref.current;
      if (box) box.style.opacity = String(p1);
      if (ph1) {
        ph1.style.opacity = String(p1);
        ph1.style.filter = `blur(${((1 - p1) * 4).toFixed(1)}px)`;
        ph1.style.letterSpacing = `${(-0.03 + (1 - p1) * 0.1).toFixed(3)}em`;
        ph1.style.transform = `translate3d(0, ${((1 - p1) * 36).toFixed(1)}px, 0) rotateX(${((1 - p1) * -35).toFixed(1)}deg) scale(${(0.9 + e1 * 0.1).toFixed(3)})`;
      }

      const p2 = Math.max(smoothstep(0.3, 0.58, s), clickImpulse * 0.95);
      const e2 = easeOutBack(p2);
      const ph2 = phrase2Ref.current;
      if (ph2) {
        ph2.style.opacity = String(p2);
        ph2.style.filter = `blur(${((1 - p2) * 5).toFixed(1)}px)`;
        ph2.style.letterSpacing = `${(-0.03 + (1 - p2) * 0.12).toFixed(3)}em`;
        ph2.style.transform = `translate3d(0, ${((1 - p2) * 40).toFixed(1)}px, 0) rotateX(${((1 - p2) * -40).toFixed(1)}deg) scale(${(0.88 + e2 * 0.12 + clickImpulse * 0.05).toFixed(3)})`;
      }

      const lp = Math.max(smoothstep(0.35, 0.65, s), clickImpulse * 0.9);
      const ul = underlineRef.current;
      if (ul) {
        ul.style.width = `${(lp * Math.min(window.innerWidth * 0.72, 520)).toFixed(1)}px`;
        ul.style.opacity = String(lp);
      }
      if (sloganWrapRef.current) {
        sloganWrapRef.current.style.transform = `rotateY(${(mouseX * 5).toFixed(2)}deg) rotateX(${(-mouseY * 4).toFixed(2)}deg)`;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ---------- cleanup ----------
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      stage.querySelectorAll('.vvc-hero-wave').forEach((n) => n.remove());
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) mat.dispose();
      });
      ringTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section ref={trackRef} id="home-hero" className="relative w-full" style={{ height: '240vh' }}>
      <style>{`
        .vvc-hero-wave{position:absolute;width:7rem;height:7rem;border-radius:9999px;pointer-events:none;z-index:60;
          border:2px solid rgba(240,17,89,.75);box-shadow:0 0 40px rgba(240,17,89,.45);
          transform:translate(-50%,-50%) scale(.3);animation:vvcWave .95s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes vvcWave{0%{transform:translate(-50%,-50%) scale(.3);opacity:.95}100%{transform:translate(-50%,-50%) scale(4.2);opacity:0}}
        .vvc-ruler{background-image:repeating-linear-gradient(to right,rgba(255,255,255,.22) 0,rgba(255,255,255,.22) 1px,transparent 1px,transparent 10px),
          repeating-linear-gradient(to right,rgba(255,255,255,.42) 0,rgba(255,255,255,.42) 1px,transparent 1px,transparent 50px);
          background-size:100% 8px,100% 15px;background-repeat:no-repeat}
        .vvc-scrim{background:radial-gradient(120% 95% at 25% 50%,rgba(8,8,11,.94) 0%,rgba(8,8,11,.84) 55%,rgba(8,8,11,.45) 100%);
          backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.75)}
        .vvc-slogan-pill{background:rgba(8,8,11,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
          border:1px solid rgba(240,17,89,.35);box-shadow:0 16px 48px rgba(0,0,0,.85)}
        .vvc-plum-text{background:linear-gradient(135deg,#ff3b7f 0%,#ff1e68 42%,#e866d5 85%,#ffb0f2 100%);
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 4px 18px rgba(240,17,89,.45))}
        .vvc-film-line{height:3px;border-radius:9999px;background:linear-gradient(90deg,transparent,#f01159,#d44ec0,#a54a97,transparent)}
      `}</style>

      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-[#08080b]">
        {/* WebGL canvas */}
        <div ref={mountRef} className="absolute inset-0 z-10" aria-hidden="true" />

        {/* Fallback als WebGL niet beschikbaar is */}
        {webglFailed && (
          <div className="absolute inset-0 z-10 flex items-center justify-end pr-[8%] opacity-60">
            <img src="/vvc-logo.svg" alt="VVC" className="w-56 sm:w-80 lg:w-[26rem] drop-shadow-[0_0_40px_rgba(240,17,89,0.45)]" />
          </div>
        )}

        {/* Blueprint HUD: meetliniaal + coördinaten (onder de bestaande navbar) */}
        <div className="absolute top-[60px] md:top-[68px] left-0 right-0 z-20 pointer-events-none">
          <div className="border-t border-white/15">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 relative">
              <div className="w-3/5 sm:w-1/2 h-4 vvc-ruler opacity-75" />
              <div className="absolute right-4 sm:right-10 top-2 font-mono text-[10px] sm:text-xs tracking-[0.16em] text-white/80 uppercase">
                AMSTERDAM <span style={{ color: PINK }}>|</span> 52° 22' N&nbsp; 4° 53' E
              </div>
            </div>
          </div>
        </div>

        {/* Linker as */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-7xl mx-auto">
          <div className="absolute left-3.5 sm:left-6 top-28 bottom-16 w-px bg-white/10">
            <div className="absolute top-1/4 left-0 w-2 h-px bg-white/25" />
            <div className="absolute top-2/4 left-0 w-2 h-px bg-white/25" />
            <div className="absolute top-3/4 left-0 w-2 h-px bg-white/25" />
          </div>
        </div>

        {/* Hero-kaart */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center pt-24 pb-20 px-5 sm:px-12 md:px-16 max-w-7xl mx-auto">
          <div ref={cardRef} className="vvc-scrim pointer-events-auto w-full max-w-xl lg:max-w-2xl rounded-xl p-6 sm:p-9 will-change-transform">
            <div className="inline-block mb-5 px-3 py-1 border text-xs font-mono font-bold tracking-[0.22em] uppercase rounded-sm"
              style={{ borderColor: 'rgba(240,17,89,.6)', background: 'rgba(240,17,89,.1)', color: '#ff3b7f' }}>
              DE VVC BLAUWDRUK
            </div>
            <h1 className="text-[2.1rem] leading-[1.04] sm:text-6xl md:text-[4rem] font-black uppercase tracking-tight mb-5 sm:mb-6 break-words">
              <span className="block text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">KWALITEIT ALS</span>
              <span className="block drop-shadow-[0_2px_24px_rgba(240,17,89,0.45)]" style={{ color: PINK }}>HOOGSTE VALUTA.</span>
            </h1>
            <p className="text-base sm:text-lg leading-[1.65] text-white/90 font-medium mb-7 sm:mb-9 max-w-lg">
              Welkom bij de Verdienende Vrienden Club. Wij zijn geen traditioneel bureau, maar een prestatiegericht ecosysteem. Wij elimineren ruis en valideren workflows om organisaties naar hun absolute top te brengen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full">
              <a
                href="#register"
                onClick={() => onNavigate?.('register')}
                className="w-full py-4 px-6 rounded-md text-white font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: PINK, boxShadow: '0 10px 30px -5px rgba(240,17,89,.45)' }}
              >
                Offerte aanvragen
              </a>
              <a
                href="#register"
                onClick={() => onNavigate?.('register')}
                className="w-full py-4 px-6 rounded-md text-white font-extrabold text-sm sm:text-base uppercase tracking-[0.08em] text-center bg-black/70 border border-white/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#f01159] hover:bg-[#f01159]/10"
              >
                Word lid van de club
              </a>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="absolute left-0 right-0 bottom-[11vh] z-30 pointer-events-none flex flex-col items-center" style={{ perspective: '1100px' }}>
          <div ref={sloganWrapRef} className="px-4 text-center" style={{ transformStyle: 'preserve-3d' }}>
            <div
              ref={sloganBoxRef}
              className="vvc-slogan-pill px-5 sm:px-10 py-3 sm:py-5 rounded-2xl inline-flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-5"
              style={{ opacity: 0 }}
            >
              <span ref={phrase1Ref} className="inline-block font-black italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white" style={{ opacity: 0 }}>
                Geen bazen,
              </span>
              <span ref={phrase2Ref} className="inline-block font-black italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight vvc-plum-text" style={{ opacity: 0 }}>
                maar partners!
              </span>
            </div>
            <div className="w-full flex justify-center mt-3 sm:mt-4">
              <div ref={underlineRef} className="vvc-film-line" style={{ width: 0, opacity: 0 }} />
            </div>
          </div>
        </div>

        {/* Onderste HUD */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none pb-3 sm:pb-4 pt-6 bg-gradient-to-t from-[#08080b]/95 via-[#08080b]/70 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div ref={hintRef} className="text-center mb-1 font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
              Scroll ↓
            </div>
            <div className="relative w-full h-7 flex items-center">
              <svg className="w-full h-7 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 28" aria-hidden="true">
                <path d="M 0,4 L 315,4 L 340,18 L 1000,18" fill="none" stroke={PINK} strokeWidth="1.6" strokeOpacity="0.85" />
                <line x1="342" y1="14" x2="1000" y2="14" stroke={PINK} strokeWidth="1.2" strokeOpacity="0.4" />
                <line x1="348" y1="23" x2="1000" y2="23" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" strokeLinecap="round" />
                <line ref={progressRef} x1="348" y1="23" x2="348" y2="23" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span ref={sectionLabelRef} className="absolute left-1 bottom-0 font-mono text-xs font-bold tracking-[0.14em] text-white uppercase">
                01 // INTRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
