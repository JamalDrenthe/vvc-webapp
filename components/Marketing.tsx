import React, { useState, useEffect, Suspense } from 'react';
import { 
  Zap, X, Menu, Linkedin, Euro, Briefcase, Users, CheckCircle, BarChart3, 
  ShieldCheck, Search, TrendingUp, ArrowRight, Target, Globe, Facebook, Instagram, Youtube,
  Heart, Crown, Quote, Monitor, MapPin, Phone, FileText, CheckSquare, Clock, ChevronDown, ChevronUp
} from 'lucide-react';

export const Ticker = () => (
  <div className="w-full relative bg-[#09090d]/90 text-white py-3.5 overflow-hidden border-y border-white/10 backdrop-blur-md z-20 my-20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,0,126,0.12),transparent_70%)] pointer-events-none"></div>
    <div className="flex whitespace-nowrap overflow-hidden">
      <div className="animate-marqueeYZ flex items-center space-x-8 text-sm md:text-base font-black tracking-widest uppercase">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="flex items-center text-pink-400"><Zap className="w-4 h-4 mr-2 fill-pink-500 text-pink-500" /> DJOBBA MATCH: HIGH-TICKET CLOSER</span>
            <span className="mx-4 text-white/20">///</span>
            <span className="flex items-center text-yellow-400 font-bold">13 ACTIEVE GIGS & OPDRACHTEN</span>
            <span className="mx-4 text-white/20">///</span>
            <span className="flex items-center text-cyan-400"><Zap className="w-4 h-4 mr-2 fill-cyan-400 text-cyan-400" /> INVESTOR RELATIONS MANAGER</span>
            <span className="mx-4 text-white/20">///</span>
            <span className="flex items-center text-white/90">72U FACTORING • 100% REMOTE</span>
            <span className="mx-4 text-white/20">///</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export const MarketingNavbar = ({ currentPage, onNavigate, onLogin }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDrawerOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  const navLinks = [
    { name: 'Over Ons', id: 'about' },
    { name: 'Werkwijze', id: 'process' },
    { name: 'Vacatures', id: 'careers' },
    { name: 'Aanmelden', id: 'register' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsDrawerOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300" role="banner">
      {/* VVC Navbar Band */}
      <div 
        className={`relative flex items-center justify-between px-6 py-3.5 md:py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)]' 
            : 'bg-[#050508]/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        {/* Left VVC. Wordmark (Clean & Uncluttered Blueprint Aesthetic) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          className="group flex items-center focus:outline-none cursor-pointer"
          aria-label="VVC Home"
        >
          <span className="text-3xl md:text-4xl font-black italic tracking-tighter text-white select-none group-hover:opacity-90 transition-opacity">
            VVC<span className="text-[#e6007e]">.</span>
          </span>
        </a>

        {/* Desktop Elegant Center Links */}
        <nav id="inlineDesktopNav" className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer relative py-1 ${
                  isActive ? 'text-white' : ''
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>}
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Member Portal link & Custom 3-Bar Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="https://login.verdienendevrienden.club/"
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Inloggen
          </a>
          
          <button 
            ref={buttonRef}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white transition-colors focus:outline-none cursor-pointer group"
            aria-label="Toggle Navigation Menu" 
            aria-expanded={isDrawerOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isDrawerOpen ? 'rotate-45 translate-y-2 bg-[#e6007e]' : 'group-hover:bg-[#e6007e]'}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-200 ${isDrawerOpen ? 'opacity-0 scale-0' : 'group-hover:bg-[#e6007e]'}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isDrawerOpen ? '-rotate-45 -translate-y-2 bg-[#e6007e]' : 'group-hover:bg-[#e6007e]'}`}></span>
          </button>
        </div>

        {/* Bottom Neon Pink Laser Line & Glow Bloom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/80 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-1 left-0 right-0 h-[6px] bg-gradient-to-r from-transparent via-pink-500/35 to-transparent blur-[3px] pointer-events-none"></div>

        {/* Interactive Slide-Down Navigation Menu Drawer */}
        {isDrawerOpen && (
          <div 
            ref={drawerRef}
            id="navDrawer" 
            className="absolute right-4 md:right-8 top-full mt-3 w-[calc(100vw-2rem)] sm:w-96 bg-[#09090e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-[120] animate-in fade-in slide-in-from-top-2 duration-200"
            role="dialog"
            aria-label="Navigatiemenu"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-pink-500">VVC. Navigatie</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live Ecosysteem
              </span>
            </div>

            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Home</div>
                    <div className="text-xs text-zinc-400">Join the Money Movement</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Over VVC &amp; De Club</div>
                    <div className="text-xs text-zinc-400">Onze visie, netwerk en filosofie</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('process')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Werkwijze &amp; Methodologie</div>
                    <div className="text-xs text-zinc-400">360-graden aanpak &amp; kwaliteitsborging</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('careers')}
                  className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Vacatures &amp; Traineeships</div>
                    <div className="text-xs text-zinc-400">Senior Closer, Resourcer &amp; Consultant</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">→</span>
                </button>
              </li>
              <li>
                <a 
                  href="https://pitch.verdienendevrienden.club/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Interactieve Pitch</div>
                    <div className="text-xs text-zinc-400">Bekijk de live partner presentatie</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://login.verdienendevrienden.club/" 
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors">Member Dashboard / CRM</div>
                    <div className="text-xs text-zinc-400">Centrale inlog voor partners en talent</div>
                  </div>
                  <span className="text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all">↗</span>
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-white/10">
              <button 
                onClick={() => handleNavClick('register')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all text-center block cursor-pointer"
              >
                Direct Aanmelden bij VVC.
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export const MarketingFooter = ({ onNavigate, onLogin }: any) => {
  return (
    <footer id="contact" className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src="/vvc-logo.svg" alt="VVC Logo" className="w-8 h-8 rounded-full border border-pink-500/30 object-contain shadow-[0_0_15px_rgba(230,0,126,0.3)]" />
            <div className="text-2xl font-black italic tracking-tighter text-white">
              VVC<span className="text-pink-500">.</span>
            </div>
          </div>
          <p className="text-slate-500 max-w-sm mb-6">
            Wij optimaliseren bedrijfsprocessen en klantcontact met unieke strategie, technologie en uitvoering.
          </p>
          <div className="flex space-x-4">
            {[
                { icon: <Linkedin size={20} />, href: "#", label: "Volg ons op LinkedIn" },
                { icon: <Facebook size={20} />, href: "#", label: "Volg ons op Facebook" },
                { icon: <Instagram size={20} />, href: "#", label: "Volg ons op Instagram" },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>, href: "#", label: "Volg ons op TikTok" },
                { icon: <Youtube size={20} />, href: "#", label: "Abonneer op ons YouTube kanaal" }
            ].map((social, i) => (
                <a key={i} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                    {social.icon}
                </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#about" className="hover:text-pink-500 transition-colors text-left text-sm font-medium block">Over VVC</a></li>
            <li><a href="#process" className="hover:text-pink-500 transition-colors text-left text-sm font-medium block">Hoe het werkt</a></li>
            <li><a href="#careers" className="hover:text-pink-500 transition-colors text-left text-sm font-medium block">Vacatures</a></li>
            <li><a href="https://login.verdienendevrienden.club/" className="hover:text-pink-500 transition-colors text-left text-sm font-bold text-white block">Inloggen</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>Amsterdam, Nederland</li>
            <li>info@verdienendevrienden.club</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} Verdienende Vrienden Club – Alle rechten voorbehouden.
      </div>
    </footer>
  );
};

export const MarketingCalculator = ({ onNavigate }: any) => {
  const [hours, setHours] = useState(20);
  const [placements, setPlacements] = useState(5);
  const [total, setTotal] = useState(0);

  const HOURLY_RATE = 30; 
  const COMMISSION = 300;
  const PASSIVE = 25; 

  useEffect(() => {
    const monthlyBase = (hours * 4 * HOURLY_RATE);
    const monthlyCommission = (placements * COMMISSION);
    const monthlyPassive = (placements * PASSIVE);
    setTotal(monthlyBase + monthlyCommission + monthlyPassive);
  }, [hours, placements]);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">BEREKEN JE POTENTIEEL</h2>
            <p className="text-slate-400">Speel met uren en plaatsingen en zie direct je basis, bonus en passieve stroom.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-white font-bold mb-4">
                  <span>Beluren per week</span>
                  <span className="text-pink-500">{hours}u</span>
                </div>
                <input type="range" aria-label="Beluren per week" min="0" max="40" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>Part-time</span><span>Full-time</span></div>
              </div>
              <div>
                <div className="flex justify-between text-white font-bold mb-4">
                  <span>Plaatsingen per maand</span>
                  <span className="text-purple-500">{placements}</span>
                </div>
                <input type="range" aria-label="Plaatsingen per maand" min="0" max="20" value={placements} onChange={(e) => setPlacements(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm text-slate-300">
                <p>💡 <strong className="text-white">Passief Inkomen:</strong> Elke plaatsing levert €25 p/m op zolang de kandidaat werkt. Dit stapelt elke maand op!</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 border border-purple-500/30 rounded-2xl p-8 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10">
                 <div className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-2">Geschat Maandinkomen</div>
                 <div className="text-6xl font-black text-white mb-2">€{total.toLocaleString()}</div>
                 <div className="text-slate-400 text-sm mb-8">excl. cumulatieve passieve groei</div>
                 <a href="#careers" className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-xl hover:shadow-pink-500/20 block">Start met verdienen</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3D scroll-driven hero (three.js) — lazy geladen zodat de rest van de site snel blijft
const Hero3D = React.lazy(() => import('./Hero3D'));

export const HeroSection = ({ onNavigate }: any) => (
  <Suspense fallback={<div className="w-full h-screen bg-[#08080b]" />}>
    <Hero3D onNavigate={onNavigate} />
  </Suspense>
);

export const Process = () => {
  const steps = [
    { id: 1, title: "De Aanvraag", desc: "Heeft u behoefte aan inzicht in uw reviews, workflows of klantbeleving? Vraag direct een offerte aan.", icon: <Briefcase /> },
    { id: 2, title: "De Match", desc: "Wij koppelen uw vraagstuk aan de juiste specialisten binnen onze club. Van IT-kwaliteitscontrole tot Mystery Shoppers.", icon: <Users /> },
    { id: 3, title: "De Check", desc: "Onze 'vrienden' gaan aan de slag. Discreet, professioneel en grondig. Workflow tests, systeem checks & verificatie.", icon: <CheckCircle /> },
    { id: 4, title: "Rapportage", desc: "U ontvangt een gedetailleerde rapportage. Niet alleen de pijnpunten, maar direct toepasbaar advies om te verbeteren.", icon: <BarChart3 /> }
  ];

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-black to-[#1a0b2e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic">ZO GAAN WE <span className="text-purple-500">TE WERK</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl">Van aanvraag tot optimalisatie: wij leveren geen rapporten voor in de lade, maar brandstof voor groei.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="absolute top-0 left-0 text-9xl font-black text-white/5 select-none -translate-y-8 z-0 transition-transform group-hover:translate-x-2">{step.id}</div>
              <div className="relative z-10 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm h-full hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-600/30">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 relative rounded-3xl overflow-hidden aspect-[21/9] border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay group-hover:bg-purple-900/0 transition-colors duration-500"></div>
            <img loading="lazy" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="VVC bedrijfsproces optimalisatie en workflow visualisatie" className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export const RegistrationSection = ({ defaultTab = 'talent', isPageTitle = false }: { defaultTab?: 'talent' | 'business', isPageTitle?: boolean }) => {
  const [activeTab, setActiveTab] = useState<'talent' | 'business'>(defaultTab);
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  const HeadingTag = isPageTitle ? 'h1' : 'h2';

  return (
    <section id="register" className="py-24 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Start Hier</div>
            <HeadingTag className="text-3xl md:text-5xl font-black text-white mb-6 italic">WORD ONDERDEEL VAN DE CLUB</HeadingTag>
            <p className="text-slate-400 text-lg">Kies je route: Talent of Partner.</p>
        </div>

        <div className="flex justify-center mb-12">
            <div className="bg-white/5 p-1.5 rounded-full inline-flex border border-white/10">
                <button
                    onClick={() => setActiveTab('talent')}
                    className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all ${activeTab === 'talent' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    Talent
                </button>
                <button
                    onClick={() => setActiveTab('business')}
                    className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all ${activeTab === 'business' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                    Bedrijven
                </button>
            </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
            <button 
                onClick={() => setIsFormExpanded(!isFormExpanded)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors z-20"
                aria-label={isFormExpanded ? "Verberg formulier" : "Toon formulier"}
            >
                {isFormExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {activeTab === 'talent' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-8 pr-12">
                        <h3 className="text-2xl font-bold text-white mb-2">Word Lid</h3>
                        <p className="text-slate-400 text-sm">Geen motivatiebrieven. Wij selecteren op professionaliteit en executie.</p>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isFormExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Volledige Naam</label>
                                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="Jouw naam" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mailadres</label>
                                        <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="jouw@email.nl" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefoonnummer</label>
                                        <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="06 12345678" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Woonplaats</label>
                                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="Amsterdam" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn Profiel</label>
                                    <input type="url" aria-label="LinkedIn profiel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="https://linkedin.com/in/..." />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="interest" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interesse in functie</label>
                                        <div className="relative">
                                            <select id="interest" aria-label="Interesse in functie" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option value="Investor Relations Manager">[01/13] Investor Relations Manager (Financieel)</option>
                                                <option value="Campagnemanager (Growth & Crowdfunding)">[02/13] Campagnemanager (Growth & Crowdfunding) (Marketing)</option>
                                                <option value="Sponsor- & Partnership Manager">[03/13] Sponsor- & Partnership Manager (Sales)</option>
                                                <option value="Executive Search Consultant">[04/13] Executive Search Consultant (Administratief)</option>
                                                <option value="360° Recruiter (IT-Detachering)">[05/13] 360° Recruiter (IT-Detachering) (Sales)</option>
                                                <option value="Tech Headhunter (AI & Engineering)">[06/13] Tech Headhunter (AI & Engineering) (IT)</option>
                                                <option value="High-Ticket Closer (B2B-Conversie)">[07/13] High-Ticket Closer (B2B-Conversie) (Sales)</option>
                                                <option value="Commercieel Agent (Compute & Huisvesting)">[08/13] Commercieel Agent (Compute & Huisvesting) (Sales)</option>
                                                <option value="B2B Sales Representative (SaaS & Ecosysteem)">[09/13] B2B Sales Representative (SaaS & Ecosysteem) (Sales)</option>
                                                <option value="Senior Strategy Consultant (AI & M&A)">[10/13] Senior Strategy Consultant (AI & M&A) (Financieel)</option>
                                                <option value="Subsidieconsultant (R&D & Vastgoed)">[11/13] Subsidieconsultant (R&D & Vastgoed) (Administratief)</option>
                                                <option value="Recruitment Consultant (Relocatie & Talent)">[12/13] Recruitment Consultant (Relocatie & Talent) (Sociaal Werk)</option>
                                                <option value="Corporate Funding Broker">[13/13] Corporate Funding Broker (Financieel)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ervaring in Sales</label>
                                        <div className="relative">
                                            <select aria-label="Ervaring in Sales" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option>Geen ervaring (Starter)</option>
                                                <option>1-2 jaar</option>
                                                <option>3-5 jaar</option>
                                                <option>5+ jaar (Expert)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Huidige Situatie</label>
                                        <div className="relative">
                                            <select aria-label="Huidige Situatie" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option>Loondienst (Fulltime)</option>
                                                <option>Loondienst (Parttime)</option>
                                                <option>Ondernemer / ZZP</option>
                                                <option>Student</option>
                                                <option>Werkzoekend</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inkomensdoel (p/m)</label>
                                        <div className="relative">
                                            <select aria-label="Inkomensdoel per maand" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option>€3.000 - €5.000 p/m</option>
                                                <option>€5.000 - €10.000 p/m</option>
                                                <option>€10.000+ p/m</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beschikbaarheid (uren p/w)</label>
                                        <div className="relative">
                                            <select aria-label="Beschikbaarheid per week" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option>10-20 uur</option>
                                                <option>20-30 uur</option>
                                                <option>30-40 uur</option>
                                                <option>40+ uur (Fulltime)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hoe ken je ons?</label>
                                        <div className="relative">
                                            <select aria-label="Hoe ken je ons" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                                                <option>Instagram</option>
                                                <option>LinkedIn</option>
                                                <option>TikTok</option>
                                                <option>Via via</option>
                                                <option>Anders</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Motivatie</label>
                                    <textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors min-h-[100px]" placeholder="Waarom ben jij de juiste persoon voor VVC?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white font-black uppercase tracking-wider py-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center">
                                    Start Onboarding <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-8 pr-12">
                        <h3 className="text-2xl font-bold text-white mb-2">Word Partner</h3>
                        <p className="text-slate-400 text-sm">Vraag een offerte aan voor kwaliteitscontrole, workflowtesten of mystery shopping.</p>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isFormExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bedrijfsnaam</label>
                                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Bedrijfsnaam B.V." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contactpersoon</label>
                                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="Naam contactpersoon" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mailadres</label>
                                        <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="naam@bedrijf.nl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefoonnummer</label>
                                        <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="020 1234567" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Website</label>
                                        <input type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="https://www.bedrijf.nl" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bedrijfsgrootte (FTE)</label>
                                        <div className="relative">
                                            <select aria-label="Bedrijfsgrootte in FTE" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer">
                                                <option>1-10 medewerkers</option>
                                                <option>11-50 medewerkers</option>
                                                <option>51-200 medewerkers</option>
                                                <option>200+ medewerkers</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sector</label>
                                        <div className="relative">
                                            <select aria-label="Sector" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer">
                                                <option>Financiële Dienstverlening</option>
                                                <option>Vastgoed & Makelaardij</option>
                                                <option>Automotive</option>
                                                <option>High-End Retail</option>
                                                <option>Overig</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Omvang Sales Team</label>
                                        <div className="relative">
                                            <select aria-label="Omvang Sales Team" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer">
                                                <option>Geen (Startend)</option>
                                                <option>1-5 verkopers</option>
                                                <option>5-15 verkopers</option>
                                                <option>15+ verkopers</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gewenste Startdatum</label>
                                        <div className="relative">
                                            <select aria-label="Gewenste Startdatum" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer">
                                                <option>Zo snel mogelijk</option>
                                                <option>Binnen 1 maand</option>
                                                <option>Binnen 3 maanden</option>
                                                <option>Oriënterend</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primaire Dienst</label>
                                        <div className="relative">
                                            <select aria-label="Primaire Dienst" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer">
                                                <option>Kwaliteitscontrole</option>
                                                <option>Workflowtesten</option>
                                                <option>Mystery Shopping</option>
                                                <option>Anders</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wat is uw grootste uitdaging?</label>
                                    <textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors min-h-[100px]" placeholder="Bijv. lage conversie, onduidelijke processen, kwaliteit van leads..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-black uppercase tracking-wider py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center">
                                    Offerte Aanvragen <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export const RecruitmentCTA = ({ onNavigate }: any) => {
  return (
    <section id="careers" className="py-32 bg-black relative overflow-hidden px-6">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0f0f0f] to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04]"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[80px] -mr-48 -mt-48 group-hover:bg-pink-600/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[60px] -ml-32 -mb-32"></div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                  <span>Now Hiring</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight break-words">
                  Verdien <span className="text-transparent bg-clip-text pr-[0.2em] -mr-[0.2em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-gradient-to-r from-yellow-300 to-yellow-500">€8.000+</span> p/m
                </h3>
                <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                  Wij zoeken ambitieuze Junior Consultants en Sales Duo's die klaar zijn om hun eigen route te bouwen. Geen plafond, geen limiet.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                  <a href="#careers" className="group/btn bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-pink-500/30 hover:scale-105 flex items-center">
                    Bekijk Vacatures <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <a href="#register" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center group/link">
                    <span className="w-8 h-[1px] bg-slate-600 group-hover/link:bg-white group-hover/link:w-12 mr-3 transition-all"></span>
                    Direct Solliciteren
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex -space-x-2">
                    {[
                      'bg-gradient-to-br from-pink-400 to-pink-600',
                      'bg-gradient-to-br from-purple-400 to-purple-600',
                      'bg-gradient-to-br from-yellow-400 to-yellow-600',
                    ].map((bg, i) => (
                      <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-[#0f0f0f] flex items-center justify-center text-[9px] font-bold text-white`}>
                        {['JD', 'AK', 'MV'][i]}
                      </div>
                    ))}
                  </div>
                  <span className="font-medium">12+ vrienden gestart deze maand</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '€30/u', label: 'Basis Uurloon', icon: <Clock className="w-5 h-5" />, accent: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 text-yellow-400' },
                  { value: '€300', label: 'Per Plaatsing', icon: <TrendingUp className="w-5 h-5" />, accent: 'from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400' },
                  { value: '€25 p/m', label: 'Passief Inkomen', icon: <Zap className="w-5 h-5" />, accent: 'from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400' },
                  { value: '∞', label: 'Geen Plafond', icon: <Crown className="w-5 h-5" />, accent: 'from-white/10 to-white/5 border-white/10 text-white' },
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${stat.accent} border rounded-2xl p-5 backdrop-blur-sm hover:scale-105 transition-all duration-300 group/card`}>
                    <div className={`${stat.accent.split(' ').pop()} mb-3 opacity-60 group-hover/card:opacity-100 transition-opacity`}>{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Services = () => {
  const services = [
    { title: "Kwaliteitscontrole", description: "Grondige checks van reviews en productspecificaties. Wij zorgen dat jouw reputatie kogelvrij blijft.", icon: <ShieldCheck className="w-8 h-8 text-pink-500" />, color: "border-pink-500/50 hover:shadow-pink-500/20" },
    { title: "Systeem- & Workflowtesten", description: "Analyseren en optimaliseren van interne bedrijfsprocessen. Efficiëntie is onze valuta.", icon: <BarChart3 className="w-8 h-8 text-purple-500" />, color: "border-purple-500/50 hover:shadow-purple-500/20" },
    { title: "Mystery Shopping", description: "Echte klantervaringen in kaart brengen. Wij zien wat jij mist en leveren de oplossing.", icon: <Search className="w-8 h-8 text-yellow-400" />, color: "border-yellow-400/50 hover:shadow-yellow-400/20" }
  ];
  return (
    <section id="about" className="py-24 bg-black relative">
       <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { value: "€50k+", label: "Gemiddeld OTE", icon: <Briefcase className="w-5 h-5" /> },
                { value: "9.8", label: "Recensies", icon: <TrendingUp className="w-5 h-5" /> },
                { value: "Elite", label: "Focus Sectoren", icon: <ShieldCheck className="w-5 h-5" /> },
                { value: "150+", label: "klanten", icon: <Users className="w-5 h-5" /> },
            ].map((stat, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl text-center group hover:border-white/30 transition-all">
                    <div className="flex justify-center mb-3 text-slate-400 group-hover:text-white transition-colors">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">{stat.label}</div>
                </div>
            ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">WAT WIJ DOEN</h2>
          <p className="text-slate-400 text-lg mb-12">Wij bieden diepgaande kwaliteitscontroles, variërend van digitale audits tot fysieke inspecties. Onze focus ligt op absolute perfectie.</p>
          <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay group-hover:bg-purple-500/0 transition-colors duration-500"></div>
            <img loading="lazy" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt="VVC kwaliteitscontrole en mystery shopping diensten" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`bg-slate-900/40 p-8 rounded-3xl border border-white/10 ${service.color} transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80`}>
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export const HomePage = ({ onNavigate }: any) => (
  <>
    <HeroSection onNavigate={onNavigate} />
    <Ticker />
    <Services />
    <Process />
    <RecruitmentCTA onNavigate={onNavigate} />
  </>
);

export const AboutPage = ({ onNavigate }: any) => (
    <div className="bg-[#050505] min-h-screen pt-24 selection:bg-pink-500 selection:text-white relative">
      {/* Header Section */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-6 text-pink-400 font-black tracking-[0.3em] text-xs uppercase border border-pink-500/30 bg-pink-500/10 px-4 py-2 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">The Story</div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-8 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            HET SNIJVLAK TUSSEN <br/>
            <span className="text-transparent bg-clip-text pr-[0.2em] -mr-[0.2em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">VRIENDSCHAP</span> EN ONGEKENDE GROEI
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Welkom bij de Verdienende Vrienden Club. Wij zijn geen traditioneel bedrijf. <span className="text-white font-bold">Wij zijn een ecosysteem.</span>
          </p>
        </div>
      </div>
      <Ticker />
      {/* Intro & Identity Split */}
      <div className="max-w-7xl mx-auto px-6 mb-32 mt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-black text-white italic">GEEN BAZEN,<br/><span className="text-purple-400">MAAR PARTNERS.</span></h3>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Bij VVC geloven we dat het oude werkmodel kapot is. De tijd van uurtje-factuurtje voor een baas, kantoorpolitiek en een vast plafond aan je inkomen is voorbij. Wij herschrijven de regels van succes.
              </p>
              <p>
                VVC is opgericht met één duidelijk doel: het creëren van een omgeving waar <strong className="text-white">kwaliteit</strong> de hoogste valuta is en waar <strong className="text-white">expertise</strong> direct wordt beloond met exponentiële groei.
              </p>
              <p>
                Wij bieden de rugdekking van een gevestigde club, met de vrijheid van het ondernemerschap.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 opacity-30 blur-xl rounded-3xl group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="bg-[#111] border border-white/10 p-10 rounded-3xl relative shadow-2xl backdrop-blur-sm">
              <Quote className="w-12 h-12 text-pink-500 mb-6 opacity-80" />
              <p className="text-2xl font-bold text-white italic leading-relaxed mb-6">
                "Voor onze klanten zijn wij de strategische partner die ruis elimineert. Maar voor jou, ons talent, zijn wij een lanceerplatform."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">De VVC Filosofie</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DNA Pillars */}
      <div className="bg-[#0a0a0a] py-32 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">HET DNA VAN DE CLUB</h2>
            <p className="text-slate-300 text-lg">Onze cultuur is niet voor iedereen. Het is een omgeving voor winnaars.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-b from-white/10 to-white/5 p-[1px] rounded-3xl hover:from-pink-500/50 hover:to-purple-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="bg-[#111] p-8 h-full rounded-[22px] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-pink-500/20">
                  <Heart className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">1. Loyaliteit</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Vriendschap is onze basis. Wij geloven in eerlijke, gedreven samenwerking gericht op gedeeld succes. Geen ellebogenwerk, maar loyaliteit aan het resultaat.</p>
              </div>
            </div>

            <div className="group bg-gradient-to-b from-white/10 to-white/5 p-[1px] rounded-3xl hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="bg-[#111] p-8 h-full rounded-[22px] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">2. Executie</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Wij zijn doeners. "Resultaat is de enige waarheid." Plannen zijn mooi, maar impact is wat telt. Wij meten succes niet in uren, maar in output.</p>
              </div>
            </div>

            <div className="group bg-gradient-to-b from-white/10 to-white/5 p-[1px] rounded-3xl hover:from-yellow-400/50 hover:to-orange-500/50 transition-all duration-500 hover:scale-[1.02]">
              <div className="bg-[#111] p-8 h-full rounded-[22px] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-opacity group-hover:opacity-100"></div>
                <div className="bg-yellow-400/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-yellow-400/20">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">3. Eigenaarschap</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Jij bent de "CEO van je eigen route". Wij faciliteren met leads en systemen, maar jij bepaalt je strategie, je inzet en je plafond.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-pink-900/5"></div>
        <div className="grid md:grid-cols-2 gap-8 mb-24 relative z-10">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 p-10 rounded-3xl flex flex-col justify-center text-center md:text-left hover:border-pink-500/30 transition-all duration-500 group shadow-2xl">
                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <span className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 md:justify-start justify-center"><Target size={14} /> Onze Missie</span>
                <h3 className="text-3xl md:text-4xl font-black text-white italic relative z-10">"Kwaliteit transformeren tot de hoogste valuta."</h3>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 p-10 rounded-3xl flex flex-col justify-center text-center md:text-left hover:border-purple-500/30 transition-all duration-500 group shadow-2xl">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <span className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2 md:justify-start justify-center"><Globe size={14} /> Onze Visie</span>
                <h3 className="text-3xl md:text-4xl font-black text-white italic relative z-10">"Een netwerk waar expertise wordt beloond met groei."</h3>
            </div>
        </div>

        {/* Why VVC */}
        <div className="max-w-5xl mx-auto relative z-10">
            <h3 className="text-3xl font-black text-white mb-12 text-center italic">WAAROM TALENT VOOR VVC KIEST</h3>
            <div className="space-y-6">
                <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start hover:bg-[#161616] hover:border-white/20 transition-all duration-300 shadow-xl group">
                    <div className="bg-pink-500/10 p-4 rounded-xl shrink-0 border border-pink-500/20 group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6 text-pink-400" /></div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Het Sneeuwbaleffect</h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Wij geloven niet in eenmalige beloningen. Bij VVC bouw je aan <strong className="text-white">passief inkomen</strong>. Elke succesvolle plaatsing levert je een maandelijkse fee op zolang de match bestaat.</p>
                    </div>
                </div>
                <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start hover:bg-[#161616] hover:border-white/20 transition-all duration-300 shadow-xl group">
                    <div className="bg-purple-500/10 p-4 rounded-xl shrink-0 border border-purple-500/20 group-hover:scale-110 transition-transform"><Target className="w-6 h-6 text-purple-400" /></div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Focus op Winnen</h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Je verspilt geen tijd aan koud bellen of admin. Je werkt met warme leads en focust 100% op scoren.</p>
                    </div>
                </div>
                <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start hover:bg-[#161616] hover:border-white/20 transition-all duration-300 shadow-xl group">
                    <div className="bg-yellow-400/10 p-4 rounded-xl shrink-0 border border-yellow-400/20 group-hover:scale-110 transition-transform"><Euro className="w-6 h-6 text-yellow-400" /></div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Ongekende Groei</h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">Onze 'vrienden' realiseren inkomsten die ver boven het marktgemiddelde liggen (OTE €50k - €95k), simpelweg omdat wij prestatie belonen zonder plafond.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Promise */}
      <div className="py-24 px-6 text-center border-t border-white/10 bg-gradient-to-b from-[#050505] to-pink-900/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 italic drop-shadow-lg">ONZE BELOFTE AAN JOU</h3>
            <p className="text-3xl md:text-4xl text-transparent bg-clip-text pr-[0.2em] -mr-[0.2em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-gradient-to-r from-pink-400 to-purple-400 font-black mb-12 drop-shadow-md">"GEGARANDEERDE GROEI VOOR ONZE VRIENDEN."</p>
            <p className="text-xl text-white mb-12 font-medium">Wij verliezen nooit. Win jij met ons mee?</p>
            
            <a href="#careers" className="group bg-white text-black px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl hover:shadow-pink-500/50 flex items-center mx-auto ring-4 ring-white/10 inline-flex">
                Start Jouw Route <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
      </div>
    </div>
);

export const ProcessPage = ({ onNavigate }: any) => {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 relative">
      {/* Header */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-6 text-purple-500 font-black tracking-[0.3em] text-xs uppercase border border-purple-500/30 px-4 py-2 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">How We Work</div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-8 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            UW KWALITEIT, <br/>
            <span className="text-transparent bg-clip-text pr-[0.2em] -mr-[0.2em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-gradient-to-r from-purple-500 to-blue-500">ONZE ZORG</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Van analyse tot optimalisatie. Wij helpen organisaties hun processen naar het hoogste niveau te tillen.
          </p>
        </div>
      </div>
      <Ticker />
      {/* Intro Text */}
      <div className="max-w-4xl mx-auto px-6 mb-32 mt-24 text-center">
        <p className="text-lg text-slate-400 leading-relaxed mb-6">
          Bij de Verdienende Vrienden Club (VVC) geloven we dat duurzaam succes wordt gebouwd op een fundament van <strong className="text-white">onberispelijke kwaliteit</strong>. Wij helpen organisaties hun processen, producten en klantcontact naar het hoogste niveau te tillen door ruis te elimineren en workflows te valideren.
        </p>
        <p className="text-lg text-slate-400 leading-relaxed">
          Onze aanpak is grondig, discreet en direct toepasbaar. Hieronder leest u hoe wij uw organisatie transformeren.
        </p>
      </div>

      {/* Methodology - 360 Degree */}
      <div className="bg-[#050505] py-32 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">ONZE METHODOLOGIE</h2>
            <p className="text-xl text-purple-500 font-bold tracking-wider uppercase">De 360-graden Aanpak</p>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto">Het analyseren van geïsoleerde processen geeft vaak een misleidend beeld. Daarom hanteren wij een compleet overzicht op drie niveaus.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-500 group">
                <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Monitor className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">1. Digitaal</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Een grondige evaluatie van uw digitale infrastructuur. Wij voeren online audits en systeemchecks uit om de robuustheid en efficiëntie van uw systemen te testen.</p>
             </div>
             <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-500 group">
                <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">2. Fysiek</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Wij richten ons op de tastbare aspecten. Onze specialisten voeren locatiebezoeken en gedetailleerde productinspecties uit om te verzekeren dat uw fysieke uitingen voldoen aan de hoogste standaarden.</p>
             </div>
             <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-500 group">
                <div className="bg-pink-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">3. Telefonisch</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Menselijke interactie is doorslaggevend. Wij auditen klantenservice- en salesgesprekken om de professionaliteit en consistentie van uw communicatie te beoordelen.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 italic text-center">ONZE DIENSTEN</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl">
                <CheckSquare className="w-10 h-10 text-green-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Kwaliteitscontrole</h3>
                <p className="text-slate-400 leading-relaxed">Wij voeren grondige checks uit op reviews en productspecificaties. Dit zorgt ervoor dat wat u communiceert naar de markt, daadwerkelijk overeenkomt met de realiteit. Wij identificeren discrepanties die uw merkreputatie kunnen schaden.</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl">
                <Zap className="w-10 h-10 text-yellow-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Systeem- & Workflowtesten</h3>
                <p className="text-slate-400 leading-relaxed">Processen moeten efficiënter lopen en fouten moeten afnemen. Wij analyseren en optimaliseren uw interne bedrijfsprocessen. Het resultaat is een directe optimalisatie van operationele effectiviteit.</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl">
                <Users className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Mystery Shopping</h3>
                <p className="text-slate-400 leading-relaxed">Wilt u weten wat er écht gebeurt tijdens een klantinteractie? Wij brengen echte klantervaringen in kaart—online, op locatie en telefonisch. Authentieke inzichten over de 'customer journey'.</p>
            </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-[#050505] py-32 border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">HET PROCES</h2>
                <p className="text-slate-400 text-lg">In 4 Stappen naar Resultaat. Transparant en direct toepasbaar.</p>
            </div>

            <div className="space-y-12 relative">
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 hidden md:block"></div>
                
                {[
                    { title: "Stap 1: De Aanvraag", desc: "Alles begint bij uw behoefte aan inzicht. Wilt u uw reviews verifiëren, workflows testen of de klantbeleving meten? U dient eenvoudig een aanvraag in om het proces te starten.", icon: "1" },
                    { title: "Stap 2: De Match", desc: "Na uw aanvraag koppelen wij uw vraagstuk aan de juiste specialisten binnen onze club. Zoekt u een IT-expert of een Mystery Shopper? Wij selecteren de expert met de specifieke domeinkennis.", icon: "2" },
                    { title: "Stap 3: De Check", desc: "Onze specialisten gaan aan de slag. Dit gebeurt discreet, professioneel en objectief. Afhankelijk van de opdracht voeren zij de workflow-tests, productkennis-toetsingen of review-verificaties uit.", icon: "3" },
                    { title: "Stap 4: Rapportage & Optimalisatie", desc: "U ontvangt niet alleen data, maar inzichten. Een gedetailleerde rapportage met direct toepasbaar advies. U krijgt heldere prioriteiten en acties zodat uw teams direct kunnen bijsturen.", icon: "4" }
                ].map((step, idx) => (
                    <div key={idx} className="flex gap-8 items-start relative">
                        <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border-2 border-purple-500 flex items-center justify-center shrink-0 z-10">
                            <span className="text-xl font-black text-white">{step.icon}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex-grow hover:bg-white/10 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Why VVC & CTA */}
      <div className="py-32 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-16 italic">WAAROM VVC?</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div>
                    <div className="text-purple-500 font-bold text-xl mb-2">Objectiviteit</div>
                    <p className="text-slate-400 text-sm">Wij doorbreken interne blindheid met onafhankelijke checks.</p>
                </div>
                <div>
                    <div className="text-purple-500 font-bold text-xl mb-2">Direct Resultaat</div>
                    <p className="text-slate-400 text-sm">Onze adviezen zijn gericht op onmiddellijke efficiëntiewinst.</p>
                </div>
                <div>
                    <div className="text-purple-500 font-bold text-xl mb-2">Bewezen Impact</div>
                    <p className="text-slate-400 text-sm">"Concrete verbeterpunten die direct toepasbaar zijn."</p>
                </div>
            </div>

            <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-6">Wilt u de kwaliteit binnen uw organisatie waarborgen?</h3>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Vraag vrijblijvend een offerte aan. We denken graag met u mee over de beste aanpak voor uw situatie.</p>
                    <a href="#register" className="bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all shadow-xl hover:shadow-purple-500/30 block w-full md:w-auto text-center">
                        Offerte Aanvragen
                    </a>
                </div>
            </div>
        </div>
      </div>

      <RegistrationSection defaultTab="business" />
      <Ticker />
    </div>
  );
};

export const RegisterPage = () => (
  <div className="bg-black min-h-screen pt-24 relative">
    <Ticker />
    <RegistrationSection defaultTab="talent" />
  </div>
);

export const CareersPage = ({ onNavigate }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [activeSector, setActiveSector] = useState<string>('Alle');

  const vacancies = [
  {
    "id": "vac_ir_01",
    "code": "01/13",
    "title": "Investor Relations Manager",
    "subtitle": "Corporate / Pre-IPO • Financieel",
    "sector": "Financieel",
    "domain": "Corporate / Pre-IPO",
    "type": "VAST / HYBRIDE",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succesfee",
    "compensationDetail": "Salaris in overleg + succesfee over elk aangebracht en gecontracteerd investeringsvolume",
    "location": "100% remote (reisbereidheid voor internationale roadshows)",
    "factoringAvailable": true,
    "experience": "5+ jaar corporate finance, private equity, venture capital of IR",
    "description": "Ter voorbereiding op een internationale beursnotering en meerdere kapitaalrondes zoeken wij een Investor Relations Manager. Je bent het vaste aanspreekpunt richting de financiële markt en onderhoudt relaties met institutionele beleggers, family offices en strategische co-investeerders.",
    "role": "Werven en onboarden van institutionele investeerders en kapitaalverstrekkers. Regisseren van de internationale IR-roadshow en het bookbuilding-proces. Presenteren van groeimodellen, kwartaalcijfers en IFRS-rapportage aan investeringscomités. Schakelen met corporate finance-adviseurs, toezichthouders, juristen en auditors",
    "tasks": [
      "Werven en onboarden van institutionele investeerders en kapitaalverstrekkers",
      "Regisseren van de internationale IR-roadshow en het bookbuilding-proces",
      "Presenteren van groeimodellen, kwartaalcijfers en IFRS-rapportage aan investeringscomités",
      "Schakelen met corporate finance-adviseurs, toezichthouders, juristen en auditors"
    ],
    "profile": [
      "HBO/WO in finance, economie of bedrijfskunde, of gelijkwaardige ervaring",
      "Aantoonbaar netwerk binnen institutioneel kapitaal, family offices en private equity",
      "Nederlands en Engels op boardroomniveau",
      "Ervaring met IFRS, kapitaalmarkttransacties en pre-IPO-trajecten"
    ],
    "requirements": [
      "HBO/WO in finance, economie of bedrijfskunde, of gelijkwaardige ervaring",
      "Aantoonbaar netwerk binnen institutioneel kapitaal, family offices en private equity",
      "Nederlands en Engels op boardroomniveau",
      "Ervaring met IFRS, kapitaalmarkttransacties en pre-IPO-trajecten"
    ],
    "skills": [
      "Investor Relations",
      "Corporate Finance",
      "Pre-IPO",
      "IFRS",
      "Private Equity",
      "Bookbuilding"
    ],
    "rewards": [
      "Salaris in overleg + succesfee over elk aangebracht en gecontracteerd investeringsvolume",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (reisbereidheid voor internationale roadshows) (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_cmp_02",
    "code": "02/13",
    "title": "Campagnemanager (Growth & Crowdfunding)",
    "subtitle": "Growth & crowdfunding • Marketing",
    "sector": "Marketing",
    "domain": "Growth & crowdfunding",
    "type": "VAST / HYBRIDE",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + campagnevergoeding",
    "compensationDetail": "Salaris in overleg + vergoeding per geactiveerd B2B-lid en voltooide financieringscampagne",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar growth marketing, B2B of crowdfunding",
    "description": "Je bent verantwoordelijk voor de B2B-wervingscampagnes en co-financieringstrajecten voor nieuwe hardware- en vastgoedprojecten. Je bouwt datagedreven funnels die op Europese schaal converteren.",
    "role": "Ontwerpen, lanceren en optimaliseren van crowdfunding- en ledenwervingscampagnes. Uitrollen van multi-channel campagnes (LinkedIn, Meta, Google, programmatic, e-mail) voor Europese wervingshubs. Continueren van A/B-tests op landingspagina's, advertenties en onboarding-flows. Monitoren van campagnedata, acquisitiekosten (CAC) en funnelconversie",
    "tasks": [
      "Ontwerpen, lanceren en optimaliseren van crowdfunding- en ledenwervingscampagnes",
      "Uitrollen van multi-channel campagnes (LinkedIn, Meta, Google, programmatic, e-mail) voor Europese wervingshubs",
      "Continueren van A/B-tests op landingspagina's, advertenties en onboarding-flows",
      "Monitoren van campagnedata, acquisitiekosten (CAC) en funnelconversie"
    ],
    "profile": [
      "HBO/WO in marketing, communicatie of data-analyse, of gelijkwaardige ervaring",
      "Minimaal 3 jaar ervaring met B2B performance marketing, leadgeneratie of grootschalige crowdfundingcampagnes",
      "Sterk in zowel copywriting als data-analyse",
      "Ondernemend en resultaatgericht"
    ],
    "requirements": [
      "HBO/WO in marketing, communicatie of data-analyse, of gelijkwaardige ervaring",
      "Minimaal 3 jaar ervaring met B2B performance marketing, leadgeneratie of grootschalige crowdfundingcampagnes",
      "Sterk in zowel copywriting als data-analyse",
      "Ondernemend en resultaatgericht"
    ],
    "skills": [
      "Growth Marketing",
      "B2B Funnels",
      "Crowdfunding",
      "Performance Ads",
      "A/B Testing",
      "CAC Optimalisatie"
    ],
    "rewards": [
      "Salaris in overleg + vergoeding per geactiveerd B2B-lid en voltooide financieringscampagne",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_spm_03",
    "code": "03/13",
    "title": "Sponsor- & Partnership Manager",
    "subtitle": "Media, tech, events • Sales",
    "sector": "Sales",
    "domain": "Media, tech, events",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + dealvergoeding",
    "compensationDetail": "Salaris in overleg + percentage van elke gecontracteerde sponsor- of partnership-deal",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar B2B-partnerships, media of sponsoring",
    "description": "Je sluit commerciële samenwerkingen, sponsorcontracten en strategische allianties voor de media-, compute- en community-platforms van de groep.",
    "role": "Binnenhalen van B2B-sponsors, adverteerders en mediapartners voor evenementen, platforms en hubs. Initiëren van samenwerkingen met hardwareleveranciers, vastgoedpartijen en softwarelicentiepartners. Ontwikkelen van sponsorpakketten en joint-venture-voorstellen. Voeren van onderhandelingen van eerste pitch tot getekend contract",
    "tasks": [
      "Binnenhalen van B2B-sponsors, adverteerders en mediapartners voor evenementen, platforms en hubs",
      "Initiëren van samenwerkingen met hardwareleveranciers, vastgoedpartijen en softwarelicentiepartners",
      "Ontwikkelen van sponsorpakketten en joint-venture-voorstellen",
      "Voeren van onderhandelingen van eerste pitch tot getekend contract"
    ],
    "profile": [
      "HBO/WO, of vergelijkbare werkervaring",
      "Ervaring in B2B-sales, sponsorwerving, media-exploitatie of strategic partnerships",
      "Commercieel sterk, representatief en zelfsturend"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare werkervaring",
      "Ervaring in B2B-sales, sponsorwerving, media-exploitatie of strategic partnerships",
      "Commercieel sterk, representatief en zelfsturend"
    ],
    "skills": [
      "Strategic Partnerships",
      "B2B Sponsoring",
      "Contractonderhandeling",
      "Joint Ventures",
      "Media Exploitatie"
    ],
    "rewards": [
      "Salaris in overleg + percentage van elke gecontracteerde sponsor- of partnership-deal",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_esc_04",
    "code": "04/13",
    "title": "Executive Search Consultant",
    "subtitle": "Boardroom & C-level • Administratief",
    "sector": "Administratief",
    "domain": "Boardroom & C-level",
    "type": "VAST / HYBRIDE",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + plaatsingsfee",
    "compensationDetail": "Salaris in overleg + plaatsingsfee per geplaatste executive gebaseerd op jaarsalaris",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "5+ jaar executive search of boardroom consulting",
    "description": "Je werft boardroomposities voor de eigen holdings en voor opdrachtgevers van de B2B recruitment-marketplace. Je opereert op strategisch niveau en bent verantwoordelijk voor het vinden en binden van bestuurders en toezichthouders.",
    "role": "Werven van statutaire directieleden, non-executive directors (RvC) en country managers. Plaatsen van C-level executives (CIO, CTO, Chief AI Officer, VP Engineering) bij externe opdrachtgevers. Begeleiden van het volledige search-, selectie- en benoemingsproces op boardroomniveau",
    "tasks": [
      "Werven van statutaire directieleden, non-executive directors (RvC) en country managers",
      "Plaatsen van C-level executives (CIO, CTO, Chief AI Officer, VP Engineering) bij externe opdrachtgevers",
      "Begeleiden van het volledige search-, selectie- en benoemingsproces op boardroomniveau"
    ],
    "profile": [
      "HBO/WO, of gedegen praktijkervaring",
      "Minimaal 5 jaar ervaring bij een executive search-bureau of als senior headhunter voor C-level posities",
      "Gesprekspartner voor CEO's, commissarissen en investeringsmaatschappijen",
      "Nederlands en Engels vloeiend"
    ],
    "requirements": [
      "HBO/WO, of gedegen praktijkervaring",
      "Minimaal 5 jaar ervaring bij een executive search-bureau of als senior headhunter voor C-level posities",
      "Gesprekspartner voor CEO's, commissarissen en investeringsmaatschappijen",
      "Nederlands en Engels vloeiend"
    ],
    "skills": [
      "Executive Search",
      "Boardroom Consulting",
      "C-Level Recruitment",
      "Directie & RvC",
      "Succession Planning"
    ],
    "rewards": [
      "Salaris in overleg + plaatsingsfee per geplaatste executive gebaseerd op jaarsalaris",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_rec_05",
    "code": "05/13",
    "title": "360° Recruiter (IT-Detachering)",
    "subtitle": "IT-detachering • Sales",
    "sector": "Sales",
    "domain": "IT-detachering",
    "type": "VAST / HYBRIDE",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + margedeling",
    "compensationDetail": "Salaris in overleg + margedeling over gerealiseerde detacheringsomzet",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "2+ jaar 360°-recruitment of IT-detachering",
    "description": "Je beheert zowel de klantkant (IT-detacheringsopdrachten) als de kandidatenkant (selectie en plaatsing van internationale specialisten die via de eigen relocatie-tak instromen).",
    "role": "Binnenhalen van B2B IT-detacheringscontracten en aanvragen. Matchen van vooraf geverifieerde kennismigranten en IT-professionals aan jouw klantportefeuille. Voeren van tariefonderhandelingen, begeleiden van sollicitatiegesprekken en afsluiten van contracten via het recruitment-systeem",
    "tasks": [
      "Binnenhalen van B2B IT-detacheringscontracten en aanvragen",
      "Matchen van vooraf geverifieerde kennismigranten en IT-professionals aan jouw klantportefeuille",
      "Voeren van tariefonderhandelingen, begeleiden van sollicitatiegesprekken en afsluiten van contracten via het recruitment-systeem"
    ],
    "profile": [
      "HBO/WO, of vergelijkbare ervaring",
      "Ervaring als 360°-recruiter, accountmanager of consultant in IT-, engineering- of tech-detachering",
      "Commercieel gedreven, proactief en relatiegericht",
      "Ervaring met moderne recruitmentsoftware en matchingtools"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare ervaring",
      "Ervaring als 360°-recruiter, accountmanager of consultant in IT-, engineering- of tech-detachering",
      "Commercieel gedreven, proactief en relatiegericht",
      "Ervaring met moderne recruitmentsoftware en matchingtools"
    ],
    "skills": [
      "360 Recruitment",
      "IT Detachering",
      "Tariefonderhandeling",
      "Account Management",
      "Kandidaat Matching"
    ],
    "rewards": [
      "Salaris in overleg + margedeling over gerealiseerde detacheringsomzet",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_thh_06",
    "code": "06/13",
    "title": "Tech Headhunter (AI & Engineering)",
    "subtitle": "AI & engineering • IT",
    "sector": "IT",
    "domain": "AI & engineering",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succesfee",
    "compensationDetail": "Salaris in overleg + succesfee per geplaatste en geverifieerde tech-specialist",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Aantoonbare ervaring in tech-sourcing of direct search",
    "description": "Je spoort wereldwijd AI-engineers, systeemarchitecten en senior developers op voor externe B2B-klanten en de eigen R&D-, AI- en hardware-afdelingen. Voor geplaatste kandidaten regelt de groep ook visum en huisvesting.",
    "role": "Actief sourcen via GitHub, LinkedIn Recruiter, StackOverflow en eigen sourcing-tools. Overtuigen van internationaal talent met het totaalpakket: baan, visum, relocatie en huisvesting. Begeleiden van kandidaten door technische assessments tot contractondertekening",
    "tasks": [
      "Actief sourcen via GitHub, LinkedIn Recruiter, StackOverflow en eigen sourcing-tools",
      "Overtuigen van internationaal talent met het totaalpakket: baan, visum, relocatie en huisvesting",
      "Begeleiden van kandidaten door technische assessments tot contractondertekening"
    ],
    "profile": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Ervaring met het sourcen van schaarse developers en engineers",
      "Bekend met Python, Rust, Kubernetes en LLM-architecturen",
      "Vloeiend Engels, comfortabel met kandidaten in verschillende tijdzones"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Ervaring met het sourcen van schaarse developers en engineers",
      "Bekend met Python, Rust, Kubernetes en LLM-architecturen",
      "Vloeiend Engels, comfortabel met kandidaten in verschillende tijdzones"
    ],
    "skills": [
      "Direct Search",
      "Tech Sourcing",
      "AI Engineers",
      "Python / Rust",
      "GitHub Sourcing",
      "Relocatie"
    ],
    "rewards": [
      "Salaris in overleg + succesfee per geplaatste en geverifieerde tech-specialist",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_htc_07",
    "code": "07/13",
    "title": "High-Ticket Closer (B2B-Conversie)",
    "subtitle": "B2B-conversie • Sales",
    "sector": "Sales",
    "domain": "B2B-conversie",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week (flexibele agenda)",
    "compensation": "Salaris + commissie",
    "compensationDetail": "Salaris in overleg + commissie per gecontracteerde B2B-transactie",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Aantoonbaar trackrecord in high-ticket closing",
    "description": "Je voert de eindgesprekken met warme, voorgekwalificeerde zakelijke leads en sluit de deals voor de gecombineerde proposities (compute, digitale infrastructuur, zakelijk vastgoed). Koude acquisitie is geen onderdeel van de functie.",
    "role": "Voeren van consultatieve videocalls en telefoongesprekken met zakelijke beslissers. Toelichten van de modulaire B2B-pakketten en het rendement van het ecosysteem. Zorgen dat overeenkomsten tijdens of direct na het gesprek digitaal worden ondertekend. Afstemmen met marketing en sales over leadkwaliteit",
    "tasks": [
      "Voeren van consultatieve videocalls en telefoongesprekken met zakelijke beslissers",
      "Toelichten van de modulaire B2B-pakketten en het rendement van het ecosysteem",
      "Zorgen dat overeenkomsten tijdens of direct na het gesprek digitaal worden ondertekend",
      "Afstemmen met marketing en sales over leadkwaliteit"
    ],
    "profile": [
      "HBO/WO, of gelijkwaardige saleservaring",
      "Trackrecord in consultative selling en high-ticket closing (bij voorkeur B2B SaaS, finance, vastgoed of consultancy)",
      "Sterk in actief luisteren, bezwaren behandelen en vertrouwen opbouwen",
      "Resultaatgericht en gedisciplineerd"
    ],
    "requirements": [
      "HBO/WO, of gelijkwaardige saleservaring",
      "Trackrecord in consultative selling en high-ticket closing (bij voorkeur B2B SaaS, finance, vastgoed of consultancy)",
      "Sterk in actief luisteren, bezwaren behandelen en vertrouwen opbouwen",
      "Resultaatgericht en gedisciplineerd"
    ],
    "skills": [
      "High-Ticket Closing",
      "Consultative Selling",
      "Deal Sluiting",
      "Bezwaarhantering",
      "B2B Proposities"
    ],
    "rewards": [
      "Salaris in overleg + commissie per gecontracteerde B2B-transactie",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_cag_08",
    "code": "08/13",
    "title": "Commercieel Agent (Compute & Huisvesting)",
    "subtitle": "Compute & huisvesting • Sales",
    "sector": "Sales",
    "domain": "Compute & huisvesting",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week | Flexibel",
    "compensation": "Salaris + doorlopende courtage",
    "compensationDetail": "Salaris in overleg + doorlopende courtage over contractverlengingen van jouw portefeuille",
    "location": "100% remote (eigen regio-indeling mogelijk)",
    "factoringAvailable": true,
    "experience": "Zelfstandige B2B-sales of agentuurervaring",
    "description": "Je vertegenwoordigt de commerciële eindproducten van de operationele clusters in de zakelijke markt: GPU-rekenkracht, zakelijke account-infrastructuur en short-/long-stay huisvesting voor expats en projectteams.",
    "role": "Verkopen van GPU-servers en digitale infrastructuur aan AI-bedrijven, mediabureaus en tech-ondernemingen. Bemiddelen in B2B-huisvestingscontracten voor bedrijven die internationale specialisten huisvesten. Opbouwen en beheren van een eigen klantenkring met meerjarige afnamecontracten",
    "tasks": [
      "Verkopen van GPU-servers en digitale infrastructuur aan AI-bedrijven, mediabureaus en tech-ondernemingen",
      "Bemiddelen in B2B-huisvestingscontracten voor bedrijven die internationale specialisten huisvesten",
      "Opbouwen en beheren van een eigen klantenkring met meerjarige afnamecontracten"
    ],
    "profile": [
      "HBO/WO, of gedegen commerciële achtergrond",
      "Sterk zakelijk netwerk in tech, media of corporate vastgoed",
      "Zelfstandig, plant eigen agenda, bouwt graag aan terugkerende omzet"
    ],
    "requirements": [
      "HBO/WO, of gedegen commerciële achtergrond",
      "Sterk zakelijk netwerk in tech, media of corporate vastgoed",
      "Zelfstandig, plant eigen agenda, bouwt graag aan terugkerende omzet"
    ],
    "skills": [
      "GPU Compute",
      "Corporate Housing",
      "Cloud Infrastructuur",
      "B2B Agentuur",
      "Recurring Revenue"
    ],
    "rewards": [
      "Salaris in overleg + doorlopende courtage over contractverlengingen van jouw portefeuille",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (eigen regio-indeling mogelijk) (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_bsr_09",
    "code": "09/13",
    "title": "B2B Sales Representative (SaaS & Ecosysteem)",
    "subtitle": "SaaS & ecosysteem • Sales",
    "sector": "Sales",
    "domain": "SaaS & ecosysteem",
    "type": "VAST / HYBRIDE",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + commissie",
    "compensationDetail": "Salaris in overleg + commissie per gesloten B2B-deal plus maandelijkse staffelbonus",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "Junior / Medior / Senior",
    "description": "Je vult de commerciële pijplijn: je vertegenwoordigt de B2B SaaS-software (CRM, AI-outreach, workflow-automatisering) en de bredere ecosysteem-proposities, opent deuren bij nieuwe zakelijke klanten en zet contacten om in verkoopkansen en getekende orders.",
    "role": "Uitvoeren van gepersonaliseerde outbound campagnes via telefoon, videomessaging, e-mail en LinkedIn. Geven van online productdemo's aan MKB- en enterprise-bedrijven. Kwalificeren van zakelijke partijen en beheren van de eigen salesfunnel in samenwerking met de closers",
    "tasks": [
      "Uitvoeren van gepersonaliseerde outbound campagnes via telefoon, videomessaging, e-mail en LinkedIn",
      "Geven van online productdemo's aan MKB- en enterprise-bedrijven",
      "Kwalificeren van zakelijke partijen en beheren van de eigen salesfunnel in samenwerking met de closers"
    ],
    "profile": [
      "HBO/WO, of sterke aantoonbare saleservaring",
      "Communicatief vaardig, bestand tegen afwijzing, energie van nieuwe contacten",
      "Affiniteit met B2B SaaS, AI-tools en moderne salesmethodieken"
    ],
    "requirements": [
      "HBO/WO, of sterke aantoonbare saleservaring",
      "Communicatief vaardig, bestand tegen afwijzing, energie van nieuwe contacten",
      "Affiniteit met B2B SaaS, AI-tools en moderne salesmethodieken"
    ],
    "skills": [
      "B2B SaaS Sales",
      "Outbound Prospecting",
      "Product Demo's",
      "Pipeline Management",
      "CRMos"
    ],
    "rewards": [
      "Salaris in overleg + commissie per gesloten B2B-deal plus maandelijkse staffelbonus",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_ssc_10",
    "code": "10/13",
    "title": "Senior Strategy Consultant (AI & M&A)",
    "subtitle": "AI, werkkapitaal, M&A • Financieel",
    "sector": "Financieel",
    "domain": "AI, werkkapitaal, M&A",
    "type": "VAST / HYBRIDE",
    "duration": "32–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + projectfee",
    "compensationDetail": "Salaris in overleg + projectfee over de contractwaarde van elk enterprise-traject of M&A transactie",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "7+ jaar strategy consulting, M&A of enterprise IT",
    "description": "Je adviseert op directie- en C-level over AI-automatisering, werkkapitaaloptimalisatie en het begeleiden van fusies, overnames en integraties binnen het ecosysteem.",
    "role": "Adviseren van middelgrote en grote ondernemingen over AI-executiemotoren, B2B clearing-API's en werkstroomautomatisering. Identificeren, beoordelen (due diligence) en begeleiden van acquisities van tech-startups, softwarebedrijven en licentiepartners. Opstellen van business cases op boardroomniveau",
    "tasks": [
      "Adviseren van middelgrote en grote ondernemingen over AI-executiemotoren, B2B clearing-API's en werkstroomautomatisering",
      "Identificeren, beoordelen (due diligence) en begeleiden van acquisities van tech-startups, softwarebedrijven en licentiepartners",
      "Opstellen van business cases op boardroomniveau"
    ],
    "profile": [
      "WO-master in business, finance, economie of IT, of gelijkwaardig topniveau door ervaring",
      "Minimaal 7 jaar ervaring als strategy consultant, M&A-adviseur of enterprise transformation manager",
      "Diepgaand financieel inzicht (kasstroommodellen, waarderingen, WCO) en begrip van AI- en cloudarchitecturen"
    ],
    "requirements": [
      "WO-master in business, finance, economie of IT, of gelijkwaardig topniveau door ervaring",
      "Minimaal 7 jaar ervaring als strategy consultant, M&A-adviseur of enterprise transformation manager",
      "Diepgaand financieel inzicht (kasstroommodellen, waarderingen, WCO) en begrip van AI- en cloudarchitecturen"
    ],
    "skills": [
      "Strategy Consulting",
      "M&A Advisory",
      "Due Diligence",
      "Werkkapitaaloptimalisatie",
      "AI Transformatie"
    ],
    "rewards": [
      "Salaris in overleg + projectfee over de contractwaarde van elk enterprise-traject of M&A transactie",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_sub_11",
    "code": "11/13",
    "title": "Subsidieconsultant (R&D & Vastgoed)",
    "subtitle": "R&D, AI, duurzaamheid • Administratief",
    "sector": "Administratief",
    "domain": "R&D, AI, duurzaamheid",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + succespercentage",
    "compensationDetail": "Salaris in overleg + succespercentage over elk daadwerkelijk toegekend subsidiebedrag",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "3+ jaar als subsidieadviseur of grant writer",
    "description": "Binnen het ecosysteem wordt geïnvesteerd in eigen R&D en duurzame fysieke infrastructuur. Je haalt nationale, Britse en Europese innovatiesubsidies, tech-grants en fiscale regelingen binnen.",
    "role": "In kaart brengen van relevante regelingen (WBSO, MIT, Horizon Europe, UK Innovate, duurzaamheidsfondsen). Opstellen en indienen van technisch en financieel onderbouwde aanvragen in samenwerking met developers, AI-architecten en vastgoedmanagers. Benutten van fiscale voordelen rond kennismigranten en Europese innovatiehubs. Verzorgen van projectadministratie en eindverantwoording conform UK GAAP en IFRS",
    "tasks": [
      "In kaart brengen van relevante regelingen (WBSO, MIT, Horizon Europe, UK Innovate, duurzaamheidsfondsen)",
      "Opstellen en indienen van technisch en financieel onderbouwde aanvragen in samenwerking met developers, AI-architecten en vastgoedmanagers",
      "Benutten van fiscale voordelen rond kennismigranten en Europese innovatiehubs",
      "Verzorgen van projectadministratie en eindverantwoording conform UK GAAP en IFRS"
    ],
    "profile": [
      "HBO/WO, of vergelijkbare ervaring",
      "Aantoonbare ervaring als subsidieconsultant met sterk slagingspercentage, bij voorkeur op het snijvlak van IT, AI, innovatie en duurzaamheid",
      "Sterk in het vertalen van technische projecten naar beoordelingscriteria"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare ervaring",
      "Aantoonbare ervaring als subsidieconsultant met sterk slagingspercentage, bij voorkeur op het snijvlak van IT, AI, innovatie en duurzaamheid",
      "Sterk in het vertalen van technische projecten naar beoordelingscriteria"
    ],
    "skills": [
      "WBSO Subsidies",
      "Horizon Europe",
      "MIT Regeling",
      "Innovatiefinanciering",
      "Grant Writing"
    ],
    "rewards": [
      "Salaris in overleg + succespercentage over elk daadwerkelijk toegekend subsidiebedrag",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_rel_12",
    "code": "12/13",
    "title": "Recruitment Consultant (Relocatie & Talent)",
    "subtitle": "Internationaal talent • Sociaal Werk",
    "sector": "Sociaal Werk",
    "domain": "Internationaal talent",
    "type": "VAST / HYBRIDE",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + plaatsingsfee",
    "compensationDetail": "Salaris in overleg + plaatsingsfee per succesvolle gecontracteerde B2B-plaatsing",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "1+ jaar recruitment of HR",
    "description": "Je bent verantwoordelijk voor de kandidaatkant: je begeleidt gekwalificeerde kennismigranten door het verificatieproces en matcht hen aan openstaande B2B-vacatures op het platform.",
    "role": "Voeren van diepte-interviews en begeleiden van kandidaten door screening en verificatie. Matchen van gevalideerde IT-, engineering- en tech-specialisten aan openstaande vacatures via het ATS. Coördineren van de digitale overdracht na plaatsing, zodat zusterentiteiten visum, huisvesting en financiële onboarding in gang zetten",
    "tasks": [
      "Voeren van diepte-interviews en begeleiden van kandidaten door screening en verificatie",
      "Matchen van gevalideerde IT-, engineering- en tech-specialisten aan openstaande vacatures via het ATS",
      "Coördineren van de digitale overdracht na plaatsing, zodat zusterentiteiten visum, huisvesting en financiële onboarding in gang zetten"
    ],
    "profile": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Mensgericht en organisatorisch sterk",
      "Gestructureerd, vaardig met moderne HR-software",
      "Vloeiend Nederlands en Engels"
    ],
    "requirements": [
      "HBO/WO, of vergelijkbare praktijkervaring",
      "Mensgericht en organisatorisch sterk",
      "Gestructureerd, vaardig met moderne HR-software",
      "Vloeiend Nederlands en Engels"
    ],
    "skills": [
      "Relocatie Support",
      "Kandidaat Screening",
      "Kennismigranten",
      "Expat Onboarding",
      "ATS / CRMos"
    ],
    "rewards": [
      "Salaris in overleg + plaatsingsfee per succesvolle gecontracteerde B2B-plaatsing",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  },
  {
    "id": "vac_cfb_13",
    "code": "13/13",
    "title": "Corporate Funding Broker",
    "subtitle": "Hardware & vastgoed • Financieel",
    "sector": "Financieel",
    "domain": "Hardware & vastgoed",
    "type": "ZZP / INTERIM GIG",
    "duration": "24–40 uur/week | ZZP of Vast",
    "compensation": "Salaris + bemiddelingsfee",
    "compensationDetail": "Salaris in overleg + bemiddelingscourtage per afgesloten financieringslijn, lease of hypotheek",
    "location": "100% remote",
    "factoringAvailable": true,
    "experience": "5+ jaar debt advisory, corporate finance of leasing",
    "description": "Je structureert en bemiddelt zakelijke financieringen voor de uitbreiding van GPU-serverclusters, de vastgoedportefeuille en de interne factoring- en werkkapitaalfaciliteiten.",
    "role": "Ophalen en structureren van kredietlijnen, equipment lease-constructies en zakelijke vastgoedhypotheken. Bemiddelen bij banken, private debt-fondsen en BaaS/EMI-partners voor factoring- en liquiditeitslijnen. Presenteren van geconsolideerde cijfers (UK GAAP, IFRS) en onderpandstructuren aan kredietcomités",
    "tasks": [
      "Ophalen en structureren van kredietlijnen, equipment lease-constructies en zakelijke vastgoedhypotheken",
      "Bemiddelen bij banken, private debt-fondsen en BaaS/EMI-partners voor factoring- en liquiditeitslijnen",
      "Presenteren van geconsolideerde cijfers (UK GAAP, IFRS) en onderpandstructuren aan kredietcomités"
    ],
    "profile": [
      "HBO/WO, of gelijkwaardig vakmanschap",
      "Ervaring als zakelijk financieringsadviseur, debt broker, accountmanager grootzakelijk bij een bank of leasing-specialist",
      "Netwerk van kapitaalverstrekkers, leasemaatschappijen, private debt-fondsen en vastgoedfinanciers"
    ],
    "requirements": [
      "HBO/WO, of gelijkwaardig vakmanschap",
      "Ervaring als zakelijk financieringsadviseur, debt broker, accountmanager grootzakelijk bij een bank of leasing-specialist",
      "Netwerk van kapitaalverstrekkers, leasemaatschappijen, private debt-fondsen en vastgoedfinanciers"
    ],
    "skills": [
      "Debt Advisory",
      "Equipment Lease",
      "Vastgoedfinanciering",
      "Kredietstructurering",
      "IFRS"
    ],
    "rewards": [
      "Salaris in overleg + bemiddelingscourtage per afgesloten financieringslijn, lease of hypotheek",
      "100% voorschot binnen 72 uur via Djobba.works factoring rails",
      "100% remote (Volledige flexibiliteit en remote werkplek)"
    ]
  }
];

  const sectors = ['Alle', 'Financieel', 'Marketing', 'Sales', 'Administratief', 'IT', 'Sociaal Werk'];

  const filteredJobs = activeSector === 'Alle' 
    ? vacancies 
    : vacancies.filter((j: any) => j.sector === activeSector);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": vacancies.map((job: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "JobPosting",
            "title": job.title,
            "description": `<p>${job.description}</p>`,
            "datePosted": "2026-10-26",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Verdienende Vrienden Club & Djobba.works",
              "sameAs": "https://www.verdienendevrienden.club/"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Amsterdam",
                "addressCountry": "NL"
              }
            },
            "employmentType": job.type.includes('ZZP') ? "CONTRACTOR" : "FULL_TIME"
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen pt-24 relative">
        {/* Modal Overlay */}
        {selectedJob && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedJob(null)}></div>
                <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-[160] shadow-2xl animate-in fade-in zoom-in duration-300">
                    <button onClick={() => setSelectedJob(null)} aria-label="Sluit vacature details" className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-50">
                        <X className="text-white" size={24} />
                    </button>
                    
                    <div className="p-8 md:p-10">
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest">
                                [{selectedJob.code}] {selectedJob.type}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                {selectedJob.sector}
                              </span>
                              {selectedJob.factoringAvailable && (
                                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                                  72u Factoring
                                </span>
                              )}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 italic">{selectedJob.title}</h2>
                            <p className="text-base text-slate-400 font-mono">{selectedJob.domain} • {selectedJob.location}</p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-pink-500"/> Rolomschrijving</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{selectedJob.description}</p>
                            </div>

                            {selectedJob.tasks && selectedJob.tasks.length > 0 && (
                              <div>
                                  <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-purple-500"/> Belangrijkste Werkzaamheden</h3>
                                  <ul className="space-y-2">
                                      {selectedJob.tasks.map((task: string, i: number) => (
                                          <li key={i} className="text-slate-400 text-sm flex items-start">
                                              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                              {task}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                            )}

                            <div>
                                <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Users className="w-5 h-5 mr-2 text-yellow-400"/> Wie zoeken wij?</h3>
                                <ul className="space-y-2">
                                    {selectedJob.requirements.map((item: string, i: number) => (
                                        <li key={i} className="text-slate-400 text-sm flex items-start">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center"><Euro className="w-5 h-5 mr-2 text-green-400"/> Beloning & Condities</h3>
                                <div className="text-yellow-400 font-black text-lg mb-2">{selectedJob.compensation}</div>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">{selectedJob.compensationDetail}</p>
                                <ul className="space-y-2.5 pt-3 border-t border-white/10">
                                    <li className="text-slate-400 text-xs flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                        <span>Uren: <strong>{selectedJob.duration}</strong></span>
                                    </li>
                                    <li className="text-slate-400 text-xs flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                        <span>Locatie: <strong>{selectedJob.location}</strong></span>
                                    </li>
                                    <li className="text-slate-400 text-xs flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                        <span>Factoring SLA: <strong>100% voorschot binnen 72 uur via Djobba.works rails</strong></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Ecosysteem Partner Rails</h4>
                                <p className="text-slate-400 text-sm mb-4">Gecoördineerd via Verdienende Vrienden Club en direct gefactord via Djobba.works.</p>
                                <p className="text-white font-black italic text-center mb-6">Kwaliteit als hoogste valuta. Geen bazen, maar partners.</p>
                                <a href="#register" onClick={() => setSelectedJob(null)} className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-xl hover:shadow-pink-500/20 block text-center">Direct Solliciteren op deze Positie</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      <div className="text-center py-20 px-6 max-w-4xl mx-auto">
         <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase"><span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span><span>13 Actieve Posities in Werving</span></div>
         <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6">JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-14 pb-2">ECOSYSTEM</span></h1>
         <p className="text-xl text-slate-400 mb-12">Dezelfde realtime vacatures & gigs als op Djobba.works: 100% remote, directe matching en optie voor 72-uurs instant factoring.</p>
         <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay group-hover:bg-pink-500/0 transition-colors duration-500"></div>
            <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="VVC team en Djobba ecosysteem talent" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
         </div>
      </div>
      <Ticker />
      <div className="max-w-7xl mx-auto px-6 py-24" id="jobs">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-pink-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">Djobba.works Hub Sync</div>
            <h2 className="text-4xl font-black text-white italic">OPENSTAANDE VACATURES ({filteredJobs.length})</h2>
          </div>
          {/* Sector filter tabs */}
          <div className="flex flex-wrap gap-2">
            {sectors.map(s => (
              <button 
                key={s} 
                onClick={() => setActiveSector(s)} 
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${activeSector === s ? 'bg-pink-500 border-pink-500 text-white' : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job: any, i: number) => (
            <div key={job.id || i} className="bg-[#0f0f0f] border border-white/10 p-7 rounded-2xl hover:border-pink-500 transition-all group flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span className="text-pink-400 font-bold">[{job.code}]</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 text-[11px]">{job.sector}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-pink-400 transition-colors">{job.title}</h3>
                    <p className="text-slate-400 text-xs mb-4 leading-relaxed">{job.subtitle}</p>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-6 space-y-1.5">
                      <div className="text-xs text-slate-400">{job.type} • {job.duration}</div>
                      <div className="text-yellow-400 font-black text-sm">{job.compensation}</div>
                    </div>
                </div>
                <button onClick={() => setSelectedJob(job)} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-all shadow-lg hover:shadow-pink-500/20 text-sm">Bekijk Positie & Details</button>
            </div>
          ))}
        </div>
      </div>
      <MarketingCalculator onNavigate={onNavigate} />
      <RegistrationSection />
    </div>
  );
};

export const MarketingApp = ({ onLogin }: any) => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['home', 'about', 'process', 'careers', 'register'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Verdienende Vrienden Club - Join the Money Movement',
      about: 'Over Ons - Verdienende Vrienden Club',
      process: 'Hoe het werkt - Verdienende Vrienden Club',
      careers: 'Vacatures - Verdienende Vrienden Club',
      register: 'Aanmelden - Verdienende Vrienden Club',
    };
    
    const descriptions: Record<string, string> = {
      home: "Verdienende Vrienden Club (VVC) is een exclusief ecosysteem voor sales talent. Verdien €50k-€100k OTE, bouw passief inkomen en werk als partner.",
      about: "VVC is geen traditioneel bedrijf maar een ecosysteem. Wij bieden de rugdekking van een gevestigde club met de vrijheid van ondernemerschap.",
      process: "Van aanvraag tot optimalisatie: wij leveren geen rapporten voor in de lade, maar brandstof voor groei. Ontdek onze 360-graden aanpak.",
      careers: "Bekijk de 13 actieve vacatures en gigs binnen ons ecosysteem, gesynchroniseerd met Djobba.works. 100% remote, directe matching en 72-uurs factoring.",
      register: "Word onderdeel van de club. Start hier jouw route als Talent of Partner. Geen motivatiebrieven, wij selecteren op professionaliteit."
    };

    document.title = titles[currentPage] || 'Verdienende Vrienden Club';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[currentPage] || descriptions['home']);
    }
    
    // Scroll to top on page change unless it's just a section navigation within home
    window.scrollTo(0, 0);
  }, [currentPage]);

  const onNavigate = (page: string) => {
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={onNavigate} />;
      case 'about': return <AboutPage onNavigate={onNavigate} />;
      case 'process': return <ProcessPage onNavigate={onNavigate} />;
      case 'careers': return <CareersPage onNavigate={onNavigate} />;
      case 'register': return <RegisterPage />;
      default: return <HomePage onNavigate={onNavigate} />;
    }
  };
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-pink-500 selection:text-white flex flex-col">
      <MarketingNavbar currentPage={currentPage} onNavigate={onNavigate} onLogin={onLogin} />
      <main className="flex-grow">{renderPage()}</main>
      <MarketingFooter onNavigate={onNavigate} onLogin={onLogin} />
    </div>
  );
};
