import React from 'react';
import {
  RotateCcw,
  LogOut,
  AlertTriangle,
  X,
  ShieldAlert,
  Database
} from 'lucide-react';
import { LearnerProfile } from '../types';

interface ResetSessionModalProps {
  isOpen: boolean;
  learner: LearnerProfile | null;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetSessionModal: React.FC<ResetSessionModalProps> = ({
  isOpen,
  learner,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 text-blue-950 space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 id="reset-modal-title" className="text-base font-extrabold text-blue-950 leading-tight">
                Log Off & Reset Session
              </h3>
              <p className="text-xs font-semibold text-red-600">
                Action will clear active memory & stored state
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Summary */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Are you sure you want to end this session?</span>
          </div>
          <p className="text-xs text-blue-900/80 leading-relaxed">
            Logging off and resetting will restore the platform to its clean initial state.
          </p>

          <ul className="text-xs text-blue-900 space-y-1.5 pt-1 border-t border-slate-200 font-medium">
            {learner && (
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                <span>
                  Log out <strong className="text-blue-950 font-bold">{learner.name}</strong> ({learner.accessCode})
                </span>
              </li>
            )}
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Wipe active question attempts and timed benchmarks</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Reset Daily Streak wheel counters & session storage</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Return directly to new candidate onboarding</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 text-blue-900 hover:text-blue-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Cancel / Keep Session
          </button>

          <button
            type="button"
            onClick={onConfirmReset}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Log Off & Reset Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
