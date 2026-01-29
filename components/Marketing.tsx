import React, { useState, useEffect } from 'react';
import { 
  Zap, X, Menu, Linkedin, DollarSign, Briefcase, Users, CheckCircle, BarChart3, 
  ShieldCheck, Search, TrendingUp, ArrowRight, Target, Globe
} from 'lucide-react';

export const Ticker = () => (
  <div className="w-full relative bg-yellow-400 text-black py-3 overflow-hidden border-y-4 border-black rotate-1 hover:rotate-0 transition-transform duration-300 z-20">
    <div className="absolute inset-0 bg-yellow-500 opacity-50 bg-[size:4px_4px] bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:20px_20px] opacity-10"></div>
    <div className="flex whitespace-nowrap overflow-hidden">
      <div className="animate-marqueeYZ flex items-center space-x-8 text-lg font-black tracking-widest uppercase">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="flex items-center"><Zap className="w-5 h-5 mr-2 fill-black" /> NIEUWE VACATURE: SENIOR CLOSER</span>
            <span className="mx-4 text-black/30">///</span>
            <span className="flex items-center">€300 BONUS PER DEAL</span>
            <span className="mx-4 text-black/30">///</span>
            <span className="flex items-center">PASSIEF INKOMEN START NU</span>
            <span className="mx-4 text-black/30">///</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export const MarketingNavbar = ({ currentPage, onNavigate, onLogin }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Over Ons', id: 'about' },
    { name: 'Hoe werkt het?', id: 'process' },
    { name: 'Vacatures', id: 'careers' },
  ];

  const pageTitles: Record<string, string> = {
    home: 'Home',
    about: 'Over Ons',
    process: 'Proces',
    careers: 'Vacatures',
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${isScrolled || isMobileMenuOpen ? 'bg-black border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand */}
          <button 
            onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} 
            className="text-2xl md:text-3xl font-black italic tracking-tighter text-white z-[110] relative focus:outline-none"
          >
            VVC<span className="text-pink-500">.</span>
          </button>

          {/* Current Page Title (Mobile Only - Centered) */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 text-white font-black text-sm uppercase tracking-widest opacity-80 z-[105]">
            {pageTitles[currentPage] || 'VVC'}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => onNavigate(link.id)}
                className={`text-xs font-bold transition-colors uppercase tracking-widest relative group ${currentPage === link.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-pink-500 transform transition-transform duration-300 ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
            <button onClick={onLogin} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Inloggen</button>
            <button 
              onClick={() => onNavigate('careers')}
              className="px-6 py-2 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-lg hover:shadow-pink-500/20"
            >
              Vrienden Worden?
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-[110] p-2 hover:bg-white/10 rounded-full transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[90] md:hidden transition-all duration-300 ease-out flex flex-col p-8 pt-24 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'}`}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link, idx) => (
            <button 
              key={link.name} 
              onClick={() => { onNavigate(link.id); setIsMobileMenuOpen(false); }}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`text-4xl font-black text-left uppercase tracking-tighter transition-all duration-500 ${currentPage === link.id ? 'text-pink-500 translate-x-4' : 'text-white hover:text-pink-400'}`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/10 space-y-6">
            <button 
              onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
              className="text-2xl font-black text-white uppercase tracking-tight hover:text-pink-500 transition-colors block w-full text-left"
            >
              INLOGGEN
            </button>
            <button 
              onClick={() => { onNavigate('careers'); setIsMobileMenuOpen(false); }}
              className="w-full bg-pink-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl text-center shadow-2xl shadow-pink-500/20 active:scale-95 transition-transform"
            >
              VRIENDEN WORDEN?
            </button>
          </div>
        </div>

        {/* Branding Footer for Menu */}
        <div className="mt-auto pb-8 opacity-20 text-center">
            <div className="text-6xl font-black italic tracking-tighter text-white">VVC.</div>
        </div>
      </div>
    </>
  );
};

