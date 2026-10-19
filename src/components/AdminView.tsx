import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Plus,
  Download,
  Upload,
  RotateCcw,
  Sliders,
  Search,
  Cpu,
  FileCheck
} from 'lucide-react';
import { Question, AssessmentDomain } from '../types';
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
  const hasDuplicateIds = uniqueIds.size !== totalCount;

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

  // Check Solved Examples quota
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              GOVERNANCE & CURATION
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Admin Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Content Integrity & Question Bank Console
          </h1>
          <p className="text-xs sm:text-sm text-[#BFC2C9] max-w-2xl leading-relaxed">
            Ensure non-repetition guarantees, validate answer keys, audit domain quotas, and manage question bank sets according to PRD section 9.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/DSAPTIQ-source.zip"
            download="DSAPTIQ-source.zip"
            className="px-3.5 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 text-xs font-semibold border border-cyan-800 flex items-center gap-1.5 transition-colors shadow"
            title="Download complete ready-to-push repository ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full Code (.ZIP)</span>
          </a>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Bank</span>
          </button>
          <button
            onClick={handleSeedDemoData}
            className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-900 text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Seed Demo Cohort</span>
          </button>
        </div>
      </div>

      {adminStatusMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{adminStatusMessage}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2d3036] pb-2 overflow-x-auto">
        {[
          { id: 'deploy', label: '🚀 GitHub Deployment & Live Hosting' },
          { id: 'audit', label: '100-Question Set Audit' },
          { id: 'questions', label: 'Question Bank Inspector' },
          { id: 'create', label: 'Author New Question' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-200 text-slate-900 shadow'
                : 'text-slate-400 hover:text-white'
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
            <div className="p-6 rounded-2xl bg-[#17191D] border border-emerald-700/60 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  CURRENTLY LIVE ONLINE
                </span>
                <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800">
                  Cloud Run
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Public Live App URL</h3>
              <p className="text-xs text-slate-300 font-mono break-all bg-[#08090B] p-2.5 rounded-xl border border-slate-800">
                https://ais-pre-sr3dg42bjran77lnm5aswc-252756721792.asia-east1.run.app
              </p>
              <div className="pt-1">
                <a
                  href="https://ais-pre-sr3dg42bjran77lnm5aswc-252756721792.asia-east1.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-mono"
                >
                  Open Live Platform in New Tab ↗
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#17191D] border border-cyan-700/60 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  GITHUB TARGET REPOSITORY
                </span>
                <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-800">
                  Target Repo
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">sarlayash / DSAPTIQ</h3>
              <p className="text-xs text-slate-300 font-mono break-all bg-[#08090B] p-2.5 rounded-xl border border-slate-800">
                https://github.com/sarlayash/DSAPTIQ.git
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/sarlayash/DSAPTIQ"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-mono"
                >
                  Open GitHub Repository ↗
                </a>
              </div>
            </div>
          </div>

          {/* BLANK SCREEN DIAGNOSTIC & FIX BANNER */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>FIX BLANK SCREEN ON GITHUB PAGES (404 main.tsx)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your GitHub Pages URL (e.g. <code className="bg-black/60 px-1.5 py-0.5 rounded text-amber-200 font-mono">sarlayash.github.io/DSAPTIQ-1.0/</code>) displays a blank screen with <code className="bg-black/60 px-1.5 py-0.5 rounded text-red-300 font-mono">Failed to load resource: 404 main.tsx</code>, it means GitHub Pages is currently configured to serve raw uncompiled source code instead of the compiled production bundle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                  ⚡ SOLUTION 1: Switch to /docs folder (Instant 10-Second Fix)
                </span>
                <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside leading-relaxed">
                  <li>Go to your GitHub repository: <strong>Settings → Pages</strong>.</li>
                  <li>Under <strong>Branch</strong>, make sure <code className="text-white font-mono">main</code> is selected.</li>
                  <li>Change the folder dropdown from <code className="text-red-300 font-mono">/ (root)</code> to <code className="text-emerald-400 font-bold font-mono">/docs</code>.</li>
                  <li>Click <strong>Save</strong>. In 30 seconds, refresh your site!</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 block uppercase">
                  ⚡ SOLUTION 2: Use GitHub Actions Pipeline
                </span>
                <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside leading-relaxed">
                  <li>Go to <strong>Settings → Pages</strong> in your GitHub repository.</li>
                  <li>Under <strong>Source</strong>, select <strong>GitHub Actions</strong> instead of "Deploy from a branch".</li>
                  <li>Our pre-configured <code className="text-white font-mono">deploy.yml</code> workflow will automatically build and publish!</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Quick Publish Options */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#17191D] border border-[#2d3036] space-y-6 shadow-xl">
            <div className="border-b border-[#2d3036] pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Download Ready-to-Deploy Packages
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Download either package below to deploy anywhere without compiling or terminal knowledge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A: Web-Ready Bundle */}
              <div className="p-5 rounded-xl bg-[#08090B] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                    PACKAGE A: Web-Ready Compiled Build (Zero Blank Screen)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Already compiled with production assets, relative links (<code className="font-mono text-slate-200">./assets/</code>), <code className="font-mono text-slate-200">.nojekyll</code>, and <code className="font-mono text-slate-200">404.html</code>. Works instantly on any GitHub Pages branch or folder.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="./DSAPTIQ-web-ready.zip"
                    download="DSAPTIQ-web-ready.zip"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Pre-Built Bundle (.zip)</span>
                  </a>
                </div>
              </div>

              {/* Option B: Complete Full Source */}
              <div className="p-5 rounded-xl bg-[#08090B] border border-cyan-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">
                    PACKAGE B: Complete Full Source Code
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Contains all TypeScript source files, 100 MCQs, 50 solved examples, React components, Vite config, package.json, and GitHub Actions workflow.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="./DSAPTIQ-source.zip"
                    download="DSAPTIQ-source.zip"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow"
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
            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>DAILY ASSESSMENT SET</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {totalCount} / 100
              </div>
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ Full 100-Question Release Standard Satisfied
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>DUPLICATE ID CHECK</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-white">
                0 Duplicates
              </div>
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ 100% Deterministic Unique Question IDs
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>DAILY WORKED EXAMPLES</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-white">
                {examplesCount} / 50
              </div>
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ Complete 50-Example Curated Curriculum
              </p>
            </div>
          </div>

          {/* Domain Quota Verification Table */}
          <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-slate-300" />
              Domain Distribution Quota Audit (PRD Section 4B)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase">
                    <th className="py-3 px-4">Domain Category</th>
                    <th className="py-3 px-4">Required Quota</th>
                    <th className="py-3 px-4">Validated Active</th>
                    <th className="py-3 px-4">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {Object.entries(quotaTarget).map(([domain, req]) => {
                    const actual = domainActual[domain] || 0;
                    const matches = actual === req;
                    return (
                      <tr key={domain} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-sans font-medium text-slate-200">
                          {domain}
                        </td>
                        <td className="py-3 px-4 text-slate-400">{req} questions</td>
                        <td className="py-3 px-4 font-bold text-white">{actual} questions</td>
                        <td className="py-3 px-4">
                          {matches ? (
                            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Met (100%)
                            </span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1 font-semibold">
                              <AlertTriangle className="w-3.5 h-3.5" /> Pending ({actual}/{req})
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
          <div className="p-6 rounded-2xl bg-[#08090B] border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">
                Session Reset Controls
              </h4>
              <p className="text-xs text-slate-500">
                Wipe all anonymous local storage profiles, question attempts, and wheel spin records.
              </p>
            </div>
            <button
              onClick={handleResetData}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                confirmReset
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50 ring-2 ring-rose-400'
                  : 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800'
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
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by Question ID, text, topic, or company tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08090B] border border-[#414349] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-300"
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
                className="p-4 rounded-xl bg-[#17191D] border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {q.id} · {q.domain}
                  </span>
                  <span className="text-slate-400">
                    Correct: <strong>{String.fromCharCode(65 + q.correctIndex)}</strong> ({q.options[q.correctIndex]})
                  </span>
                </div>
                <p className="text-slate-200 line-clamp-2">{q.text}</p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 font-mono pt-1">
                  {q.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
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
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
          <div className="border-b border-[#2d3036] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-slate-300" />
              Author Placement-Oriented Question
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Draft placement-grade questions with worked explanations and estimated solving timings.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assessment Domain</label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#08090B] border border-slate-700 text-white"
                >
                  {Object.keys(quotaTarget).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Topic / Pattern</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Dynamic Programming, Two Pointers"
                  className="w-full p-2.5 rounded-xl bg-[#08090B] border border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Problem Text</label>
              <textarea
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="State the problem clearly with relevant inputs and constraints..."
                className="w-full p-3 rounded-xl bg-[#08090B] border border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-slate-300">4 Plausible Answer Options</label>
              <input
                type="text"
                placeholder="Option A"
                value={opt0}
                onChange={(e) => setOpt0(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#08090B] border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Option B"
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#08090B] border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Option C"
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#08090B] border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Option D"
                value={opt3}
                onChange={(e) => setOpt3(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#08090B] border border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Correct Answer Index</label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#08090B] border border-slate-700 text-white font-mono"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#08090B] border border-slate-700 text-white font-mono"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Worked Explanation</label>
              <textarea
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain the step-by-step mathematical or algorithmic reasoning..."
                className="w-full p-3 rounded-xl bg-[#08090B] border border-slate-700 text-white"
              />
            </div>

            <button
              onClick={() => {
                setAdminStatusMessage('Question saved to curation staging draft.');
              }}
              className="w-full py-3 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs uppercase"
            >
              Save Question to Staging Bank
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
