import React, { useState } from 'react';
import {
  User,
  KeyRound,
  Copy,
  Check,
  Shield,
  Flame,
  Award,
  Target,
  LogOut,
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
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  learner,
  isOpen,
  onClose,
  onUpdateProfile,
  onSwitchAccount,
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#17191D] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#2d3036] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold font-mono">
              {learner.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Learner Profile</h3>
              <p className="text-xs text-slate-400">Anonymous Zero-Friction Account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Access Code Card */}
        <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono uppercase text-[10px]">
              Secret Access Code (Cross-Device Recovery)
            </span>
            <button
              onClick={copyCode}
              className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-base font-mono font-bold text-white tracking-wider">
            {learner.accessCode}
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Save this code to resume your streak and PRI intelligence score from any browser without an email or password.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
          <div className="p-3 rounded-xl bg-[#08090B] border border-slate-800">
            <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1 fill-amber-500/20" />
            <span className="text-[10px] text-slate-500 uppercase block">Active Streak</span>
            <span className="text-sm font-bold text-amber-300">{learner.streakCount} Days</span>
          </div>

          <div className="p-3 rounded-xl bg-[#08090B] border border-slate-800">
            <Shield className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 uppercase block">Streak Tokens</span>
            <span className="text-sm font-bold text-cyan-300">{learner.streakProtectionTokens}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#08090B] border border-slate-800">
            <Award className="w-4 h-4 text-slate-300 mx-auto mb-1" />
            <span className="text-[10px] text-slate-500 uppercase block">Bonus Points</span>
            <span className="text-sm font-bold text-white">{learner.bonusPoints || 100}</span>
          </div>
        </div>

        {/* Editable Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Learner Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#08090B] border border-slate-700 text-white focus:outline-none focus:border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#08090B] border border-slate-700 text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Track</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#08090B] border border-slate-700 text-white"
              >
                <option value="Campus Placement">Campus Placement</option>
                <option value="Product-Based Companies">Product Companies</option>
                <option value="Service-Based Companies">Service Companies</option>
                <option value="General Readiness">General Readiness</option>
              </select>
            </div>
          </div>

          {savedSuccess && (
            <p className="text-xs text-emerald-400 font-mono text-center">
              ✓ Profile settings saved successfully!
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onSwitchAccount}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Profile</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs uppercase"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
