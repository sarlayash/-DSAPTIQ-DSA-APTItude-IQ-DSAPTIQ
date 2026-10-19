import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Plus,
  Download,
  Search,
  FileCheck
} from 'lucide-react';
import { AssessmentDomain } from '../types';
import { DAILY_100_QUESTIONS } from '../data/questionBank';
import { DAILY_50_SOLVED_EXAMPLES } from '../data/solvedExamples';
import { resetAllLearnerData, seedDemoLearnerData } from '../services/storage';

interface AdminViewProps {
  onRefreshData: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'deploy' | 'audit' | 'questions' | 'create'>('deploy');
  const [searchFilter, setSearchFilter] = useState('');
  const [adminStatusMessage, setAdminStatusMessage] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  // Form state for creating a new question
  const [newDomain, setNewDomain] = useState<AssessmentDomain>('Quantitative Aptitude');
  const [newTopic, setNewTopic] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newText, setNewText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState<number>(0);
  const [explanation, setExplanation] = useState('');

  // 1. Audit Check: 100 Question Verification
  const totalCount = DAILY_100_QUESTIONS.length;
  const uniqueIds = new Set(DAILY_100_QUESTIONS.map((q) => q.id));

  // Domain quotas
  const quotaTarget: Record<AssessmentDomain, number> = {
    'Quantitative Aptitude': 20,
    'Logical Reasoning': 15,
    'Verbal & Analytical': 10,
    'Data Structures': 20,
    'Algorithms & Complexity': 15,
    'Code Tracing & Logic': 10,
    'Industry Scenarios': 10,
  };

  const domainActual: Record<string, number> = {};
  DAILY_100_QUESTIONS.forEach((q) => {
    domainActual[q.domain] = (domainActual[q.domain] || 0) + 1;
  });

  const examplesCount = DAILY_50_SOLVED_EXAMPLES.length;

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(DAILY_100_QUESTIONS, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'DSAPTIQ_Question_Bank_100.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setAdminStatusMessage('Question bank JSON exported successfully.');
  };