export const MarketingFooter = ({ onNavigate, onLogin }: any) => {
  return (
    <footer id="contact" className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-black italic tracking-tighter text-white mb-6">
            VVC<span className="text-pink-500">.</span>
          </div>
          <p className="text-slate-500 max-w-sm mb-6">
            Wij optimaliseren bedrijfsprocessen en klantcontact met unieke strategie, technologie en uitvoering.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={() => onNavigate('about')} className="hover:text-pink-500 transition-colors text-left text-sm font-medium">Over VVC</button></li>
            <li><button onClick={() => onNavigate('process')} className="hover:text-pink-500 transition-colors text-left text-sm font-medium">Hoe het werkt</button></li>
            <li><button onClick={() => onNavigate('careers')} className="hover:text-pink-500 transition-colors text-left text-sm font-medium">Vacatures</button></li>
            <li><button onClick={onLogin} className="hover:text-pink-500 transition-colors text-left text-sm font-bold text-white">Inloggen</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>Amsterdam, Nederland</li>
            <li>info@vvc-club.nl</li>
            <li>Ma-Vr: 9:00 - 17:00</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
        &copy; 2025 Verdienende Vrienden Club – Alle rechten voorbehouden.
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
                <input type="range" min="0" max="40" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>Part-time</span><span>Full-time</span></div>
              </div>
              <div>
                <div className="flex justify-between text-white font-bold mb-4">
                  <span>Plaatsingen per maand</span>
                  <span className="text-purple-500">{placements}</span>
                </div>
                <input type="range" min="0" max="20" value={placements} onChange={(e) => setPlacements(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm text-slate-300">
                <p>💡 <strong className="text-white">Passief Inkomen:</strong> Elke plaatsing levert €25/mnd op zolang de kandidaat werkt. Dit stapelt elke maand op!</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 border border-purple-500/30 rounded-2xl p-8 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10">
                 <div className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-2">Geschat Maandinkomen</div>
                 <div className="text-6xl font-black text-white mb-2">€{total.toLocaleString()}</div>
                 <div className="text-slate-400 text-sm mb-8">excl. cumulatieve passieve groei</div>
                 <button onClick={() => onNavigate && onNavigate('careers')} className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-xl hover:shadow-pink-500/20">Start met verdienen</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroSection = ({ onNavigate }: any) => {
  return (
    <div className="w-full pt-28 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="w-full relative overflow-hidden rounded-3xl border border-white/10 group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#240046] via-[#1a0b2e] to-[#000000]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -right-20 -top-40 w-96 h-96 bg-pink-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -left-20 -bottom-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"></div>

        <div className="relative z-10 px-8 py-16 md:py-24 md:px-16 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              <span>Now Recruiting</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none mb-6 text-white">
              JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">MONEY MOVEMENT</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Stop met werken voor een baas. Begin met bouwen aan je imperium. 
              Verdien <span className="text-white font-bold">€50k - €95k</span> OTE + Passief inkomen.
            </p>
            <button onClick={() => onNavigate('process')} className="group bg-white text-black px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 flex items-center">
              Start Onboarding <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="hidden md:flex relative w-64 h-64 items-center justify-center">
            <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border-4 border-pink-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                 <div className="text-5xl font-black text-white">VVC</div>
                 <div className="text-xs text-pink-500 tracking-[0.3em] font-bold mt-1">EST. 2022</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      </div>
    </section>
  );
};

export const RecruitmentCTA = ({ onNavigate }: any) => {
  return (
    <section id="careers" className="py-24 bg-black flex justify-center px-6">
      <div className="w-full max-w-4xl mx-auto relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-black border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative h-48 md:h-auto bg-pink-900">
            <img src="https://picsum.photos/600/800" alt="Club Vibe" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <div className="bg-white text-black text-xs font-bold px-2 py-1 uppercase tracking-wider inline-block mb-1">Since 2022</div>
              <div className="text-white font-black text-xl leading-none">THE CLUB</div>
            </div>
          </div>
          <div className="col-span-2 p-8 md:p-10 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign size={120} className="text-white" /></div>
            <h3 className="text-2xl font-bold mb-2 text-white">Wil jij <span className="text-yellow-400">€8.000+</span> per maand verdienen?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Wij zoeken Senior Consultants en Sales Duo's. Geen koud bellen, alleen warme leads en oneindige bonussen.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('careers')} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-pink-500/25">BEKIJK VACATURES</button>
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
                { value: "€50k+", label: "Gemiddeld OTE", icon: <DollarSign className="w-5 h-5" /> },
                { value: "9.8", label: "Klanttevredenheid", icon: <TrendingUp className="w-5 h-5" /> },
                { value: "Elite", label: "Focus Sectoren", icon: <ShieldCheck className="w-5 h-5" /> },
                { value: "500+", label: "Vrienden Netwerk", icon: <Users className="w-5 h-5" /> },
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
          <p className="text-slate-400 text-lg">Wij bieden diepgaande kwaliteitscontroles, variërend van digitale audits tot fysieke inspecties. Onze focus ligt op absolute perfectie.</p>
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

export const Testimonial = () => {
  return (
    <section className="py-20 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8"><span className="text-6xl text-purple-600 font-serif">"</span></div>
        <h3 className="text-2xl md:text-4xl font-semibold text-white leading-normal italic mb-8">Dankzij VVC kregen we eindelijk helder inzicht in waar het misging. De verbeterpunten waren concreet en direct toepasbaar - onze klantbeleving is zichtbaar gestegen.</h3>
        <div><div className="font-bold text-white text-lg">Jan de Vries</div><div className="text-pink-500 text-sm font-bold uppercase tracking-wider">Samenwerking sinds 2023</div></div>
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
    <MarketingCalculator onNavigate={onNavigate} />
    <RecruitmentCTA onNavigate={onNavigate} />
    <Testimonial />
  </>
);

export const AboutPage = () => (
    <div className="bg-black min-h-screen pt-24">
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-4 text-pink-500 font-black tracking-[0.3em] text-xs uppercase border border-pink-500/30 px-4 py-2 rounded-full">The Story</div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6">MEER DAN EEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">BUREAU</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">VVC is ontstaan uit de frustratie van middelmaat. Wij zijn een ecosysteem van ondernemers, closers en strategen die weigeren concessies te doen aan kwaliteit.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative"><div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 opacity-30 blur-xl rounded-2xl"></div><img src="https://picsum.photos/800/600" alt="Team Meeting" className="relative rounded-2xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500" /></div>
          <div className="space-y-8">
            <div><h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><Target className="text-pink-500" /> Pure Focus</h3><p className="text-slate-400">Wij doen niet alles. Wij doen waar we de beste in zijn: high-ticket sales support, mystery shopping en kwaliteitscontroles.</p></div>
            <div><h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><Users className="text-purple-500" /> Een Echte Club</h3><p className="text-slate-400">Bij VVC ben je geen nummer. Ons netwerk is exclusief. We selecteren streng, maar belonen royaal. Eerlijkheid en transparantie staan op 1.</p></div>
            <div><h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3"><Globe className="text-yellow-400" /> Grenzeloze Ambitie</h3><p className="text-slate-400">Onze leden werken remote, bouwen imperiums vanuit elke hoek van de wereld en delen kennis om collectief te groeien.</p></div>
          </div>
        </div>
      </div>
    </div>
);

export const ProcessPage = () => (
    <div className="bg-black min-h-screen pt-24">
      <div className="text-center py-20 px-6"><h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6">HOE WERKT <span className="text-purple-500">HET?</span></h1><p className="text-xl text-slate-400 max-w-2xl mx-auto">Eenvoud is de ultieme vorm van perfectie. Geen onnodige lagen, maar een rechte lijn naar resultaat.</p></div>
      <Process />
      <div className="max-w-4xl mx-auto px-6 py-24"><h2 className="text-3xl font-black text-white mb-12 text-center">VEELGESTELDE VRAGEN</h2><div className="bg-[#0a0a0a] rounded-3xl border border-white/10 p-2 md:p-8">
          {[{q:"Hoe lang duurt een gemiddeld traject?", a:"Dit hangt af van de scope. Een Mystery Shopping audit kan binnen 48 uur afgerond zijn."}, {q:"Werken jullie ook op basis van No Cure, No Pay?", a:"Voor specifieke sales-functies werken we met een prestatiegericht model."}, {q:"Kan ik als freelancer toetreden tot VVC?", a:"Absoluut. Ga naar de Vacatures pagina."}].map((faq, i) => (
             <div key={i} className="border-b border-white/10 py-6 px-4"><span className="font-bold text-white text-lg block mb-2 text-left">{faq.q}</span><span className="text-slate-400 text-left block">{faq.a}</span></div>
          ))}
      </div></div>
    </div>
);

export const CareersPage = ({ onNavigate }: any) => (
    <div className="bg-black min-h-screen pt-24">
      <div className="text-center py-20 px-6 max-w-4xl mx-auto">
         <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase"><span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span><span>We are hiring</span></div>
         <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6">JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">1% CLUB</span></h1>
         <p className="text-xl text-slate-400">Verdien wat je waard bent. Geen plafonds, geen kantoortijden, alleen resultaat.</p>
      </div>
      <MarketingCalculator onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto px-6 py-24" id="jobs">
        <h2 className="text-4xl font-black text-white mb-12 italic">OPENSTAANDE VACATURES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{t:"High Ticket Closer", s:"€5k - €15k /mnd"}, {t:"Appointment Setter", s:"€2k - €5k /mnd"}, {t:"Quality Control Manager", s:"€45 /uur"}].map((job,i) =>(
            <div key={i} className="bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl hover:border-pink-500 transition-all"><h3 className="text-2xl font-bold text-white mb-2">{job.t}</h3><div className="text-white font-bold mb-6 text-yellow-400">{job.s}</div><button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-all">Bekijk Functie</button></div>
          ))}
        </div>
      </div>
    </div>
);

export const MarketingApp = ({ onLogin }: any) => {
  const [currentPage, setCurrentPage] = useState('home');
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'process': return <ProcessPage />;
      case 'careers': return <CareersPage onNavigate={setCurrentPage} />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-pink-500 selection:text-white flex flex-col">
      <MarketingNavbar currentPage={currentPage} onNavigate={setCurrentPage} onLogin={onLogin} />
      <main className="flex-grow">{renderPage()}</main>
      <MarketingFooter onNavigate={setCurrentPage} onLogin={onLogin} />
    </div>
  );
};
