import { QuestionAttempt, PRISnapshot, LearnerProfile } from '../types';
import { DAILY_100_QUESTIONS } from '../data/questionBank';

const QUESTION_MAP = new Map(DAILY_100_QUESTIONS.map(q => [q.id, q]));

export function calculatePRI(
  attempts: QuestionAttempt[],
  learner: LearnerProfile
): PRISnapshot {
  const totalAttemptsCount = attempts.length;
  const isProvisional = totalAttemptsCount < 20;

  if (totalAttemptsCount === 0) {
    return {
      overallScore: 0,
      isProvisional: true,
      interpretation: 'Foundation building',
      trend: 'stable',
      components: {
        aptitude: 0,
        dsa: 0,
        logicTracing: 0,
        accuracy: 0,
        speed: 0,
        consistency: 0,
      },
      totalAttemptsCount: 0,
      recommendedActions: [
        'Attempt your first set of 20 questions in Diagnostic Mode to establish your baseline index.',
        'Explore 5 solved examples in Quantitative Aptitude to build fundamental speed shortcuts.',
        'Review the Binary Search interactive visualizer in the Logic Visualization Studio.'
      ],
      calculatedAt: new Date().toISOString(),
    };
  }

  // 1. Domain Grouping
  let aptCorrect = 0, aptTotal = 0;
  let dsaCorrect = 0, dsaTotal = 0;
  let logicCorrect = 0, logicTotal = 0;
  let overallCorrect = 0;
  let totalSpeedEfficiency = 0;

  attempts.forEach(att => {
    const q = QUESTION_MAP.get(att.questionId);
    if (att.isCorrect) overallCorrect++;

    // Speed calculation: compare timeSpentSeconds with estimatedSeconds
    const targetSeconds = q ? q.estimatedSeconds : 45;
    // Speed score: 100 if timeSpent <= target, scaled down if slower, capped between 20 and 100
    const ratio = targetSeconds / Math.max(att.timeSpentSeconds, 10);
    const speedScore = Math.min(100, Math.max(25, Math.round(ratio * 75)));
    totalSpeedEfficiency += speedScore;

    if (!q) return;

    if (
      q.domain === 'Quantitative Aptitude' ||
      q.domain === 'Logical Reasoning' ||
      q.domain === 'Verbal & Analytical'
    ) {
      aptTotal++;
      if (att.isCorrect) aptCorrect++;
    } else if (
      q.domain === 'Data Structures' ||
      q.domain === 'Algorithms & Complexity'
    ) {
      dsaTotal++;
      if (att.isCorrect) dsaCorrect++;
    } else {
      // Code Tracing & Logic, Industry Scenarios
      logicTotal++;
      if (att.isCorrect) logicCorrect++;
    }
  });

  // Component Scores (0 to 100)
  const aptitudeScore = aptTotal > 0 ? Math.round((aptCorrect / aptTotal) * 100) : 50;
  const dsaScore = dsaTotal > 0 ? Math.round((dsaCorrect / dsaTotal) * 100) : 50;
  const logicScore = logicTotal > 0 ? Math.round((logicCorrect / logicTotal) * 100) : 50;
  const accuracyScore = Math.round((overallCorrect / totalAttemptsCount) * 100);
  const avgSpeedScore = Math.round(totalSpeedEfficiency / totalAttemptsCount);

  // Consistency: demonstrated activity across days + completion consistency (independent of wheel/badges)
  // Max 100 based on streak progression up to 10 days + questions attempted
  const streakFactor = Math.min(50, (learner.streakCount || 1) * 10);
  const volumeFactor = Math.min(50, Math.round((totalAttemptsCount / 50) * 50));
  const consistencyScore = Math.min(100, streakFactor + volumeFactor);

  // Formula: PRI = 0.25*Apt + 0.30*DSA + 0.15*Logic + 0.10*Accuracy + 0.10*Speed + 0.10*Consistency
  const weightedSum =
    0.25 * aptitudeScore +
    0.30 * dsaScore +
    0.15 * logicScore +
    0.10 * accuracyScore +
    0.10 * avgSpeedScore +
    0.10 * consistencyScore;

  const rawOverall = Math.round(weightedSum);
  const overallScore = Math.max(5, Math.min(100, rawOverall));

  // Determine interpretation band
  let interpretation: PRISnapshot['interpretation'] = 'Foundation building';
  if (overallScore >= 90) interpretation = 'High demonstrated readiness';
  else if (overallScore >= 75) interpretation = 'Strong demonstrated readiness';
  else if (overallScore >= 60) interpretation = 'Progressing toward placement readiness';
  else if (overallScore >= 40) interpretation = 'Developing readiness';
  else interpretation = 'Foundation building';

  // Recommendations based on lowest component
  const recommendations: string[] = [];
  if (dsaScore < 60) {
    recommendations.push('Strengthen core DSA concepts: Solve 10 daily Data Structures MCQs and review tree/graph traversals.');
  }
  if (aptitudeScore < 60) {
    recommendations.push('Boost quantitative speed: Practice Time & Work, Speed-Distance, and Allegations in Practice mode.');
  }
  if (logicScore < 60) {
    recommendations.push('Practice Code Tracing in the Logic Visualization Lab to eliminate off-by-one and pointer bugs.');
  }
  if (avgSpeedScore < 60) {
    recommendations.push('Improve solving tempo: Aim for under 45 seconds per question using the LCM & multiplier shortcuts.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain high placement readiness: Target 100% completion on today’s Challenge mode assessment.');
    recommendations.push('Explore Industry Application scenarios on distributed locks and system resilience.');
  }

  return {
    overallScore,
    isProvisional,
    interpretation,
    trend: accuracyScore >= 70 ? 'improving' : accuracyScore >= 50 ? 'stable' : 'declining',
    components: {
      aptitude: aptitudeScore,
      dsa: dsaScore,
      logicTracing: logicScore,
      accuracy: accuracyScore,
      speed: avgSpeedScore,
      consistency: consistencyScore,
    },
    totalAttemptsCount,
    recommendedActions: recommendations,
    calculatedAt: new Date().toISOString(),
  };
}
