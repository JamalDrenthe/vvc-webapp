import React, { useState, useContext, useLayoutEffect, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import * as d3 from 'd3';
import {
  LayoutDashboard, Target, Users, MessageSquare, Briefcase, UserPlus, Gift, Laptop, Home, Zap,
  Search, TrendingUp, ChevronDown, ChevronRight, PanelLeftOpen, PanelLeftClose, LogOut, Sun, Monitor, Heart,
  Calculator as CalculatorIcon, ChevronUp, Lock, Check, Award, Wallet, ArrowLeft, ArrowRight, Upload,
  CheckCircle, FileText, Clock, User as UserIcon, ShieldCheck, Menu, Info, Atom, Grid, Orbit, X, Building2, Tag, List, Layers,
  AlertTriangle, CheckCircle2, Cpu
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Card, Button, Input, ProgressBar, Badge } from './UI';
import Chat from './Chat';
import { User, Mission, MissionStatus, MissionCategory, Team, Notification } from '../types';
import { ThemeContext, LanguageContext } from '../contexts';

// --- TYPES FOR VISUALIZATION ---
type GroupType = 'core' | 'secondary' | 'marketing' | 'invest' | 'software';
type LayoutMode = 'orbit' | 'galaxy' | 'matrix';
type SystemType = 'sales' | 'onboarding';

interface Company {
  id: string;
  name: string;
  abbreviation?: string;
  group: GroupType;
  description?: string;
  tags?: string[];
}

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  group: GroupType;
  name: string;
  abbreviation?: string;
  radius?: number;
  targetX?: number;
  targetY?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  tags?: string[];
}

interface AISimulationResult {
  description: string;
  services: string[];
  synergies: string[];
}

// --- DATA ---

const SALES_OPS_DATA: Company[] = [
  // Core (Center)
  { id: 'vvc', name: 'Verdienende Vrienden Club', abbreviation: 'VVC', group: 'core' },
  { id: 'iq', name: 'Investbotiq', abbreviation: 'IQ', group: 'core' },
  { id: 'sp', name: 'Spontiva', abbreviation: 'SP', group: 'core' },
  { id: 'dj', name: 'Djobba', abbreviation: 'DJ', group: 'core' },
  { id: 'wv', name: 'WoningVry', abbreviation: 'WV', group: 'core' },

  // Secondary (2nd Circle)
  { id: 'boast', name: 'Boastplug', group: 'secondary' },
  { id: 'innova', name: 'Innovadoc', group: 'secondary' },
  { id: 'sabi', name: 'SabiBank', group: 'secondary' },

  // Marketing (3rd Circle)
  { id: 'colalt', name: 'Collectiefalternatief', group: 'marketing' },
  { id: 'immpunt', name: 'Immigratiepunt', group: 'marketing' },
  { id: 'stopc', name: 'Stopcontact', group: 'marketing' },
  { id: 'bespaar', name: 'Besparenmetai', group: 'marketing' },
  { id: 'nettest', name: 'Netwerk Tester', group: 'marketing' },
  { id: 'influwin', name: 'Influwinactie', group: 'marketing' },

  // Investment (4th Circle)
  { id: 'amac', name: 'Ama compleet', group: 'invest' },
  { id: '22n', name: '22NIGHTS', group: 'invest' },
  { id: 'huasca', name: 'Huascabar', group: 'invest' },
  { id: 'cyber31', name: 'Cybersecurity 31', group: 'invest' },
  { id: 'spraak', name: 'Spraakzaam Samen', group: 'invest' },
  { id: 'angels', name: 'Angels Mediate', group: 'invest' },
  { id: 'salesz', name: 'SaleszBook', group: 'invest' },

  // Software (5th Circle)
  { id: 'artist', name: 'Artistplatform', group: 'software' },
  { id: 'influplat', name: 'Influencerfan platform', group: 'software' },
  { id: 'photo', name: 'Photo edit tool', group: 'software' },
  { id: 'serverless', name: 'Serverless Cloud', group: 'software' },
];