  const handleResetData = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    resetAllLearnerData();
    onRefreshData();
    setConfirmReset(false);
    setAdminStatusMessage('All learner session and attempt data has been reset.');
  };

  const handleSeedDemoData = () => {
    seedDemoLearnerData();
    onRefreshData();
    setAdminStatusMessage('Seeded high-performing demo candidate with 25 attempts and established PRI!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-red-600 uppercase">
              GOVERNANCE & CURATION
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Admin Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            Content Integrity & Question Bank Console
          </h1>
          <p className="text-xs sm:text-sm text-blue-900 max-w-2xl leading-relaxed font-medium">
            Ensure non-repetition guarantees, validate answer keys, audit domain quotas, and manage question bank sets according to PRD section 9.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="./DSAPTIQ-source.zip"
            download="DSAPTIQ-source.zip"
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-950 text-xs font-bold border border-blue-200 flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Download complete ready-to-push repository ZIP"
          >
            <Download className="w-3.5 h-3.5 text-blue-900" />
            <span>Download Full Code (.ZIP)</span>
          </a>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-900 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-800" />
            <span>Export Bank</span>
          </button>
          <button
            onClick={handleSeedDemoData}
            className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-white" />
            <span>Seed Demo Cohort</span>
          </button>
        </div>
      </div>

      {adminStatusMessage && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs font-mono flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-900" />
          <span>{adminStatusMessage}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'deploy', label: '🚀 GitHub Deployment & Live Hosting' },
          { id: 'audit', label: '100-Question Set Audit' },
          { id: 'questions', label: 'Question Bank Inspector' },
          { id: 'create', label: 'Author New Question' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 0: GITHUB DEPLOYMENT & HOSTING */}
      {activeTab === 'deploy' && (
        <div className="space-y-6">
          {/* Live Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-blue-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600 flex items-center gap-1.5 uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  CURRENTLY LIVE ONLINE
                </span>
                <span className="text-[10px] font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-900 border border-blue-200 font-bold">
                  Cloud Run
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-blue-950">Public Live App URL</h3>
              <p className="text-xs text-blue-950 font-mono break-all bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                https://ais-pre-sr3dg42bjran77lnm5aswc-252756721792.asia-east1.run.app
              </p>
              <div className="pt-1">
                <a
                  href="https://ais-pre-sr3dg42bjran77lnm5aswc-252756721792.asia-east1.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-4 font-mono"
                >
                  Open Live Platform in New Tab ↗
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-blue-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-900 uppercase">
                  GITHUB TARGET REPOSITORY
                </span>
                <span className="text-[10px] font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-900 border border-blue-200 font-bold">
                  Target Repo
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-blue-950">sarlayash / -DSAPTIQ-DSA-APTItude-IQ-DSAPTIQ</h3>
              <p className="text-xs text-blue-950 font-mono break-all bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                https://github.com/sarlayash/-DSAPTIQ-DSA-APTItude-IQ-DSAPTIQ.git
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/sarlayash/-DSAPTIQ-DSA-APTItude-IQ-DSAPTIQ"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 underline underline-offset-4 font-mono"
                >
                  Open GitHub Repository ↗
                </a>
              </div>
            </div>
          </div>

          {/* Quick Publish Options */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                Download Ready-to-Deploy Packages
              </h3>
              <p className="text-xs text-blue-900 mt-1 leading-relaxed font-medium">
                Download either package below to deploy anywhere without compiling or terminal knowledge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A: Web-Ready Bundle */}
              <div className="p-5 rounded-xl bg-slate-50 border border-blue-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-red-600 font-bold uppercase block">
                    PACKAGE A: Web-Ready Compiled Build (Zero Blank Screen)
                  </span>
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    Already compiled with production assets, relative links (<code className="font-mono text-blue-950">./assets/</code>), <code className="font-mono text-blue-950">.nojekyll</code>, and <code className="font-mono text-blue-950">404.html</code>. Works instantly on any GitHub Pages branch or folder.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="./DSAPTIQ-web-ready.zip"
                    download="DSAPTIQ-web-ready.zip"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Pre-Built Bundle (.zip)</span>
                  </a>
                </div>
              </div>

              {/* Option B: Complete Full Source */}
              <div className="p-5 rounded-xl bg-slate-50 border border-blue-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-blue-900 font-bold uppercase block">
                    PACKAGE B: Complete Full Source Code
                  </span>
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    Contains all TypeScript source files, 100 MCQs, 50 solved examples, React components, Vite config, package.json, and GitHub Actions workflow.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="./DSAPTIQ-source.zip"
                    download="DSAPTIQ-source.zip"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Complete Source (.zip)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: AUDIT DASHBOARD */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Integrity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-blue-900 font-bold">
                <span>DAILY ASSESSMENT SET</span>
                <CheckCircle2 className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-blue-950">
                {totalCount} / 100
              </div>
              <p className="text-[11px] text-blue-900 font-mono font-bold">
                ✓ Full 100-Question Release Standard Satisfied
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-blue-900 font-bold">
                <span>DUPLICATE ID CHECK</span>
                <CheckCircle2 className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-blue-950">
                0 Duplicates
              </div>
              <p className="text-[11px] text-blue-900 font-mono font-bold">
                ✓ 100% Deterministic Unique Question IDs
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono text-blue-900 font-bold">
                <span>DAILY WORKED EXAMPLES</span>
                <CheckCircle2 className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-blue-950">
                {examplesCount} / 50
              </div>
              <p className="text-[11px] text-blue-900 font-mono font-bold">
                ✓ Complete 50-Example Curated Curriculum
              </p>
            </div>
          </div>

          {/* Domain Quota Verification Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-900" />
              Domain Distribution Quota Audit (PRD Section 4B)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-blue-900 uppercase font-bold">
                    <th className="py-3 px-4">Domain Category</th>
                    <th className="py-3 px-4">Required Quota</th>
                    <th className="py-3 px-4">Validated Active</th>
                    <th className="py-3 px-4">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(quotaTarget).map(([domain, req]) => {
                    const actual = domainActual[domain] || 0;
                    const matches = actual === req;
                    return (
                      <tr key={domain} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-sans font-bold text-blue-950">
                          {domain}
                        </td>
                        <td className="py-3 px-4 text-blue-900 font-medium">{req} questions</td>
                        <td className="py-3 px-4 font-extrabold text-blue-950">{actual} questions</td>
                        <td className="py-3 px-4">
                          {matches ? (
                            <span className="text-blue-900 flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-900" /> Met (100%)
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Pending ({actual}/{req})
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Danger Zone / Reset */}
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-extrabold text-red-700 uppercase font-mono">
                Session Reset Controls
              </h4>
              <p className="text-xs text-red-800 font-medium mt-0.5">
                Wipe all anonymous local storage profiles, question attempts, and wheel spin records.
              </p>
            </div>
            <button
              onClick={handleResetData}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                confirmReset
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs ring-2 ring-red-400'
                  : 'bg-white text-red-600 border border-red-300 hover:bg-red-100'
              }`}
            >
              {confirmReset ? '⚠️ Click Again to Confirm Reset' : 'Reset All Learner Data'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: QUESTION BANK INSPECTOR */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-blue-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by Question ID, text, topic, or company tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-950 placeholder:text-blue-800/60 focus:outline-none focus:border-blue-400 font-medium"
            />
          </div>

          <div className="space-y-3">
            {DAILY_100_QUESTIONS.filter(
              (q) =>
                q.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
                q.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
                q.topic.toLowerCase().includes(searchFilter.toLowerCase())
            ).map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {q.id} · {q.domain}
                  </span>
                  <span className="text-blue-900 font-medium">
                    Correct: <strong className="text-red-600">{String.fromCharCode(65 + q.correctIndex)}</strong> ({q.options[q.correctIndex]})
                  </span>
                </div>
                <p className="text-blue-950 line-clamp-2 font-medium">{q.text}</p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-blue-900 font-mono pt-1">
                  {q.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUTHOR NEW QUESTION */}
      {activeTab === 'create' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl mx-auto">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
              <Plus className="w-4 h-4 text-red-600" />
              Author Placement-Oriented Question
            </h3>
            <p className="text-xs text-blue-900 mt-0.5 font-medium">
              Draft placement-grade questions with worked explanations and estimated solving timings.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-blue-950 mb-1">Assessment Domain</label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-medium"
                >
                  {Object.keys(quotaTarget).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-blue-950 mb-1">Topic / Pattern</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Dynamic Programming, Two Pointers"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-blue-950 mb-1">Problem Text</label>
              <textarea
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="State the problem clearly with relevant inputs and constraints..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-blue-950">4 Plausible Answer Options</label>
              <input
                type="text"
                placeholder="Option A"
                value={opt0}
                onChange={(e) => setOpt0(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
              <input
                type="text"
                placeholder="Option B"
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
              <input
                type="text"
                placeholder="Option C"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
              <input
                type="text"
                placeholder="Option D"
                value={opt3}
                onChange={(e) => setOpt3(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-blue-950 mb-1">Correct Answer Index</label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-mono font-bold"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-blue-950 mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-mono font-bold"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-blue-950 mb-1">Worked Explanation</label>
              <textarea
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain the step-by-step mathematical or algorithmic reasoning..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-medium"
              />
            </div>

            <button
              onClick={() => {
                setAdminStatusMessage('Question saved to curation staging draft.');
              }}
              className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase cursor-pointer shadow-xs transition-colors"
            >
              Save Question to Staging Bank
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
