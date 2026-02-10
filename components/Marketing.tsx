import React, { useState, useEffect } from 'react';
import { 
  Zap, X, Menu, Linkedin, Euro, Briefcase, Users, CheckCircle, BarChart3, 
  ShieldCheck, Search, TrendingUp, ArrowRight, Target, Globe, Facebook, Instagram, Youtube,
  Heart, Crown, Quote, Monitor, MapPin, Phone, FileText, CheckSquare, Clock, ChevronDown, ChevronUp
} from 'lucide-react';

export const Ticker = () => (
  <div className="w-full relative bg-yellow-400 text-black py-3 overflow-hidden border-y-4 border-black rotate-1 hover:rotate-0 transition-transform duration-300 z-20 my-24">
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
              <a 
                key={link.name} 
                href={`#${link.id}`}
                className={`text-xs font-bold transition-colors uppercase tracking-widest relative group ${currentPage === link.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-pink-500 transform transition-transform duration-300 ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
            ))}
            <a href="https://pitch.verdienendevrienden.club" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Pitch</a>
            <a href="https://login.verdienendevrienden.club/" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Inloggen</a>
            <a 
              href="#register"
              className="px-6 py-2 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-lg hover:shadow-pink-500/20"
            >
              Vrienden Worden?
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-[110] p-2 hover:bg-white/10 rounded-full transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Sluit menu" : "Open menu"}
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
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-black text-left uppercase tracking-tighter transition-all duration-500 ${['delay-0', 'delay-[50ms]', 'delay-100', 'delay-150'][idx]} ${currentPage === link.id ? 'text-pink-500 translate-x-4' : 'text-white hover:text-pink-400'}`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/10 space-y-6">
            <a 
              href="https://pitch.verdienendevrienden.club"
              className="text-2xl font-black text-white uppercase tracking-tight hover:text-pink-500 transition-colors block w-full text-left"
            >
              PITCH
            </a>
            <a 
              href="https://login.verdienendevrienden.club/"
              className="text-2xl font-black text-white uppercase tracking-tight hover:text-pink-500 transition-colors block w-full text-left"
            >
              INLOGGEN
            </a>
            <a 
              href="#register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-pink-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl text-center shadow-2xl shadow-pink-500/20 active:scale-95 transition-transform block"
            >
              VRIENDEN WORDEN?
            </a>
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
                <p>💡 <strong className="text-white">Passief Inkomen:</strong> Elke plaatsing levert €25/mnd op zolang de kandidaat werkt. Dit stapelt elke maand op!</p>
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

export const HeroSection = ({ onNavigate }: any) => {
  return (
    <div className="w-full pt-28 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
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
              JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 pr-14 pb-2">MONEY MOVEMENT</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Stop met werken voor een baas. Begin met bouwen aan je imperium. 
              Verdien <span className="text-white font-bold">€50k - €100k</span> OTE + Passief inkomen.
            </p>
            <a href="#process" className="group bg-white text-black px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 flex items-center inline-flex">
              Start Onboarding <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
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
                                                <option>Trainee Senior Consultant</option>
                                                <option>Trainee Senior Resourcer</option>
                                                <option>Trainee Senior Closer</option>
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
                                                <option>€3.000 - €5.000</option>
                                                <option>€5.000 - €10.000</option>
                                                <option>€10.000+</option>
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

                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Verdien <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">€8.000+</span> per maand
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
                  { value: '€30/u', label: 'Basis Uurloon', icon: <Euro className="w-5 h-5" />, accent: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 text-yellow-400' },
                  { value: '€300', label: 'Per Plaatsing', icon: <TrendingUp className="w-5 h-5" />, accent: 'from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400' },
                  { value: '€25/mnd', label: 'Passief Inkomen', icon: <Zap className="w-5 h-5" />, accent: 'from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400' },
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
                { value: "€50k+", label: "Gemiddeld OTE", icon: <Euro className="w-5 h-5" /> },
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 pr-14 pb-2">VRIENDSCHAP</span> EN ONGEKENDE GROEI
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
            <p className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-black mb-12 drop-shadow-md">"GEGARANDEERDE GROEI VOOR ONZE VRIENDEN."</p>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 pr-14 pb-2">ONZE ZORG</span>
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

  const vacancies = [
    {
      title: "Trainee Senior Consultant",
      subtitle: "De Regisseur van Talent",
      salary: (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-400 font-normal">Jaar overeenkomst</span>
          <span className="text-white">€4.500.- tot €6.500 Basis</span>
          <span className="text-yellow-400">50K - 100K OTE + PASSIEF</span>
        </div>
      ),
      description: "Ben jij klaar met de traditionele 9-tot-5 mentaliteit en wil je ondernemen met een vangnet? Als Trainee Senior Consultant word je opgeleid tot de spin in het web van onze organisatie. In deze allround rol leer je het volledige proces beheersen: van het spotten van toptalent tot het succesvol plaatsen bij onze partners. Jij bent geen recruiter, jij bent een business partner.",
      role: "Je bouwt je eigen \"route\" op. Dit betekent dat je verantwoordelijk bent voor de hele cyclus. Je leert hoe je met onze unieke \"warme netwerk\"-aanpak deuren opent zonder koud te bellen. Je begeleidt kandidaten van de eerste kennismaking tot de handtekening en blijft hun vertrouwenspersoon daarna.",
      profile: [
        "Ondernemend: Je ziet jezelf als de \"CEO van je eigen route\".",
        "Allrounder: Je schakelt makkelijk tussen de menselijke connectie (relatiebeheer) en de harde deal (closing).",
        "Resultaatgericht: Je snapt dat executie belangrijker is dan praten. Resultaat is de enige waarheid."
      ],
      rewards: [
        "Direct verdienen: €30,- per uur tijdens beluren + €300,- bonus per plaatsing.",
        "Passief Inkomen: Bouw je eigen \"sneeuwbaleffect\" met €25,- per maand per actieve kandidaat.",
        "Groei: Start flexibel en groei door naar een vast 40-urig jaarcontract op basis van je succes."
      ]
    },
    {
      title: "Trainee Senior Resourcer",
      subtitle: "De Architect van Relaties (The Networker)",
      salary: (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-400 font-normal">Jaar overeenkomst</span>
          <span className="text-white">€4.500.- tot €6.500 Basis</span>
          <span className="text-yellow-400">50K - 100K OTE + PASSIEF</span>
        </div>
      ),
      description: "Heb jij de gunfactor? Leg jij makkelijk contact en weet je mensen aan je te binden? Als Trainee Senior Resourcer specialiseer jij je in het begin van het proces. Jij bent de deuropener. In deze rol, gebaseerd op onze 'Double Team' pilot, focus jij je volledig op het bouwen van relaties en het vinden van de perfecte match.",
      role: "Jij beheert de instroom van talent. Je werkt met onze stroom van warme leads en zorgt dat de agenda’s gevuld worden met kwaliteit. Jouw taak is het winnen van vertrouwen. Jij zet de voorzet, zodat jouw collega (de Closer) hem kan inkoppen. Jij bent het eerste visitekaartje van VVC.",
      profile: [
        "Connector: Je bent een \"netwerker pur sang\" en haalt energie uit gesprekken.",
        "Empathisch & Scherp: Je voelt precies aan wat een kandidaat zoekt en weet dit te vertalen naar een kans.",
        "Teamplayer: Je werkt nauw samen met de Closer; jullie succes is gedeeld succes (\"1 Team, 1 Taak\")."
      ],
      rewards: [
        "Focus Bonus: Verdien goed door je te specialiseren. Profiteer mee van de deals die uit jouw netwerk komen.",
        "Zekerheid: €30,- per uur voor jouw bel-activiteiten.",
        "Partnership: Werk samen in een duo-constructie met een gemiddeld inkomensdoel van €4.000,- per maand."
      ]
    },
    {
      title: "Trainee Senior Closer",
      subtitle: "De Dealmaker (The Killer Closer)",
      salary: (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-400 font-normal">Jaar overeenkomst</span>
          <span className="text-white">€4.500.- tot €6.500 Basis</span>
          <span className="text-yellow-400">50K - 100K OTE + PASSIEF</span>
        </div>
      ),
      description: "Jij bent er voor de finish. Als Trainee Senior Closer word je klaargestoomd voor het moment suprême: de handtekening. Waar anderen stoppen, begin jij. Deze rol is puur gericht op conversie en resultaat. De relatie is al gelegd door de Resourcer; aan jou de taak om de deal over de streep te trekken.",
      role: "Je neemt het stokje over zodra de relatie is gevestigd. Je voert de contractbesprekingen, onderhandelt over de voorwaarden en zorgt voor de uiteindelijke plaatsing. Jouw focus is laser-scherp: leads omzetten in resultaat. Je wordt getraind om bezwaren om te buigen in kansen.",
      profile: [
        "Winnaarsmentaliteit: Je gaat voor goud. \"Tweede plaats is de eerste verliezer.\"",
        "Overtuigingskracht: Je staat stevig in je schoenen en durft om de deal te vragen.",
        "Executie: Je draait niet om de hete brij heen; je bent duidelijk, zakelijk en doelgericht."
      ],
      rewards: [
        "High Reward: Profiteer maximaal van onze bonusstructuur (€300,- per plaatsing) door hoge volumes te draaien.",
        "Lange termijn: Ook jij bouwt mee aan het passieve inkomen over de kandidaten die jij plaatst.",
        "Vrijheid: Bewijs je waarde in resultaten en bepaal je eigen uren."
      ]
    }
  ];

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": vacancies.map((job, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "JobPosting",
            "title": job.title,
            "description": `<p>${job.description}</p><p><strong>Rol:</strong> ${job.role}</p><p><strong>Profiel:</strong> ${job.profile.join(', ')}</p>`,
            "datePosted": new Date().toISOString().split('T')[0],
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Verdienende Vrienden Club",
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
            "employmentType": "CONTRACTOR",
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": {
                    "@type": "QuantitativeValue",
                    "minValue": 50000,
                    "maxValue": 100000,
                    "unitText": "YEAR"
                }
            }
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
                            <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">Nu Solliciteren</div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 italic">{selectedJob.title}</h2>
                            <p className="text-xl text-slate-400">{selectedJob.subtitle}</p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-pink-500"/> Jouw Route</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{selectedJob.description}</p>
                            </div>

                             <div>
                                <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-purple-500"/> Wat ga je doen?</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{selectedJob.role}</p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-lg mb-3 flex items-center"><Users className="w-5 h-5 mr-2 text-yellow-400"/> Wie zoeken wij?</h3>
                                <ul className="space-y-2">
                                    {selectedJob.profile.map((item: string, i: number) => (
                                        <li key={i} className="text-slate-400 text-sm flex items-start">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center"><Euro className="w-5 h-5 mr-2 text-green-400"/> Jouw Beloning</h3>
                                <ul className="space-y-3">
                                    {selectedJob.rewards.map((item: string, i: number) => (
                                        <li key={i} className="text-slate-300 text-sm flex items-start">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                             <div className="pt-6 border-t border-white/10">
                                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Waarom VVC?</h4>
                                <p className="text-slate-400 text-sm mb-4">Bij de Verdienende Vrienden Club (VVC) krijg je geen baan, maar een toekomst.</p>
                                <ul className="space-y-2 mb-6">
                                    <li className="text-slate-400 text-sm flex items-start"><span className="text-pink-500 font-bold mr-2">Cultuur:</span> Geen politiek, alleen pure samenwerking.</li>
                                    <li className="text-slate-400 text-sm flex items-start"><span className="text-pink-500 font-bold mr-2">Ongekende Groei:</span> On-Target Earnings tussen €50.000 en €95.000.</li>
                                    <li className="text-slate-400 text-sm flex items-start"><span className="text-pink-500 font-bold mr-2">Vrijheid:</span> De rugdekking van een club, de vrijheid van een ondernemer.</li>
                                </ul>
                                <p className="text-white font-black italic text-center mb-6">Durf jij de stap aan? Word vriend, word partner.</p>
                                <a href="#register" onClick={() => setSelectedJob(null)} className="w-full bg-white text-black font-black uppercase tracking-wider py-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-xl hover:shadow-pink-500/20 block text-center">Direct Solliciteren</a>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      <div className="text-center py-20 px-6 max-w-4xl mx-auto">
         <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase"><span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span><span>We are hiring</span></div>
         <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-6">JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 pr-14 pb-2">1% CLUB</span></h1>
         <p className="text-xl text-slate-400 mb-12">Verdien wat je waard bent. Geen plafonds, geen kantoortijden, alleen resultaat.</p>
         <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay group-hover:bg-pink-500/0 transition-colors duration-500"></div>
            <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="VVC team van sales professionals en ondernemers" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
         </div>
      </div>
      <Ticker />
      <div className="max-w-7xl mx-auto px-6 py-24" id="jobs">
        <h2 className="text-4xl font-black text-white mb-12 italic">OPENSTAANDE VACATURES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacancies.map((job,i) =>(
            <div key={i} className="bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl hover:border-pink-500 transition-all group flex flex-col">
                <div className="mb-auto">
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 h-10">{job.subtitle}</p>
                    <div className="text-white font-bold mb-6 text-yellow-400">{job.salary}</div>
                </div>
                <button onClick={() => setSelectedJob(job)} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-pink-500 hover:text-white transition-all shadow-lg hover:shadow-pink-500/20">Bekijk Functie</button>
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
      careers: "Bekijk onze vacatures voor Trainee Senior Consultant, Resourcer en Closer. Verdien wat je waard bent met ongekende doorgroeimogelijkheden.",
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
