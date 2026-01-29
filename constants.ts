import { Mission, MissionCategory, MissionStatus, User, UserStatus, Team, Notification } from './types';

export const createMission = (
  id: string,
  title: string,
  category: MissionCategory,
  description: string,
  steps: Partial<any>[],
  status: MissionStatus = MissionStatus.LOCKED,
  isPrio: boolean = false,
  minLevel: number = 0
): Mission => ({
  id,
  title,
  category,
  description,
  xpReward: 50,
  status,
  isPrio,
  requirements: { minLevel },
  steps: steps.map((s, i) => ({
    id: `${id}_s${i + 1}`,
    title: s.title || `Stap ${i + 1}`,
    description: s.description || '',
    requiredInputType: s.requiredInputType || 'text',
    completed: false,
    ...s
  }))
});

export const generateMissionLibrary = (): Mission[] => {
  const missions: Mission[] = [];
  missions.push(
    createMission(
      'm_onb_001',
      'Profiel & Identiteit verificatie',
      MissionCategory.ONBOARDING,
      'Voltooi je basisregistratie om uitbetaald te kunnen worden.',
      [
        { title: 'Persoonsgegevens', description: 'Controleer je naam zoals op je ID.', requiredInputType: 'text' },
        { title: 'Contactgegevens', description: 'Bevestig je e-mailadres en telefoonnummer.', requiredInputType: 'email' },
        { title: 'ID Bewijs', description: 'Upload een geldige kopie van je ID of paspoort.', requiredInputType: 'file' },
        { title: 'Adres', description: 'Upload bewijs van adres (max 3 maanden oud).', requiredInputType: 'file' },
        { title: 'IBAN', description: 'Voer je IBAN in voor uitbetalingen.', requiredInputType: 'iban' }
      ],
      MissionStatus.AVAILABLE,
      true
    ),
    createMission(
      'm_onb_002',
      'NDA Ondertekening',
      MissionCategory.ONBOARDING,
      'Teken de geheimhoudingsverklaring om toegang te krijgen tot klantdata.',
      [
        { title: 'Lees NDA', description: 'Lees het document aandachtig door.', requiredInputType: 'boolean' },
        { title: 'Ondertekening', description: 'Upload het getekende document.', requiredInputType: 'file' },
        { title: 'Bevestiging', description: 'Ik verklaar bevoegd te zijn om te tekenen.', requiredInputType: 'boolean' }
      ],
      MissionStatus.AVAILABLE,
      true
    )
  );

  for (let i = 1; i <= 5; i++) {
    missions.push(
      createMission(
        `m_prio_daily_${i}`,
        `Check-in Dag ${i}`,
        MissionCategory.PRIO_CHECKIN,
        'Dagelijkse voortgangsupdate.',
        [
          { title: 'Beschikbaar?', description: 'Ben je vandaag beschikbaar?', requiredInputType: 'boolean' },
          { title: 'Uren', description: 'Hoeveel uur heb je gewerkt?', requiredInputType: 'number' },
          { title: 'Blokkades', description: 'Loop je ergens tegenaan?', requiredInputType: 'text' }
        ],
        i === 1 ? MissionStatus.AVAILABLE : MissionStatus.LOCKED,
        true,
        0
      )
    );
  }

  const qaTasks = ['Validatie Login Flow', 'Check Responsive Design', 'Audit Tekstuele Fouten'];
  qaTasks.forEach((task, i) =>
    missions.push(
      createMission(
        `m_qc_${i}`,
        task,
        MissionCategory.QUALITY,
        'Voer een uitgebreide kwaliteitscontrole uit op het aangewezen onderdeel.',
        [
          { title: 'Testplan', description: 'Lees het testplan zorgvuldig.', requiredInputType: 'boolean' },
          { title: 'Bevindingen', description: 'Rapporteer je bevindingen in detail.', requiredInputType: 'long_text' }
        ],
        MissionStatus.LOCKED,
        false,
        2
      )
    )
  );
  return missions;
};

export const MOCK_MISSIONS = generateMissionLibrary();

export const CURRENT_USER: User = {
  id: 'u_123',
  firstName: 'Sanne',
  lastName: 'de Vries',
  email: 'sanne@vvc.work',
  level: 4,
  xp: 350,
  status: UserStatus.ACTIVE,
  avatarUrl: 'https://picsum.photos/200/200',
  specializations: ['Content', 'QA'],
  bio: 'Focus op kwaliteit en conversie optimalisatie.',
  teamId: 't_alpha'
};

export const MOCK_TEAMS: Team[] = [
  { id: 't_alpha', name: 'Team Alpha', members: ['u_123', 'u_2', 'u_3'], score: 1450 },
  { id: 't_beta', name: 'Team Beta', members: ['u_4', 'u_5'], score: 1320 }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Onboarding Compleet', message: 'Je ID is geverifieerd. Je kunt nu starten met missies.', type: 'success', read: false, timestamp: Date.now() - 3600000 },
  { id: 'n2', title: 'Prio Taak', message: 'Je dagelijkse check-in staat klaar.', type: 'mission_invite', read: false, timestamp: Date.now() - 7200000 }
];

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  { id: 'u_2', firstName: 'Peter', lastName: 'Jansen', email: 'peter@vvc.work', level: 12, xp: 10, status: UserStatus.ACTIVE, avatarUrl: 'https://picsum.photos/201/201', specializations: ['Sales'], teamId: 't_alpha' },
  { id: 'u_3', firstName: 'Klaas', lastName: 'Vaak', email: 'klaas@vvc.work', level: 2, xp: 90, status: UserStatus.NEW, avatarUrl: 'https://picsum.photos/202/202', specializations: ['Review'], teamId: 't_alpha' },
  { id: 'u_4', firstName: 'Lotte', lastName: 'Bakker', email: 'lotte@vvc.work', level: 8, xp: 50, status: UserStatus.ACTIVE, avatarUrl: 'https://picsum.photos/203/203', specializations: ['Community'], teamId: 't_beta' }
];

export const translations: Record<string, Record<'nl' | 'en', string>> = {
  'nav.dashboard': { nl: 'Dashboard', en: 'Dashboard' },
  'nav.onboarding': { nl: 'Onboarding', en: 'Onboarding' },
  'nav.community': { nl: 'Community', en: 'Community' },
  'nav.chat': { nl: 'Chat', en: 'Chat' },
  'nav.prospects': { nl: 'Pitch', en: 'Pitch' },
  'nav.talents': { nl: 'Talents', en: 'Talents' },
  'nav.referral': { nl: 'Referral', en: 'Referral' },
  'nav.boastplug': { nl: 'Boastplug', en: 'Boastplug' },
  'nav.woningvrij': { nl: 'WoningVrij', en: 'WoningVrij' },
  'nav.profile': { nl: 'Mijn Profiel', en: 'My Profile' },
  'nav.logout': { nl: 'Uitloggen', en: 'Logout' },
  'nav.platform': { nl: 'Platform', en: 'Platform' },
  'nav.network': { nl: 'Netwerk', en: 'Network' },
  'nav.apps': { nl: 'Apps', en: 'Apps' }
};