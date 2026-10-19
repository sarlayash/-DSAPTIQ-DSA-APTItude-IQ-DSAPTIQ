import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Clock,
  Shield,
  RotateCw
} from 'lucide-react';
import { LearnerProfile, WheelReward, WheelSpinRecord } from '../types';
import { canSpinWheelToday, recordWheelSpin, getStoredWheelSpins } from '../services/storage';

interface WheelViewProps {
  learner: LearnerProfile;
  onRewardClaimed: (reward: WheelReward) => void;
}

const WHEEL_REWARDS: WheelReward[] = [
  { id: 'rw1', label: '+50 Revision Points', description: 'Added 50 practice points to your profile.', type: 'points', value: 50 },
  { id: 'rw2', label: 'Streak Protection Token', description: 'Preserves your streak in case you miss a day.', type: 'token', value: 1 },
  { id: 'rw3', label: 'Visual Masterclass', description: 'Unlocked an advanced Trie & Graph visual breakdown.', type: 'blueprint' },
  { id: 'rw4', label: 'Bonus DSA Challenge', description: 'Unlocked a high-yield FAANG binary tree challenge.', type: 'challenge' },
  { id: 'rw5', label: 'Double XP Next 10 Qs', description: 'Double reward multiplier for your next 10 correct answers.', type: 'points', value: 100 },
  { id: 'rw6', label: 'Speed Demon Badge', description: 'Earned the coveted DSAPTIQ Speed Demon placement badge.', type: 'badge' },
  { id: 'rw7', label: '+75 Practice Points', description: 'Added 75 learning reward points.', type: 'points', value: 75 },
  { id: 'rw8', label: 'Industry System Blueprint', description: 'Unlocked Distributed Caching Architecture guide.', type: 'blueprint' },
];

