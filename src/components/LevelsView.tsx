import React, { useState, useRef, useEffect } from 'react';
import {
  Award,
  Shield,
  Download,
  Eye,
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
  ArrowRight,
  Filter,
  Check,
  X,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { DailyLevel, LearnerProfile, LevelDifficulty } from '../types';
import { DAILY_30_LEVELS } from '../data/dailyLevels';
import {
  renderCertificateToCanvas,
  renderBadgeToCanvas,
  downloadCertificatePNG,
  downloadBadgePNG,
  CertificateData,
  BadgeData
} from '../services/certificateRenderer';

interface LevelsViewProps {
  learner: LearnerProfile | null;
  onUpdateLearner?: (updated: LearnerProfile) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const LevelsView: React.FC<LevelsViewProps> = ({
  learner,
  onUpdateLearner,
  onNavigateToTab,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [activeModalCertificate, setActiveModalCertificate] = useState<CertificateData | null>(null);
  const [activeModalBadge, setActiveModalBadge] = useState<BadgeData | null>(null);
  const [completionNotice, setCompletionNotice] = useState<string | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const badgeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const candidateName = learner?.name || 'Candidate Aspirant';
  const completedLevels = learner?.completedLevels || [1];
  const currentDayLevel = learner?.currentDayLevel || Math.max(1, Math.max(...completedLevels, 0) + 1);
  const totalXP = learner?.totalXP || 250;

  // Filter levels based on selected difficulty tier
  const filteredLevels = DAILY_30_LEVELS.filter((lvl) => {
    if (selectedTier === 'all') return true;
    if (selectedTier === 'easy') return lvl.difficulty === 'Easy';
    if (selectedTier === 'hard') return lvl.difficulty === 'Hard';
    if (selectedTier === 'very-hard') return lvl.difficulty === 'Very Hard';
    if (selectedTier === 'super-tough') return lvl.difficulty === 'Super Tough';
    return true;
  });

  // Calculate statistics
  const completedCount = completedLevels.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  // Render Certificate into modal canvas whenever activeModalCertificate changes
  useEffect(() => {
    if (activeModalCertificate && previewCanvasRef.current) {
      renderCertificateToCanvas(activeModalCertificate, previewCanvasRef.current);
    }
  }, [activeModalCertificate]);

  // Render Badge into modal canvas whenever activeModalBadge changes
  useEffect(() => {
    if (activeModalBadge && badgeCanvasRef.current) {
      renderBadgeToCanvas(activeModalBadge, badgeCanvasRef.current);
    }
  }, [activeModalBadge]);

  // Handle Mark Level Completed
  const handleCompleteLevel = (level: DailyLevel) => {
    if (!learner || !onUpdateLearner) return;

    if (completedLevels.includes(level.levelNumber)) {
      setCompletionNotice(`Level ${level.levelNumber} is already completed.`);
      setTimeout(() => setCompletionNotice(null), 3000);
      return;
    }

    const newCompleted = [...completedLevels, level.levelNumber].sort((a, b) => a - b);
    const newXP = (learner.totalXP || 0) + level.xpReward;
    const newBadges = [...(learner.badges || [])];
    if (!newBadges.includes(level.badgeName)) {
      newBadges.push(level.badgeName);
    }

    const nextLevelNum = Math.min(30, Math.max(...newCompleted) + 1);

    const newCerts = [...(learner.earnedCertificates || [])];
    if (level.hasCertificate && level.certificateTitle) {
      newCerts.push({
        levelNumber: level.levelNumber,
        certificateTitle: level.certificateTitle,
        issuedAt: new Date().toISOString().split('T')[0],
        certificateId: `DSAPTIQ-CERT-LVL${level.levelNumber}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      });
    }

    const updatedProfile: LearnerProfile = {
      ...learner,
      completedLevels: newCompleted,
      currentDayLevel: nextLevelNum,
      totalXP: newXP,
      badges: newBadges,
      earnedCertificates: newCerts,
    };

    onUpdateLearner(updatedProfile);
    setCompletionNotice(`Level ${level.levelNumber} Completed! Earned +${level.xpReward} XP & "${level.badgeName}" Badge!`);
    setTimeout(() => setCompletionNotice(null), 4000);
  };

  // Helper to open certificate preview
  const handlePreviewCertificate = (level: DailyLevel) => {
    const certData: CertificateData = {
      candidateName,
      levelNumber: level.levelNumber,
      dayNumber: level.dayNumber,
      levelTitle: level.title,
      difficulty: level.difficulty,
      badgeName: level.badgeName,
      xpReward: level.xpReward,
      totalXP,
      accessCode: learner?.accessCode || 'DSAPTIQ-9PRO-2026',
      issuedDate: new Date().toISOString().split('T')[0],
      certificateId: `DSAPTIQ-CERT-LVL${level.levelNumber}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      certificateTitle: level.certificateTitle || `Day ${level.dayNumber} Level ${level.levelNumber} Completion Certificate`,
    };
    setActiveModalCertificate(certData);
  };

  // Helper to open badge preview
  const handlePreviewBadge = (level: DailyLevel) => {
    const badgeData: BadgeData = {
      badgeName: level.badgeName,
      badgeTitle: level.badgeTitle,
      badgeTier: level.badgeTier,
      levelNumber: level.levelNumber,
      dayNumber: level.dayNumber,
      candidateName,
    };
    setActiveModalBadge(badgeData);
  };

  // Helper to download certificate directly
  const handleDirectDownloadCertificate = (level: DailyLevel) => {
    const certData: CertificateData = {
      candidateName,
      levelNumber: level.levelNumber,
      dayNumber: level.dayNumber,
      levelTitle: level.title,
      difficulty: level.difficulty,
      badgeName: level.badgeName,
      xpReward: level.xpReward,
      totalXP,
      accessCode: learner?.accessCode || 'DSAPTIQ-9PRO-2026',
      issuedDate: new Date().toISOString().split('T')[0],
      certificateId: `DSAPTIQ-CERT-LVL${level.levelNumber}-${Math.floor(1000 + Math.random() * 9000)}-2026`,
      certificateTitle: level.certificateTitle || `Day ${level.dayNumber} Level ${level.levelNumber} Completion Certificate`,
    };
    downloadCertificatePNG(certData);
  };

  // Helper to download badge directly
  const handleDirectDownloadBadge = (level: DailyLevel) => {
    const badgeData: BadgeData = {
      badgeName: level.badgeName,
      badgeTitle: level.badgeTitle,
      badgeTier: level.badgeTier,
      levelNumber: level.levelNumber,
      dayNumber: level.dayNumber,
      candidateName,
    };
    downloadBadgePNG(badgeData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Toast Notification */}
      {completionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-blue-950 text-white border border-blue-800 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 text-red-500 shrink-0" />
          <span className="text-xs font-mono font-bold">{completionNotice}</span>
          <button
            onClick={() => setCompletionNotice(null)}
            className="text-white hover:text-red-400 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Executive Hero Banner */}
      <div className="corporate-card rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-900 text-white text-[11px] font-mono font-extrabold uppercase">
                30-DAY PLACEMENT CURRICULUM
              </span>
              <span className="text-xs font-mono font-bold text-red-600">
                1 LEVEL PER DAY · EASY TO SUPER TOUGH
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Daily Level Mastery, Badges & High-Res PNG Certificates
            </h1>

            <p className="text-sm text-blue-900/80 max-w-3xl leading-relaxed">
              Ascend from <strong className="text-blue-950">Level 1 (Easy)</strong> up to the prestigious{' '}
              <strong className="text-red-600">Level 30 (Super Tough Apex)</strong>. Complete daily enterprise challenges to earn verified XP, high-res 800×800 PNG medallion badges, and official accredited PNG certificates with zero overlapping or border formatting errors.
            </p>
          </div>

          {/* Quick Profile Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-bold text-blue-950">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-red-600" />
                <span>Candidate Standing</span>
              </span>
              <span className="font-mono text-red-600">Day {currentDayLevel}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-mono text-blue-900">LEVEL</div>
                <div className="text-base font-extrabold text-blue-950">{completedCount}/30</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-mono text-blue-900">TOTAL XP</div>
                <div className="text-base font-extrabold text-red-600">+{totalXP.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-mono text-blue-900">BADGES</div>
                <div className="text-base font-extrabold text-blue-900">{learner?.badges?.length || 1}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono font-bold text-blue-900">
                <span>30-Day Completion</span>
                <span className="text-red-600">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-900 via-blue-800 to-red-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-blue-900 border border-slate-200 hover:border-blue-300'
            }`}
          >
            All 30 Levels (Days 1–30)
          </button>

          <button
            onClick={() => setSelectedTier('easy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTier === 'easy'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-blue-900 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <span>Tier 1: Easy</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 text-blue-950">Days 1–7</span>
          </button>

          <button
            onClick={() => setSelectedTier('hard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTier === 'hard'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-blue-900 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <span>Tier 2: Hard</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-950">Days 8–15</span>
          </button>

          <button
            onClick={() => setSelectedTier('very-hard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTier === 'very-hard'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-blue-900 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <span>Tier 3: Very Hard</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-100 text-red-950">Days 16–23</span>
          </button>

          <button
            onClick={() => setSelectedTier('super-tough')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTier === 'super-tough'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-red-600 border border-red-200 hover:border-red-400'
            }`}
          >
            <span>Tier 4: Super Tough</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-100 text-red-950">Days 24–30</span>
          </button>
        </div>

        <div className="text-xs font-mono font-bold text-blue-900">
          Showing {filteredLevels.length} of 30 Levels
        </div>
      </div>

      {/* Grid of 30 Daily Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLevels.map((lvl) => {
          const isCompleted = completedLevels.includes(lvl.levelNumber);
          const isCurrent = lvl.levelNumber === currentDayLevel;
          const isLocked = lvl.levelNumber > currentDayLevel && !isCompleted;

          const difficultyBadgeColors: Record<LevelDifficulty, { bg: string; text: string; border: string }> = {
            Easy: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
            Hard: { bg: 'bg-blue-50', text: 'text-blue-950', border: 'border-blue-300' },
            'Very Hard': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
            'Super Tough': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' }
          };

          const diffStyle = difficultyBadgeColors[lvl.difficulty];

          return (
            <div
              key={lvl.levelNumber}
              className={`corporate-card rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                isCompleted
                  ? 'border-blue-300 bg-white shadow-xs'
                  : isCurrent
                  ? 'border-red-400 bg-red-50/20 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200 bg-slate-50/50 opacity-90'
              }`}
            >
              {/* Card Top Strip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-blue-950 px-2 py-0.5 rounded bg-blue-100 border border-blue-200">
                      DAY {lvl.dayNumber} · LVL {lvl.levelNumber}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                    >
                      {lvl.difficulty}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    +{lvl.xpReward} XP
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-blue-950 leading-tight">
                  {lvl.title}
                </h3>

                <p className="text-xs font-medium text-blue-900/80 leading-relaxed line-clamp-2">
                  {lvl.description}
                </p>

                {/* Core Invariant Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lvl.coreConcepts.slice(0, 2).map((c, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-blue-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[200px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badge & Challenge Highlight */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-950 text-white flex items-center justify-center font-mono font-extrabold text-xs">
                      {lvl.levelNumber}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-blue-900">MEDALLION BADGE</div>
                      <div className="text-xs font-extrabold text-blue-950 truncate max-w-[150px]">
                        {lvl.badgeName}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Download Badge PNG */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePreviewBadge(lvl)}
                      className="p-1.5 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-100/60 border border-slate-200 transition-colors cursor-pointer"
                      title="Preview 800x800 Badge"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDirectDownloadBadge(lvl)}
                      className="p-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                      title="Download 800x800 Badge in PNG Format"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Solved Challenge Teaser */}
                <div className="text-[11px] text-blue-950 font-medium border-t border-slate-200/80 pt-1.5">
                  <span className="font-bold text-red-600">Case: </span>
                  <span className="text-blue-900 truncate block">{lvl.solvedChallenge.title}</span>
                </div>
              </div>

              {/* Milestone Certificate Tag if Available */}
              {lvl.hasCertificate && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200 text-xs">
                  <div className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-blue-900" />
                    <span className="font-extrabold text-blue-950 text-[11px]">
                      Official Accredited Certificate
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePreviewCertificate(lvl)}
                      className="text-[10px] font-mono font-bold text-blue-900 hover:text-blue-950 underline cursor-pointer"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleDirectDownloadCertificate(lvl)}
                      className="text-[10px] font-mono font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>PNG</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {isCompleted ? (
                  <div className="flex items-center gap-2 w-full justify-between">
                    <span className="flex items-center gap-1 text-xs font-mono font-bold text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-900" />
                      <span>Completed</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDirectDownloadBadge(lvl)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-blue-900 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Download Badge PNG"
                      >
                        <Download className="w-3 h-3 text-blue-900" />
                        <span>Badge</span>
                      </button>

                      <button
                        onClick={() => handleDirectDownloadCertificate(lvl)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Download Certificate PNG"
                      >
                        <Download className="w-3 h-3 text-white" />
                        <span>Certificate</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={() => handleCompleteLevel(lvl)}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors ${
                        isCurrent
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-blue-900 hover:bg-blue-800 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Complete Day {lvl.dayNumber} (+{lvl.xpReward} XP)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* CERTIFICATE FULL PREVIEW MODAL                                */}
      {/* ============================================================== */}
      {activeModalCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-blue-950 space-y-4 max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-900" />
                <div>
                  <h3 className="text-base font-extrabold text-blue-950">
                    {activeModalCertificate.certificateTitle}
                  </h3>
                  <p className="text-xs text-blue-900 font-mono">
                    High-Resolution (1600×1130) PNG Format · Zero Overlapping Bounds
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadCertificatePNG(activeModalCertificate)}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Certificate PNG</span>
                </button>
                <button
                  onClick={() => setActiveModalCertificate(null)}
                  className="p-1.5 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Canvas Preview Container */}
            <div className="flex-1 min-h-0 overflow-auto bg-slate-100 p-4 rounded-xl flex items-center justify-center border border-slate-200">
              <canvas
                ref={previewCanvasRef}
                className="max-w-full max-h-[60vh] object-contain rounded shadow-lg border border-slate-300 bg-white"
              />
            </div>

            {/* Modal Bottom Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-blue-900 font-mono pt-2">
              <div>
                <span>Candidate: <strong className="text-blue-950 font-bold">{activeModalCertificate.candidateName}</strong></span>
                <span className="mx-2">·</span>
                <span>Tier: <strong className="text-red-600 font-bold">{activeModalCertificate.difficulty}</strong></span>
              </div>
              <div>
                <span>Credential ID: <strong className="text-blue-950">{activeModalCertificate.certificateId}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* BADGE FULL PREVIEW MODAL                                      */}
      {/* ============================================================== */}
      {activeModalBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-blue-950 space-y-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-blue-950">
                    {activeModalBadge.badgeName}
                  </h3>
                  <p className="text-xs text-blue-900 font-mono">
                    800×800 High-Resolution Medallion Badge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadBadgePNG(activeModalBadge)}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download Badge PNG</span>
                </button>
                <button
                  onClick={() => setActiveModalBadge(null)}
                  className="p-1 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Canvas Badge Preview */}
            <div className="bg-slate-100 p-6 rounded-xl flex items-center justify-center border border-slate-200">
              <canvas
                ref={badgeCanvasRef}
                className="w-64 h-64 object-contain rounded-full shadow-lg border border-slate-300"
              />
            </div>

            {/* Badge Details */}
            <div className="text-center space-y-1">
              <div className="text-xs font-mono font-extrabold text-red-600 uppercase">
                {activeModalBadge.badgeTier} TIER MEDALLION
              </div>
              <div className="text-sm font-extrabold text-blue-950">
                {activeModalBadge.badgeTitle}
              </div>
              <div className="text-xs text-blue-900/80 font-mono">
                Conferred for mastering Day {activeModalBadge.dayNumber} (Level {activeModalBadge.levelNumber})
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
