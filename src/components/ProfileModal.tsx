import React, { useState } from 'react';
import {
  Copy,
  Check,
  Shield,
  Flame,
  Award,
  LogOut,
  RotateCcw,
  X
} from 'lucide-react';
import { LearnerProfile, LearningLevel, TargetGoal } from '../types';
import { saveProfile } from '../services/storage';

interface ProfileModalProps {
  learner: LearnerProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (updated: LearnerProfile) => void;
  onSwitchAccount: () => void;
  onLogOffAndReset?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  learner,
  isOpen,
  onClose,
  onUpdateProfile,
  onSwitchAccount,
  onLogOffAndReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(learner.name);
  const [level, setLevel] = useState<LearningLevel>(learner.level);
  const [target, setTarget] = useState<TargetGoal>(learner.target);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(learner.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LearnerProfile = {
      ...learner,
      name: name.trim() || learner.name,
      level,
      target,
    };
    saveProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center text-white font-bold font-mono shadow-xs">
              {learner.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-blue-950">Learner Profile</h3>
              <p className="text-xs text-blue-900 font-medium">Anonymous Zero-Friction Account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-blue-900 hover:text-red-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Access Code Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-blue-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-900 font-mono uppercase text-[10px] font-bold">
              Secret Access Code (Cross-Device Recovery)
            </span>
            <button
              onClick={copyCode}
              className="text-xs font-mono text-blue-900 hover:text-red-600 flex items-center gap-1 font-bold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-red-600" /> : <Copy className="w-3.5 h-3.5 text-blue-800" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-base font-mono font-extrabold text-blue-950 tracking-wider">
            {learner.accessCode}
          </div>
          <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
            Save this code to resume your streak and PRI intelligence score from any browser without an email or password.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Flame className="w-4 h-4 text-red-600 mx-auto mb-1 fill-red-600" />
            <span className="text-[10px] text-blue-800 uppercase block font-bold">Active Streak</span>
            <span className="text-sm font-extrabold text-red-600">{learner.streakCount} Days</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Shield className="w-4 h-4 text-blue-900 mx-auto mb-1" />
            <span className="text-[10px] text-blue-800 uppercase block font-bold">Streak Tokens</span>
            <span className="text-sm font-extrabold text-blue-950">{learner.streakProtectionTokens}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Award className="w-4 h-4 text-blue-900 mx-auto mb-1" />
            <span className="text-[10px] text-blue-800 uppercase block font-bold">Bonus Points</span>
            <span className="text-sm font-extrabold text-blue-950">{learner.bonusPoints || 100}</span>
          </div>
        </div>

        {/* Editable Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-blue-950 font-bold mb-1">Learner Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-medium focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-blue-950 font-bold mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-semibold"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-950 font-bold mb-1">Target Track</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-semibold"
              >
                <option value="Campus Placement">Campus Placement</option>
                <option value="Product-Based Companies">Product Companies</option>
                <option value="Service-Based Companies">Service Companies</option>
                <option value="General Readiness">General Readiness</option>
              </select>
            </div>
          </div>

          {savedSuccess && (
            <p className="text-xs text-blue-900 font-mono text-center font-bold">
              ✓ Profile settings saved successfully!
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onSwitchAccount}
                className="text-xs text-blue-900 hover:text-blue-950 flex items-center gap-1 font-mono font-bold cursor-pointer"
                title="Switch account without clearing stored data"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Profile</span>
              </button>

              {onLogOffAndReset && (
                <button
                  type="button"
                  onClick={onLogOffAndReset}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-mono font-bold cursor-pointer"
                  title="Wipe current profile, attempts, streak, and reset session"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Log Off & Reset</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase cursor-pointer shadow-xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
