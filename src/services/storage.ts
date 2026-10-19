import { LearnerProfile, QuestionAttempt, WheelSpinRecord } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'dsaptiq_learner_profile',
  OLD_PROFILE: 'drapti_learner_profile',
  ATTEMPTS: 'dsaptiq_question_attempts',
  OLD_ATTEMPTS: 'drapti_question_attempts',
  WHEEL_SPINS: 'dsaptiq_wheel_spins',
  OLD_WHEEL_SPINS: 'drapti_wheel_spins',
  ACTIVE_SESSION: 'dsaptiq_active_assessment_state',
};

export function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let segment = '';
  for (let i = 0; i < 4; i++) {
    segment += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DSAPTIQ-${segment}-${new Date().getFullYear()}`;
}

export function getStoredProfile(): LearnerProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem(STORAGE_KEYS.OLD_PROFILE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse learner profile:', e);
    return null;
  }
}

export function saveProfile(profile: LearnerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save learner profile:', e);
  }
}

export function createNewLearner(
  name: string,
  level: LearnerProfile['level'] = 'Intermediate',
  target: LearnerProfile['target'] = 'Campus Placement'
): LearnerProfile {
  const today = new Date().toISOString().split('T')[0];
  const newProfile: LearnerProfile = {
    id: `learner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    level,
    target,
    accessCode: generateAccessCode(),
    createdAt: new Date().toISOString(),
    streakCount: 1,
    lastActiveDate: today,
    streakProtectionTokens: 1,
    bonusPoints: 100, // Welcome points
    bookmarks: [],
    understoodExamples: [],
    badges: ['DSAPTIQ Pioneer'],
    currentDayLevel: 1,
    completedLevels: [],
    totalXP: 100,
    earnedCertificates: [],
  };
  saveProfile(newProfile);
  return newProfile;
}

export function getStoredAttempts(): QuestionAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveAttempt(attempt: QuestionAttempt): QuestionAttempt[] {
  const current = getStoredAttempts();
  // If already attempted this question in this session, replace or append
  const filtered = current.filter(a => a.questionId !== attempt.questionId);
  const updated = [...filtered, attempt];
  try {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save attempt:', e);
  }
  return updated;
}

export function getStoredWheelSpins(): WheelSpinRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WHEEL_SPINS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function canSpinWheelToday(): boolean {
  const today = new Date().toISOString().split('T')[0];
  const spins = getStoredWheelSpins();
  return !spins.some(s => s.date === today);
}

export function recordWheelSpin(rewardId: string, rewardLabel: string): WheelSpinRecord {
  const today = new Date().toISOString().split('T')[0];
  const record: WheelSpinRecord = {
    date: today,
    timestamp: new Date().toISOString(),
    rewardId,
    rewardLabel,
  };
  const spins = getStoredWheelSpins();
  spins.push(record);
  try {
    localStorage.setItem(STORAGE_KEYS.WHEEL_SPINS, JSON.stringify(spins));
  } catch (e) {
    console.error('Failed to save spin:', e);
  }
  return record;
}

export function resetAllLearnerData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.OLD_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.OLD_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.WHEEL_SPINS);
    localStorage.removeItem(STORAGE_KEYS.OLD_WHEEL_SPINS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    sessionStorage.clear();
  } catch (e) {
    console.error('Error resetting learner session data:', e);
  }
}

export function seedDemoLearnerData(): { profile: LearnerProfile; attempts: QuestionAttempt[] } {
  const profile: LearnerProfile = {
    id: 'demo_kapil_learner',
    name: 'Kapil Narula',
    level: 'Advanced',
    target: 'Product-Based Companies',
    accessCode: 'DSAPTIQ-9PRO-2026',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    streakCount: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakProtectionTokens: 2,
    bonusPoints: 450,
    bookmarks: ['Q001', 'Q047', 'EX26', 'EX49'],
    understoodExamples: ['EX01', 'EX02', 'EX26', 'EX36', 'EX49'],
    badges: ['DSAPTIQ Pioneer', '5-Day Streak Master', 'Logic Virtuoso', 'Array Pioneer', 'String Maestro', 'Foundation Laureate'],
    currentDayLevel: 8,
    completedLevels: [1, 2, 3, 4, 5, 6, 7],
    totalXP: 2450,
    earnedCertificates: [
      {
        levelNumber: 1,
        certificateTitle: 'Day 1 Array Mechanics Certificate of Completion',
        issuedAt: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
        certificateId: 'DSAPTIQ-CERT-LVL1-8392-2026',
      },
      {
        levelNumber: 7,
        certificateTitle: 'Level 7 Foundation Placement Readiness Certificate',
        issuedAt: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
        certificateId: 'DSAPTIQ-CERT-LVL7-9921-2026',
      }
    ],
  };
  saveProfile(profile);

  // Seed 25 realistic attempts to showcase an established PRI score
  const demoAttempts: QuestionAttempt[] = [
    { questionId: 'Q001', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 42, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q002', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 50, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q003', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 38, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q004', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 58, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q005', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 32, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q006', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 28, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q007', selectedIndex: 2, isCorrect: true, timeSpentSeconds: 25, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q021', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 31, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q022', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 24, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q023', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 65, timestamp: new Date().toISOString(), mode: 'challenge' },
    { questionId: 'Q024', selectedIndex: 2, isCorrect: true, timeSpentSeconds: 19, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q036', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 22, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q037', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 20, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q046', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 30, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q047', selectedIndex: 2, isCorrect: true, timeSpentSeconds: 45, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q048', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 35, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q049', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 28, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q050', selectedIndex: 2, isCorrect: true, timeSpentSeconds: 22, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q066', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 25, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q067', selectedIndex: 2, isCorrect: true, timeSpentSeconds: 20, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q068', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 35, timestamp: new Date().toISOString(), mode: 'challenge' },
    { questionId: 'Q081', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 32, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q082', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 40, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q091', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 35, timestamp: new Date().toISOString(), mode: 'practice' },
    { questionId: 'Q092', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 30, timestamp: new Date().toISOString(), mode: 'practice' },
  ];
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(demoAttempts));

  return { profile, attempts: demoAttempts };
}
