import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { AssessmentView } from './components/AssessmentView';
import { ExamplesView } from './components/ExamplesView';
import { VisualizerView } from './components/VisualizerView';
import { WheelView } from './components/WheelView';
import { IntelligenceView } from './components/IntelligenceView';
import { AdminView } from './components/AdminView';
import { IDEView } from './components/IDEView';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { ResetSessionModal } from './components/ResetSessionModal';
import {
  LearnerProfile,
  QuestionAttempt,
  WheelReward,
  LearningLevel,
  TargetGoal
} from './types';
import {
  getStoredProfile,
  saveProfile,
  createNewLearner,
  getStoredAttempts,
  saveAttempt,
  seedDemoLearnerData,
  resetAllLearnerData
} from './services/storage';
import { calculatePRI } from './services/priCalculator';

export default function App() {
  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [savedExistingProfile, setSavedExistingProfile] = useState<LearnerProfile | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    const existing = getStoredProfile();
    if (existing) {
      setSavedExistingProfile(existing);
      setLearner(existing);
    }
    const atts = getStoredAttempts();
    setAttempts(atts);
  }, []);

  // Compute live PRI score based on attempts and learner profile
  const pri = calculatePRI(
    attempts,
    learner || {
      id: '',
      name: 'Guest',
      level: 'Intermediate',
      target: 'Campus Placement',
      accessCode: '',
      createdAt: '',
      streakCount: 1,
      lastActiveDate: '',
      streakProtectionTokens: 1,
      bonusPoints: 0,
      bookmarks: [],
      understoodExamples: [],
      badges: [],
    }
  );

  const handleStartJourney = (name: string, level: LearningLevel, target: TargetGoal) => {
    const newProfile = createNewLearner(name, level, target);
    setLearner(newProfile);
    setSavedExistingProfile(newProfile);
    setCurrentTab('dashboard');
  };

  const handleRestoreByCode = (code: string): boolean => {
    const existing = getStoredProfile();
    if (existing && existing.accessCode.trim().toLowerCase() === code.trim().toLowerCase()) {
      setLearner(existing);
      setCurrentTab('dashboard');
      return true;
    }
    // Check if matching demo code
    if (code.trim().toUpperCase() === 'DSAPTIQ-9PRO-2026' || code.trim().toUpperCase() === 'DRAPTI-9PRO-2026') {
      const { profile, attempts: seededAttempts } = seedDemoLearnerData();
      setLearner(profile);
      setAttempts(seededAttempts);
      setCurrentTab('dashboard');
      return true;
    }
    return false;
  };

  const handleResumeSaved = () => {
    if (savedExistingProfile) {
      setLearner(savedExistingProfile);
      setCurrentTab('dashboard');
    }
  };

  const handleSeedDemo = () => {
    const { profile, attempts: seededAttempts } = seedDemoLearnerData();
    setLearner(profile);
    setAttempts(seededAttempts);
    setSavedExistingProfile(profile);
    setCurrentTab('dashboard');
  };

  const handleSaveAttempt = (attempt: QuestionAttempt) => {
    const updated = saveAttempt(attempt);
    setAttempts(updated);
  };

  const handleToggleBookmark = (id: string) => {
    if (!learner) return;
    const currentBookmarks = learner.bookmarks || [];
    const updatedBookmarks = currentBookmarks.includes(id)
      ? currentBookmarks.filter((b) => b !== id)
      : [...currentBookmarks, id];

    const updatedProfile: LearnerProfile = {
      ...learner,
      bookmarks: updatedBookmarks,
    };
    saveProfile(updatedProfile);
    setLearner(updatedProfile);
  };

  const handleToggleUnderstood = (id: string) => {
    if (!learner) return;
    const current = learner.understoodExamples || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    const updatedProfile: LearnerProfile = {
      ...learner,
      understoodExamples: updated,
    };
    saveProfile(updatedProfile);
    setLearner(updatedProfile);
  };

  const handleRewardClaimed = (reward: WheelReward) => {
    if (!learner) return;
    let pointsBonus = 0;
    let extraTokens = 0;
    let newBadges = [...(learner.badges || [])];

    if (reward.type === 'points' && reward.value) {
      pointsBonus = Number(reward.value);
    } else if (reward.type === 'token') {
      extraTokens = 1;
    } else if (reward.type === 'badge' && !newBadges.includes('Speed Demon')) {
      newBadges.push('Speed Demon');
    }

    const updatedProfile: LearnerProfile = {
      ...learner,
      bonusPoints: (learner.bonusPoints || 0) + pointsBonus,
      streakProtectionTokens: (learner.streakProtectionTokens || 0) + extraTokens,
      badges: newBadges,
    };
    saveProfile(updatedProfile);
    setLearner(updatedProfile);
  };

  const handleSwitchAccount = () => {
    setIsProfileModalOpen(false);
    setLearner(null);
  };

  const handleLogOffAndResetSession = () => {
    resetAllLearnerData();
    setLearner(null);
    setAttempts([]);
    setSavedExistingProfile(null);
    setCurrentTab('dashboard');
    setIsProfileModalOpen(false);
    setIsResetModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshAdminData = () => {
    const existing = getStoredProfile();
    setLearner(existing);
    setSavedExistingProfile(existing);
    const atts = getStoredAttempts();
    setAttempts(atts);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 flex flex-col justify-between selection:bg-blue-900 selection:text-white">
      {/* Global Brand Header with International Time Zones */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        learner={learner}
        pri={pri}
        onLogout={handleSwitchAccount}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        onLogOffAndReset={() => setIsResetModalOpen(true)}
      />

      {/* Main Body Layout: Left Navigation Sidebar + Workspaces Content */}
      <div className="flex-1 flex min-w-0">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          learner={learner}
          pri={pri}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onLogout={handleSwitchAccount}
          onLogOffAndReset={() => setIsResetModalOpen(true)}
        />

        {/* View Routing Area */}
        <main className="flex-1 min-w-0 bg-slate-50 min-h-[calc(100vh-140px)]">
          {currentTab === 'dashboard' && (
            learner ? (
              <DashboardView
                learner={learner}
                pri={pri}
                attempts={attempts}
                onNavigate={setCurrentTab}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            ) : (
              <LandingView
                onStart={handleStartJourney}
                onRestoreByCode={handleRestoreByCode}
                savedProfile={savedExistingProfile}
                onResumeSaved={handleResumeSaved}
                onSeedDemo={handleSeedDemo}
                onResetSession={() => setIsResetModalOpen(true)}
              />
            )
          )}

          {currentTab === 'ide' && <IDEView />}

          {currentTab === 'assessment' && (
            <AssessmentView
              attempts={attempts}
              onSaveAttempt={handleSaveAttempt}
              bookmarks={learner?.bookmarks || []}
              onToggleBookmark={handleToggleBookmark}
              onAssessmentCompleted={() => setCurrentTab('intelligence')}
            />
          )}

          {currentTab === 'examples' && (
            <ExamplesView
              understoodList={learner?.understoodExamples || []}
              onToggleUnderstood={handleToggleUnderstood}
              bookmarks={learner?.bookmarks || []}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentTab === 'visualizer' && <VisualizerView />}

          {currentTab === 'wheel' && (
            learner ? (
              <WheelView learner={learner} onRewardClaimed={handleRewardClaimed} />
            ) : (
              <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm">
                <h3 className="text-xl font-bold text-blue-950">Profile Required for Streak Rewards</h3>
                <p className="text-sm text-blue-900/80">Complete your initial registration or load a demo profile to unlock the Daily PRI Streak Wheel.</p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Start Onboarding
                </button>
              </div>
            )
          )}

          {currentTab === 'intelligence' && (
            learner ? (
              <IntelligenceView
                learner={learner}
                pri={pri}
                attempts={attempts}
              />
            ) : (
              <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm">
                <h3 className="text-xl font-bold text-blue-950">PRI Matrix Awaiting Learner Profile</h3>
                <p className="text-sm text-blue-900/80">Start an onboarding session or solve questions to compute your real-time 6-vector Placement Readiness Index.</p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Start Onboarding
                </button>
              </div>
            )
          )}

          {currentTab === 'admin' && (
            <AdminView onRefreshData={handleRefreshAdminData} />
          )}
        </main>
      </div>

      {/* Global Footer with Brand Endorsement, Tracks, Modules, and International Time Zones */}
      <Footer onNavigate={setCurrentTab} />

      {/* Profile & Recovery Settings Modal */}
      {learner && (
        <ProfileModal
          learner={learner}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdateProfile={(updated) => setLearner(updated)}
          onSwitchAccount={handleSwitchAccount}
          onLogOffAndReset={() => {
            setIsProfileModalOpen(false);
            setIsResetModalOpen(true);
          }}
        />
      )}

      {/* Global Log Off & Reset Session Confirmation Modal */}
      <ResetSessionModal
        isOpen={isResetModalOpen}
        learner={learner || savedExistingProfile}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleLogOffAndResetSession}
      />
    </div>
  );
}
