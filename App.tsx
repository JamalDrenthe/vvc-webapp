import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MarketingApp } from './components/Marketing';
import { 
  Layout, Dashboard, MissionList, MissionDetail, Profile, Community, 
  Boastplug, Spontiva, WoningVrij, Investbotiq, Djobba, Pitch, Talents, ReferralPage 
} from './components/Dashboard';
import Chat from './components/Chat';
import ScrollToTop from './components/ScrollToTop';
import { CURRENT_USER, MOCK_MISSIONS, MOCK_NOTIFICATIONS, MOCK_USERS, MOCK_TEAMS, translations } from './constants';
import { User, Mission, MissionStatus, Theme, Language } from './types';
import { ThemeContext, LanguageContext } from './contexts';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default');
  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl');
  const t = (key: string) => translations[key]?.[language] || key;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

const RouteChangeHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname + location.search + location.hash);
    
    // Multiple attempts to scroll to top
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Find all scrollable containers
      const scrollables = document.querySelectorAll('[class*="overflow-y-auto"], [class*="overflow-y-scroll"]');
      scrollables.forEach(el => {
        (el as HTMLElement).scrollTop = 0;
      });
      
      // Specific selectors for your layout
      const selectors = [
        'main > div[class*="overflow"]',
        '.flex-1[class*="overflow"]',
        '[class*="scrollbar-hide"]'
      ];
      
      selectors.forEach(sel => {
        const el = document.querySelector(sel) as HTMLElement;
        if (el) el.scrollTop = 0;
      });
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Also try after a short delay (for layout shifts)
    const timeoutId = setTimeout(scrollToTop, 50);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search, location.hash]);
  
  return <>{children}</>;
};

const Auth: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const c = canvasRef.current; if(!c) return; const ctx = c.getContext('2d'); if(!ctx) return;
        let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
        const pts = Array(50).fill(0).map(() => ({x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-.5), vy:(Math.random()-.5)}));
        const anim = () => {
            ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,w,h); ctx.fillStyle='rgba(6,182,212,0.5)';
            pts.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill(); });
            requestAnimationFrame(anim);
        }; anim();
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-cyan-100 font-mono bg-slate-900">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur border border-cyan-900/50 p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">SYSTEM ACCESS</h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    onLogin();
                  }}
                  className="space-y-4"
                >
                    <div className="group"><label className="text-xs text-cyan-600">ID</label><input className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-cyan-100 focus:border-cyan-500 outline-none" required placeholder="USER@VVC.NET" /></div>
                    <div className="group"><label className="text-xs text-cyan-600">KEY</label><input type="password" className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-cyan-100 focus:border-cyan-500 outline-none" required placeholder="••••••••" /></div>
                    <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded transition-all">
                      {loading ? 'AUTHENTICATING...' : 'INITIALIZE'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState<User>(CURRENT_USER);
    const [missions, setMissions] = useState<Mission[]>(MOCK_MISSIONS);

    useEffect(() => {
        const savedAuth = localStorage.getItem('vvc_auth') === 'true';
        if (savedAuth) {
            setIsAuthenticated(true);
            setShowLogin(false);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setShowLogin(false);
        localStorage.setItem('vvc_auth', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setShowLogin(false);
        localStorage.removeItem('vvc_auth');
    };

    const handleCompleteMission = (missionId: string) => {
        setMissions(prev => prev.map(m => m.id === missionId ? { ...m, status: MissionStatus.COMPLETED } : m));
        setUser(prev => ({ ...prev, level: prev.level + 1, xp: 0 }));
    };

    return (
        <ThemeProvider>
            <LanguageProvider>
                <Router>
                    <ScrollToTop />
                    {!isAuthenticated ? (
                        showLogin ? (
                            <Auth onLogin={handleLogin} />
                        ) : (
                            <MarketingApp onLogin={() => setShowLogin(true)} />
                        )
                    ) : (
                        <Layout user={user} onLogout={handleLogout}>
                            <RouteChangeHandler>
                                <Routes>
                                <Route path="/" element={<Dashboard user={user} activeMissions={missions.filter(m => m.status === MissionStatus.AVAILABLE || m.status === MissionStatus.IN_PROGRESS)} notifications={MOCK_NOTIFICATIONS} />} />
                                <Route path="/onboarding" element={<MissionList missions={missions} />} />
                                <Route path="/onboarding/:id" element={<MissionDetail missions={missions} onCompleteMission={handleCompleteMission} />} />
                                <Route path="/community" element={<Community users={MOCK_USERS} teams={MOCK_TEAMS} />} />
                                <Route path="/chat" element={<div className="max-w-4xl mx-auto"><Chat user={user} /></div>} />
                                <Route path="/profile" element={<Profile user={user} />} />
                                <Route path="/pitch" element={<Pitch />} />
                                <Route path="/talents" element={<Talents />} />
                                <Route path="/referral" element={<ReferralPage />} />
                                <Route path="/boastplug" element={<Boastplug />} />
                                <Route path="/woningvrij" element={<WoningVrij />} />
                                <Route path="/investbotiq" element={<Investbotiq />} />
                                <Route path="/djobba" element={<Djobba />} />
                                <Route path="/spontiva" element={<Spontiva />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                            </RouteChangeHandler>
                        </Layout>
                    )}
                </Router>
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;