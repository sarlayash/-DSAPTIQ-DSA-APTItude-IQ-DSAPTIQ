export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type TargetGoal =
  | 'Campus Placement'
  | 'Service-Based Companies'
  | 'Product-Based Companies'
  | 'General Readiness';

export type AssessmentDomain =
  | 'Quantitative Aptitude'
  | 'Logical Reasoning'
  | 'Verbal & Analytical'
  | 'Data Structures'
  | 'Algorithms & Complexity'
  | 'Code Tracing & Logic'
  | 'Industry Scenarios';

export type ExampleCategory =
  | 'Quantitative Aptitude'
  | 'Logical Reasoning'
  | 'Verbal & Analytical'
  | 'Data Structures'
  | 'Algorithms'
  | 'Code Tracing & Complexity'
  | 'Industry Scenarios';

export type LevelDifficulty = 'Easy' | 'Hard' | 'Very Hard' | 'Super Tough';

export interface DailyLevel {
  levelNumber: number; // 1 to 30
  dayNumber: number; // 1 to 30
  title: string;
  domain: string;
  difficulty: LevelDifficulty;
  xpReward: number;
  badgeName: string;
  badgeTitle: string;
  badgeTier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Apex';
  description: string;
  coreConcepts: string[];
  solvedChallenge: {
    title: string;
    description: string;
    keyTakeaway: string;
  };
  hasCertificate: boolean;
  certificateTitle?: string;
}

export interface LearnerCertificateRecord {
  levelNumber: number;
  certificateTitle: string;
  issuedAt: string;
  certificateId: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  level: LearningLevel;
  target: TargetGoal;
  accessCode: string;
  createdAt: string;
  streakCount: number;
  lastActiveDate: string;
  streakProtectionTokens: number;
  bonusPoints: number;
  bookmarks: string[]; // question or example IDs
  understoodExamples: string[];
  badges: string[];
  // Level 1 to 30 Progression
  currentDayLevel?: number;
  completedLevels?: number[];
  totalXP?: number;
  earnedCertificates?: LearnerCertificateRecord[];
}

export interface Question {
  id: string;
  domain: AssessmentDomain;
  topic: string;
  subtopic?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  text: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  visualTrace?: string;
  estimatedSeconds: number;
  version: number;
  tags: string[];
  interviewRelevance?: string;
  commonPitfall?: string;
}

export type AssessmentMode = 'practice' | 'challenge' | 'revision' | 'diagnostic';

export interface QuestionAttempt {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: string;
  mode: AssessmentMode;
}

export interface VisualStep {
  stepNumber: number;
  title: string;
  explanation: string;
  subCodeOrFormula?: string;
}

export interface SolvedExample {
  id: string;
  category: ExampleCategory;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problemStatement: string;
  conceptTested: string;
  steps: VisualStep[];
  visualRepresentation: {
    type: 'ascii-diagram' | 'state-table' | 'pointer-flow' | 'trace';
    content: string;
  };
  finalAnswer: string;
  commonMistake: string;
  interviewRelevance: string;
  relatedPracticeChallenge: string;
}

export interface PRISnapshot {
  overallScore: number; // 0 - 100
  isProvisional: boolean;
  interpretation:
    | 'Foundation building'
    | 'Developing readiness'
    | 'Progressing toward placement readiness'
    | 'Strong demonstrated readiness'
    | 'High demonstrated readiness';
  trend: 'improving' | 'stable' | 'declining';
  components: {
    aptitude: number; // 25%
    dsa: number; // 30%
    logicTracing: number; // 15%
    accuracy: number; // 10%
    speed: number; // 10%
    consistency: number; // 10%
  };
  totalAttemptsCount: number;
  recommendedActions: string[];
  calculatedAt: string;
}

export interface WheelReward {
  id: string;
  label: string;
  description: string;
  type: 'points' | 'token' | 'challenge' | 'blueprint' | 'badge';
  actionLabel?: string;
  perkDetail?: string;
  value?: any;
}

export interface WheelSpinRecord {
  date: string; // YYYY-MM-DD
  timestamp: string;
  rewardId: string;
  rewardLabel: string;
}