export const WheelView: React.FC<WheelViewProps> = ({ learner, onRewardClaimed }) => {
  const [canSpin, setCanSpin] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [wonReward, setWonReward] = useState<WheelReward | null>(null);
  const [spinHistory, setSpinHistory] = useState<WheelSpinRecord[]>([]);
  const [timeLeftToMidnight, setTimeLeftToMidnight] = useState<string>('');

  useEffect(() => {
    setCanSpin(canSpinWheelToday());
    setSpinHistory(getStoredWheelSpins());

    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeLeftToMidnight(`${hours}h ${mins}m ${secs}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;
    setIsSpinning(true);
    setWonReward(null);

    const randomIndex = Math.floor(Math.random() * WHEEL_REWARDS.length);
    const sliceAngle = 360 / WHEEL_REWARDS.length;
    const targetAngle = 1800 + (360 - randomIndex * sliceAngle - sliceAngle / 2);

    setRotationDegree(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setCanSpin(false);
      const reward = WHEEL_REWARDS[randomIndex];
      setWonReward(reward);
      recordWheelSpin(reward.id, reward.label);
      setSpinHistory(getStoredWheelSpins());
      onRewardClaimed(reward);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F2942', '#1E3A8A', '#DC2626', '#991B1B'],
      });
    }, 4000);
  };

  const sliceAngle = 360 / WHEEL_REWARDS.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-red-600 uppercase">
              DAILY REWARD ACCELERATOR
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              1 Eligible Spin / Day
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            DSAPTIQ Daily Streak Bonus Wheel
          </h1>
          <p className="text-xs sm:text-sm text-blue-900 max-w-xl leading-relaxed font-medium">
            Boost your learning consistency. Unlock streak tokens, challenge blueprints, and practice multipliers every 24 hours.
          </p>
        </div>

        {/* Status / Countdown */}
        <div className="bg-slate-50 border border-blue-200 px-5 py-3 rounded-xl flex items-center gap-4 shrink-0 font-mono">
          <div>
            <span className="text-[10px] text-blue-800 uppercase block font-bold">Next Reset</span>
            <span className="text-sm font-extrabold text-red-600">{timeLeftToMidnight}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Main Wheel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Wheel Component (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          {/* Top Pointer Indicator */}
          <div className="absolute top-4 z-20 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-600 drop-shadow-[0_2px_6px_rgba(220,38,38,0.5)]" />
          </div>

          {/* SVG Rotating Wheel */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-4">
            <svg
              className="w-full h-full transition-all duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
              style={{ transform: `rotate(${rotationDegree}deg)` }}
              viewBox="0 0 400 400"
            >
              {/* Slices: Blue and Red alternating corporate colors */}
              {WHEEL_REWARDS.map((reward, i) => {
                const angle = i * sliceAngle;
                const radStart = (angle * Math.PI) / 180;
                const radEnd = ((angle + sliceAngle) * Math.PI) / 180;
                const x1 = 200 + 190 * Math.cos(radStart);
                const y1 = 200 + 190 * Math.sin(radStart);
                const x2 = 200 + 190 * Math.cos(radEnd);
                const y2 = 200 + 190 * Math.sin(radEnd);

                const isEven = i % 2 === 0;
                const fillColor = isEven ? '#0A192F' : '#991B1B';

                return (
                  <g key={reward.id}>
                    <path
                      d={`M 200 200 L ${x1} ${y1} A 190 190 0 0 1 ${x2} ${y2} Z`}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    {/* Slice Text */}
                    <text
                      x="290"
                      y="204"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      transform={`rotate(${angle + sliceAngle / 2}, 200, 200)`}
                      textAnchor="middle"
                    >
                      {reward.label.split(' ')[0]} {reward.label.split(' ')[1] || ''}
                    </text>
                  </g>
                );
              })}

              {/* Center Hub */}
              <circle cx="200" cy="200" r="45" fill="#FFFFFF" stroke="#0A192F" strokeWidth="4" />
              <circle cx="200" cy="200" r="28" fill="#F8FAFC" />
            </svg>

            {/* Center Logo in stationary anchor */}
            <div className="absolute pointer-events-none text-center font-mono font-extrabold text-xs text-blue-950 uppercase tracking-wider">
              DSAPTIQ
            </div>
          </div>

          {/* Action Spin Button */}
          <div className="mt-4 text-center space-y-2">
            <button
              onClick={handleSpin}
              disabled={!canSpin || isSpinning}
              className={`px-8 py-3.5 rounded-xl font-extrabold text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                canSpin && !isSpinning
                  ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 active:scale-95 shadow-red-600/20'
                  : 'bg-slate-200 text-blue-900/60 cursor-not-allowed opacity-70'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : canSpin ? 'SPIN DAILY WHEEL' : 'SPUN TODAY'}</span>
            </button>

            {!canSpin && (
              <p className="text-xs text-blue-900 font-mono font-medium">
                Your next eligible spin unlocks at midnight.
              </p>
            )}
          </div>
        </div>

        {/* Right: Rules & History (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Integrity Note Box */}
          <div className="p-5 rounded-2xl bg-white border border-blue-200 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
              <Shield className="w-4 h-4 text-red-600" />
              <span>DSAPTIQ Product Rule: Learning-First Rewards</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              The wheel is an engagement feature to reward consistent daily study habits. Wheel rewards, bonus tokens, and streak points <strong>never artificially inflate your Placement Readiness Index (PRI)</strong>, ensuring verified candidate integrity.
            </p>
          </div>

          {/* Spin History Log */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <span className="text-xs font-mono font-extrabold text-blue-950 uppercase tracking-wider block">
              Recent Reward History
            </span>

            {spinHistory.length === 0 ? (
              <div className="text-xs text-blue-900 font-mono py-4 text-center font-medium">
                No spins recorded yet. Spin the wheel to unlock your first reward!
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {spinHistory.slice().reverse().map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-blue-950 font-bold block">{rec.rewardLabel}</span>
                      <span className="text-[10px] text-blue-800 font-medium">{rec.date}</span>
                    </div>
                    <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Claimed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Won Reward Modal */}
      {wonReward && (
        <div className="fixed inset-0 z-50 bg-blue-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-900 flex items-center justify-center text-blue-950 mx-auto">
              <Award className="w-8 h-8 text-red-600" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-red-600 font-extrabold uppercase tracking-widest">
                CONGRATULATIONS!
              </span>
              <h3 className="text-xl font-extrabold text-blue-950">
                {wonReward.label}
              </h3>
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                {wonReward.description}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-blue-950 font-medium">
              Reward added to your learner profile. Keep up your daily streak!
            </div>

            <button
              onClick={() => setWonReward(null)}
              className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