const ONBOARDING_OPS_DATA: Company[] = [
  // --- LEVEL 1 ---
  { id: 'ob_l1_1', name: 'Leer over VVC', group: 'core', tags: ['Level 1: Core', 'Education'] },
  { id: 'ob_l1_2', name: 'Quiz', group: 'core', tags: ['Level 1: Core', 'Assessment'] },
  { id: 'ob_l1_3', name: 'VVC account compleet maken', abbreviation: 'ACC', group: 'core', tags: ['Level 1: Core', 'Action'] },

  // --- LEVEL 2 ---
  { id: 'ob_l2_learn', name: 'Leer', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Education'] },
  { id: 'ob_l2_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Assessment'] },
  { id: 'ob_l2_1', name: 'Investbotiq aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_2', name: 'Spontiva aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_3', name: 'Djobba aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_4', name: 'WoningVry aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },

  // --- LEVEL 3 ---
  { id: 'ob_l3_learn', name: 'Leren', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Education'] },
  { id: 'ob_l3_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Assessment'] },
  { id: 'ob_l3_1', name: 'CV', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_2', name: 'Vragenlijst', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_3', name: 'Persoonlijkheid test 1', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_4', name: 'Persoonlijkheid test 2', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_5', name: 'Ondernemingsplan', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_6', name: 'VOG', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },

  // --- LEVEL 4 ---
  { id: 'ob_l4_learn', name: 'Leren', group: 'secondary', tags: ['Level 4: Legal', 'Education'] },
  { id: 'ob_l4_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 4: Legal', 'Assessment'] },
  { id: 'ob_l4_1', name: 'Paspoort', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_2', name: 'Adres', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_3', name: 'DigiD', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_4', name: 'KVK', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_5', name: 'LTD', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_6', name: 'Huidige bank', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },

  // --- LEVEL 5 ---
  { id: 'ob_l5_1', name: 'LinkedIN', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_2', name: 'Facebook', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_3', name: 'Instagram', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_4', name: 'WhatsApp BS', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_5', name: 'TikTok', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_6', name: 'Reddit', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_7', name: 'Github', group: 'marketing', tags: ['Level 5 Online positionering', 'Dev'] },
  { id: 'ob_l5_8', name: 'Discord', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_9', name: 'Slack', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_10', name: 'Teams', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_11', name: 'Google', group: 'marketing', tags: ['Level 5 Online positionering', 'Tools'] },
  { id: 'ob_l5_12', name: 'Neo', group: 'marketing', tags: ['Level 5 Online positionering', 'Tools'] },
  { id: 'ob_l5_13', name: 'Canva', group: 'marketing', tags: ['Level 5 Online positionering', 'Design'] },
  { id: 'ob_l5_14', name: 'Buy me Coffee', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_15', name: 'Glassdoor', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },

  // --- LEVEL 6 ---
  { id: 'ob_l6_learn', name: 'Leren', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Education'] },
  { id: 'ob_l6_quiz', name: 'Quiz', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Assessment'] },
  { id: 'ob_l6_1', name: 'Pripost', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_2', name: 'Revolut', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_3', name: 'Revolut BS', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_4', name: 'N26', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_5', name: 'Wise', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_6', name: 'Tide', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_7', name: 'Vialet', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_8', name: 'Algbra', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_9', name: 'SumUp', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_10', name: 'Payoneer', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_11', name: 'Genome', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },

  // --- LEVEL 7 ---
  { id: 'ob_l7_learn', name: 'Leren', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Education'] },
  { id: 'ob_l7_quiz', name: 'Quiz', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Assessment'] },
  { id: 'ob_l7_1', name: 'Bitvavo', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_2', name: 'Blockchain', abbreviation: 'BC', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_3', name: 'Wirex', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_4', name: 'Binance', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_5', name: 'Crypto', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_6', name: 'Bitpay', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_7', name: 'Kraken', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_8', name: 'Coinbase', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_9', name: 'Bitpanda', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_10', name: 'Neteller', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_11', name: 'Skrill', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_12', name: 'Paysafe', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },

  // --- LEVEL 8 (Werk) ---
  { id: 'ob_l8_1', name: 'Young Capital', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_2', name: 'Temper', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_3', name: 'Young Ones', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_4', name: 'StaffYou', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_5', name: 'NowJobs', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_6', name: 'Jobdex', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_7', name: 'Jobner', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  
  // --- LEVEL 8 (Factor) ---
  { id: 'ob_l8f_1', name: 'Timing', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_2', name: 'Fleks', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_3', name: 'Voldaan', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_4', name: 'o2factoring', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_5', name: 'Impactfactoring', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_6', name: 'Factornick', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_7', name: 'Please', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_8', name: 'Kolibrie Payroll', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_9', name: 'Janssen Payroll', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_10', name: 'Linda', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_11', name: 'thefactorcompany', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_12', name: 'thebluefactor', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_13', name: 'Direct Payrolling', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },

  // --- LEVEL 9 ---
  { id: 'ob_l9_1', name: 'Uber', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_2', name: 'Uber Drive', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_3', name: 'Uber Eats', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_4', name: 'Bolt', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_5', name: 'Booking', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_6', name: 'Airbnb', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_7', name: 'Grover', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_8', name: 'Fiverr', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_9', name: 'Hubspot', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_10', name: 'Marktplaats', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_11', name: 'Vinted', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_12', name: 'TicketSwap', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_13', name: 'Jooble', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_14', name: 'Lusha', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },

  // --- LEVEL 10 ---
  { id: 'ob_l10_1', name: 'Multisafepay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_2', name: 'Tinka', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_3', name: 'Pay.', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_4', name: 'Biller', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_5', name: 'Splitit', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_6', name: 'Riverty', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_7', name: 'Klarna', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_8', name: 'Adyen', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_9', name: 'Billink', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_10', name: 'Buckeroo', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_11', name: 'Authorize', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_12', name: '2checkout', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_13', name: 'Stripe', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_14', name: 'Square', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_15', name: 'Adyen', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_16', name: 'Mollie', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_17', name: 'CCV', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_18', name: 'MyPos', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_19', name: 'Viva Wallet', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_20', name: 'EMSPay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_21', name: 'Mangopay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },

  // --- LEVEL 11 ---
  { id: 'ob_l11_1', name: 'Havelaere', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_2', name: 'KPN', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_3', name: 'Odido', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_4', name: 'Ziggo', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_5', name: 'VF', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_6', name: 'Eneco', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },

  // --- LEVEL 12 ---
  { id: 'ob_l12_1', name: 'Interhouse', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_2', name: 'Dak', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_3', name: 'Rooms', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_4', name: 'Nomos', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_5', name: 'HBhousing', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_6', name: 'Vastgoedunie', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_7', name: 'Rappage', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_8', name: '123wonen', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_9', name: 'Grandrelocation', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },

  // --- LEVEL 13 ---
  { id: 'ob_l13_1', name: 'Spotify', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_2', name: 'Apple Music', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_3', name: 'Tidal', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_4', name: 'Deezer', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_5', name: 'Amazon Music', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_6', name: 'Pandora', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_7', name: 'YouTube', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_8', name: 'SoundCloud', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },

  // --- LEVEL 14 ---
  { id: 'ob_l14_1', name: 'Alibaba', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_2', name: 'AliExpress', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_3', name: 'Amazon', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_4', name: 'Depop', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_5', name: 'eBay', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_6', name: 'Gunroad', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },

  // --- LEVEL 15 ---
  { id: 'ob_l15_1', name: 'GoFundMe', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_2', name: 'Kickstart', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_3', name: 'Indiegogo', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_4', name: 'Patreon', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_5', name: 'Fundly', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
];

const GROUP_COLORS: Record<string, string> = {
  core: '#f43f5e', // Rose-500
  secondary: '#f97316', // Orange-500
  marketing: '#eab308', // Yellow-500
  invest: '#22c55e', // Emerald-500
  software: '#3b82f6', // Blue-500
};

const GROUP_COLOR_CLASSES: Record<string, string> = {
  core: 'bg-rose-500',
  secondary: 'bg-orange-500',
  marketing: 'bg-yellow-500',
  invest: 'bg-emerald-500',
  software: 'bg-blue-500',
};

const GROUP_LABELS: Record<string, string> = {
  core: 'Core / Fundamentals',
  secondary: 'Secondary / Setup',
  marketing: 'Marketing / Identity',
  invest: 'Invest / Financials',
  software: 'Software / Platforms',
};

const ORDERED_GROUPS: GroupType[] = ['core', 'secondary', 'marketing', 'invest', 'software'];

const getSystemData = (system: SystemType): Company[] => {
    switch (system) {
        case 'onboarding': return ONBOARDING_OPS_DATA;
        case 'sales': 
        default: return SALES_OPS_DATA;
    }
};

const getSystemTitle = (system: SystemType): string => {
    switch(system) {
        case 'onboarding': return 'OnboardingOps';
        case 'sales': return 'SalesOps';
        default: return 'Ecosystem';
    }
};

const analyzeCompany = async (company: Company): Promise<AISimulationResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    description: `AI Analysis for ${company.name}: A simulated description representing how this entity fits into the ${company.group} sector of the ecosystem.`,
    services: [
      "Strategic Planning & Analysis",
      "Ecosystem Integration",
      "Operational Optimization"
    ],
    synergies: [
      "Potential partnership with Core entities",
      "Cross-sector data sharing opportunities"
    ]
  };
};

const Sidebar: React.FC<{
  companies: Company[];
  selectedCompany: Company | null;
  onClose: () => void;
  onSelect: (c: Company | null) => void;
}> = ({ companies, selectedCompany, onClose, onSelect }) => {
  const [aiAnalysis, setAiAnalysis] = useState<AISimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCompany) {
      setLoading(true);
      analyzeCompany(selectedCompany).then(res => {
        setAiAnalysis(res);
        setLoading(false);
      });
    } else {
      setAiAnalysis(null);
    }
  }, [selectedCompany]);

  if (!selectedCompany) {
      return (
          <div className="h-full bg-slate-900/95 backdrop-blur-xl p-6 text-white border-l border-white/10 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Explorer</h2>
                <button onClick={onClose} aria-label="Close explorer"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-slate-400">Select a node to view details.</p>
              <div className="mt-8">
                  <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">Quick List</h3>
                  <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
                      {companies.map(c => (
                          <div key={c.id} onClick={() => onSelect(c)} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${GROUP_COLOR_CLASSES[c.group]}`}></div>
                              <span className="text-sm font-medium">{c.name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="h-full bg-slate-900/95 backdrop-blur-xl p-6 text-white border-l border-white/10 overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">{selectedCompany.group}</div>
            <h2 className="text-3xl font-bold leading-tight">{selectedCompany.name}</h2>
            {selectedCompany.abbreviation && <span className="text-slate-500 font-mono text-sm">ID: {selectedCompany.abbreviation}</span>}
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full" aria-label="Close details"><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
           <h3 className="text-sm font-bold uppercase text-slate-400 mb-3 flex items-center gap-2"><Atom className="w-4 h-4" /> AI Analysis</h3>
           {loading ? (
               <div className="flex items-center gap-2 text-slate-400 text-sm"><div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div> Analyzing ecosystem fit...</div>
           ) : aiAnalysis ? (
               <div className="space-y-4 animate-fade-in">
                   <p className="text-slate-300 text-sm leading-relaxed">{aiAnalysis.description}</p>
                   <div>
                       <div className="text-xs font-bold text-slate-500 uppercase mb-2">Key Services</div>
                       <div className="flex flex-wrap gap-2">
                           {aiAnalysis.services.map(s => <span key={s} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">{s}</span>)}
                       </div>
                   </div>
                   <div>
                       <div className="text-xs font-bold text-slate-500 uppercase mb-2">Synergies</div>
                       <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
                           {aiAnalysis.synergies.map(s => <li key={s}>{s}</li>)}
                       </ul>
                   </div>
               </div>
           ) : null}
        </div>
        
        {selectedCompany.tags && (
            <div>
                <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedCompany.tags.map(t => <span key={t} className="px-2 py-1 bg-white/5 text-slate-300 text-xs rounded">{t}</span>)}
                </div>
            </div>
        )}
        
        <div>
             <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                 <button className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold transition-colors">Start Mission</button>
                 <button className="py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">View Data</button>
             </div>
        </div>
      </div>
    </div>
  );
};

const MindMap: React.FC<{
  data: Company[];
  onNodeClick: (node: Company | null) => void;
  selectedId: string | null;
  viewMode: LayoutMode;
  searchQuery: string;
}> = ({ data, onNodeClick, selectedId, viewMode, searchQuery }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Prepare nodes
    const nodes: NodeData[] = data.map(d => ({ ...d, radius: d.group === 'core' ? 20 : d.group === 'secondary' ? 12 : 8 }));
    
    // Filter by search
    const filteredNodes = searchQuery ? nodes.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) : nodes;

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Forces
    const simulation = d3.forceSimulation<NodeData>(filteredNodes)
       .force("charge", d3.forceManyBody().strength(-200))
       .force("center", d3.forceCenter(width / 2, height / 2))
       .force("collide", d3.forceCollide().radius((d: any) => d.radius + 5));

    if (viewMode === 'orbit') {
       simulation.force("r", d3.forceRadial((d: any) => {
           switch(d.group) {
               case 'core': return 0;
               case 'secondary': return 150;
               case 'marketing': return 250;
               case 'invest': return 350;
               case 'software': return 450;
               default: return 500;
           }
       }, width/2, height/2).strength(0.8));
    } else if (viewMode === 'matrix') {
       // Grid layout force
       const cols = Math.ceil(Math.sqrt(filteredNodes.length));
       const spacing = 100;
       simulation.force("x", d3.forceX((d: any, i) => ((i % cols) - cols/2) * spacing + width/2).strength(1))
                 .force("y", d3.forceY((d: any, i) => (Math.floor(i / cols) - cols/2) * spacing + height/2).strength(1));
    } else {
        // Galaxy / Default
        simulation.force("x", d3.forceX(width/2).strength(0.05))
                  .force("y", d3.forceY(height/2).strength(0.05));
    }

    const link = g.append("g")
        .selectAll("line")
        // No links defined in current data, but structure is here
        .data([]) 
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6);

    const node = g.append("g")
        .selectAll("g")
        .data(filteredNodes)
        .join("g")
        .call(d3.drag<SVGGElement, NodeData>()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }));

    // Circles
    node.append("circle")
        .attr("r", (d) => d.radius || 10)
        .attr("fill", (d) => GROUP_COLORS[d.group])
        .attr("stroke", (d) => d.id === selectedId ? "#fff" : "none")
        .attr("stroke-width", 2)
        .attr("class", "cursor-pointer transition-all hover:opacity-80")
        .on("click", (event, d) => {
            event.stopPropagation();
            onNodeClick(d);
        });

    // Labels
    node.append("text")
        .text((d) => d.abbreviation || d.name)
        .attr("x", (d) => (d.radius || 10) + 5)
        .attr("y", 4)
        .attr("fill", "white")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif")
        .attr("pointer-events", "none")
        .style("opacity", 0.8);

    simulation.on("tick", () => {
        link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        node
            .attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
        simulation.stop();
    };
  }, [data, viewMode, searchQuery, selectedId, onNodeClick]);

  return <svg ref={svgRef} className="w-full h-full" onClick={() => onNodeClick(null)}></svg>;
};

// --- MAIN COMPONENTS ---

export const Layout = ({ children, user, onLogout }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext) || { theme: 'default', setTheme: () => {} };
  const { language, setLanguage, t } = useContext(LanguageContext) || { language: 'nl', setLanguage: () => {}, t: (k: string) => k };
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useLayoutEffect(() => {
    console.log('ScrollToTop triggered', { pathname: location.pathname, search: location.search, hash: location.hash });
    console.log('contentRef.current', contentRef.current);
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Also try forcing scroll after a brief delay in case layout shifts
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 10);
  }, [location.pathname, location.search, location.hash]);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'onboarding', icon: Target, path: '/onboarding' },
    { id: 'community', icon: Users, path: '/community' },
    { id: 'chat', icon: MessageSquare, path: '/chat' },
    { id: 'prospects', icon: Zap, path: '/pitch' },
    { id: 'talents', icon: UserPlus, path: '/talents' },
    { id: 'referral', icon: Gift, path: '/referral' },
    { id: 'boastplug', icon: Laptop, path: '/boastplug' },
    { id: 'woningvrij', icon: Home, path: '/woningvrij' },
  ];

  const showLabels = sidebarOpen || mobileMenuOpen;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
            fixed inset-y-0 left-0 z-40 bg-slate-900 text-white transition-all duration-300 flex flex-col
            ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
            md:relative md:translate-x-0 
            ${sidebarOpen ? 'md:w-64' : 'md:w-20'}
        `}
      >
        <div className="p-6 flex items-center justify-between h-16">
          <div className={`text-2xl font-black italic transition-opacity ${!sidebarOpen && 'md:opacity-0 hidden'}`}>VVC<span className="text-brand-500">.</span></div>
          {/* Desktop Toggle */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-slate-400 hover:text-white" aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
            {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </button>
          {/* Mobile Close */}
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white" aria-label="Close menu">
            <X />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-1">
          {menuItems.map(item => (
             <NavLink 
               key={item.id} 
               to={item.path}
               onClick={() => {
                 // Force immediate scroll to top when clicking nav
                 window.scrollTo(0, 0);
                 document.documentElement.scrollTop = 0;
                 document.body.scrollTop = 0;
                 const mainContent = document.querySelector('main > div[class*="overflow-y-auto"]') as HTMLElement;
                 if (mainContent) mainContent.scrollTop = 0;
               }}
               className={({ isActive }) => `flex items-center px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10 border-r-4 border-brand-500' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
             >
               <item.icon size={20} className={`${showLabels ? 'mr-3' : 'mx-auto'}`} />
               {showLabels && <span>{t(`nav.${item.id}`)}</span>}
             </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <NavLink to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
            {showLabels && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">{user.firstName} {user.lastName}</div>
                <div className="text-xs text-slate-400">Lvl {user.level} • {user.xp} XP</div>
              </div>
            )}
          </NavLink>
          <button onClick={onLogout} className={`mt-2 flex items-center ${showLabels ? 'px-2' : 'justify-center'} py-2 text-slate-400 hover:text-white w-full text-left text-sm`}>
            <LogOut size={16} className={showLabels ? 'mr-3' : ''} />
            {showLabels && t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20">
             <div className="flex items-center gap-4">
                 <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-600 hover:text-brand-600" aria-label="Open menu">
                     <Menu />
                 </button>
                 <div className="flex items-center text-slate-400 text-sm hidden md:flex">
                     <Clock size={14} className="mr-2" /> {new Date().toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                 </div>
             </div>
             <div className="flex items-center gap-4">
                 <button onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')} className="text-sm font-bold text-slate-600 hover:text-brand-600 uppercase">{language}</button>
                 <button onClick={() => setTheme(theme === 'default' ? 'matrix' : 'default')} className="text-slate-400 hover:text-brand-600" aria-label="Toggle theme"><Sun size={20}/></button>
             </div>
          </header>
          <div ref={contentRef} className="flex-1 overflow-y-auto p-4 md:p-8 relative scrollbar-hide">
            {children}
          </div>
      </main>
    </div>
  );
};

export const Dashboard = ({ user, activeMissions, notifications }: any) => {
    const [viewMode, setViewMode] = useState<LayoutMode>('orbit');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [system, setSystem] = useState<SystemType>('sales');

    const data = getSystemData(system);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        {system === 'sales' ? <Briefcase className="text-brand-600" /> : <Target className="text-brand-600" />}
                        {getSystemTitle(system)}
                    </h1>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button onClick={() => setSystem('sales')} className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${system === 'sales' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}>SalesOps</button>
                        <button onClick={() => setSystem('onboarding')} className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${system === 'onboarding' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}>Onboarding</button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search nodes..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-64"
                        />
                    </div>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button onClick={() => setViewMode('orbit')} className={`p-2 rounded-md transition-all ${viewMode === 'orbit' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'}`} aria-label="Orbit view"><Orbit size={18} /></button>
                        <button onClick={() => setViewMode('galaxy')} className={`p-2 rounded-md transition-all ${viewMode === 'galaxy' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'}`} aria-label="Galaxy view"><Atom size={18} /></button>
                        <button onClick={() => setViewMode('matrix')} className={`p-2 rounded-md transition-all ${viewMode === 'matrix' ? 'bg-white shadow-sm text-brand-600' : 'text-slate-500'}`} aria-label="Matrix view"><Grid size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner border border-slate-800">
                <div className="absolute inset-0">
                     <MindMap 
                        data={data} 
                        onNodeClick={setSelectedCompany} 
                        selectedId={selectedCompany?.id || null} 
                        viewMode={viewMode}
                        searchQuery={searchQuery}
                     />
                </div>
                
                {/* Overlay details sidebar */}
                {selectedCompany && (
                    <div className="absolute top-0 right-0 bottom-0 w-96 shadow-2xl z-10 animate-slide-in-right">
                        <Sidebar 
                            companies={data} 
                            selectedCompany={selectedCompany} 
                            onClose={() => setSelectedCompany(null)} 
                            onSelect={setSelectedCompany} 
                        />
                    </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur p-3 rounded-lg border border-white/10 text-xs text-white space-y-2">
                    {ORDERED_GROUPS.map(g => (
                        <div key={g} className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${GROUP_COLOR_CLASSES[g]}`}></span>
                            <span className="opacity-80">{GROUP_LABELS[g]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MissionList = ({ missions }: { missions: Mission[] }) => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Jouw Missies</h1>
            <div className="grid gap-4">
                {missions.map(mission => (
                    <Card key={mission.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${mission.status === MissionStatus.COMPLETED ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                                    {mission.status === MissionStatus.COMPLETED ? <CheckCircle /> : <Target />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{mission.title}</h3>
                                        {mission.isPrio && <Badge variant="warning">PRIO</Badge>}
                                        <Badge variant={mission.status === MissionStatus.COMPLETED ? 'success' : 'neutral'}>{mission.status}</Badge>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-3">{mission.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                        <span className="flex items-center gap-1"><Award size={14} className="text-yellow-500" /> {mission.xpReward} XP</span>
                                        <span className="flex items-center gap-1"><List size={14} /> {mission.steps.filter(s => s.completed).length}/{mission.steps.length} Stappen</span>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/onboarding/${mission.id}`}>
                                <Button variant="outline" size="sm">Details <ArrowRight size={14} className="ml-2" /></Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const MissionDetail = ({ missions, onCompleteMission }: { missions: Mission[], onCompleteMission: (id: string) => void }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const mission = missions.find(m => m.id === id);

    if (!mission) return <div>Mission not found</div>;

    const progress = (mission.steps.filter(s => s.completed).length / mission.steps.length) * 100;

    return (
        <div className="max-w-3xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-brand-600 mb-6 text-sm font-bold">
                <ArrowLeft size={16} className="mr-2" /> Terug naar overzicht
            </button>

            <Card className="p-8 mb-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{mission.title}</h1>
                        <p className="text-slate-600">{mission.description}</p>
                    </div>
                    <Badge variant="warning" className="text-lg px-3 py-1">+{mission.xpReward} XP</Badge>
                </div>
                
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium mb-2 text-slate-700">
                        <span>Voortgang</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar progress={progress} />
                </div>

                <div className="space-y-4">
                    {mission.steps.map((step, idx) => (
                        <div key={step.id} className={`border rounded-xl p-4 transition-all ${step.completed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${step.completed ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {step.completed ? <Check size={16} /> : idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold mb-1 ${step.completed ? 'text-green-800' : 'text-slate-800'}`}>{step.title}</h4>
                                    <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                                    
                                    {!step.completed && (
                                        <div className="mt-3">
                                            {step.requiredInputType === 'file' && (
                                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                                                    <Upload className="mx-auto text-slate-400 mb-2" />
                                                    <span className="text-sm text-brand-600 font-bold">Upload bestand</span>
                                                </div>
                                            )}
                                            {step.requiredInputType === 'text' && <Input placeholder="Vul hier je antwoord in..." />}
                                            {step.requiredInputType === 'boolean' && (
                                                <div className="flex gap-3">
                                                    <Button variant="outline" size="sm" className="flex-1">Nee</Button>
                                                    <Button variant="primary" size="sm" className="flex-1">Ja, ik bevestig</Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <Button 
                        disabled={progress < 100 || mission.status === MissionStatus.COMPLETED} 
                        onClick={() => onCompleteMission(mission.id)}
                    >
                        {mission.status === MissionStatus.COMPLETED ? 'Missie Voltooid' : 'Missie Afronden'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export const Profile = ({ user }: { user: User }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8 flex items-center gap-8">
                <img src={user.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{user.firstName} {user.lastName}</h1>
                            <p className="text-slate-500 font-medium flex items-center gap-2"><Briefcase size={16} /> {user.specializations.join(', ')}</p>
                        </div>
                        <Button variant="outline">Profiel Bewerken</Button>
                    </div>
                    <div className="mt-6 flex gap-8">
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Level</div>
                            <div className="text-2xl font-black text-brand-600">{user.level}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Experience</div>
                            <div className="text-2xl font-black text-yellow-500">{user.xp} XP</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Team</div>
                            <div className="text-2xl font-black text-slate-700">{user.teamId || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Community = ({ users, teams }: { users: User[], teams: Team[] }) => {
    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Users /> Community</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4">Top Teams</h2>
                    <div className="space-y-4">
                        {teams.map((team, i) => (
                            <div key={team.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-slate-400">#{i+1}</div>
                                    <div className="font-bold text-slate-800">{team.name}</div>
                                </div>
                                <div className="font-mono font-bold text-brand-600">{team.score} pts</div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4">Active Members</h2>
                    <div className="space-y-4">
                        {users.map(u => (
                            <div key={u.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                <img src={u.avatarUrl} className="w-10 h-10 rounded-full" alt={`${u.firstName} ${u.lastName} avatar`} />
                                <div>
                                    <div className="font-bold text-sm">{u.firstName} {u.lastName}</div>
                                    <div className="text-xs text-slate-500">Lvl {u.level} • {u.specializations[0]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

// --- PLACEHOLDER COMPONENTS FOR ROUTES ---

const PlaceholderPage = ({ title, icon: Icon, desc }: any) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
            {Icon && <Icon size={40} />}
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
        <p className="text-slate-500 max-w-md">{desc || "Deze module wordt momenteel ontwikkeld. Binnenkort beschikbaar voor alle leden."}</p>
        <Button className="mt-8" variant="outline">Melding bij lancering</Button>
    </div>
);

export const Boastplug = () => <PlaceholderPage title="Boastplug" icon={Laptop} desc="Jouw persoonlijke portfolio en showcase platform." />;
export const Spontiva = () => <PlaceholderPage title="Spontiva" icon={Zap} desc="Het platform voor spontane connecties en events." />;
export const WoningVrij = () => <PlaceholderPage title="WoningVrij" icon={Home} desc="Exclusief vastgoed aanbod voor VVC leden." />;
export const Investbotiq = () => <PlaceholderPage title="Investbotiq" icon={TrendingUp} desc="AI-gedreven investeringsanalyses en signalen." />;
export const Djobba = () => <PlaceholderPage title="Djobba" icon={Briefcase} desc="De interne marktplaats voor gigs en projecten." />;
export const Pitch = () => <PlaceholderPage title="Sales Pitch" icon={MessageSquare} desc="Oefen je sales pitch met AI feedback." />;
export const Talents = () => <PlaceholderPage title="Talent Pool" icon={UserPlus} desc="Vind en recruit nieuw talent voor je team." />;
export const ReferralPage = () => <PlaceholderPage title="Referral Program" icon={Gift} desc="Nodig vrienden uit en verdien extra rewards." />;
