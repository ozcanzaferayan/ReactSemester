import { Answer, AIResult } from '@/data/questions';
import i18n from '@/i18n';

function calculateCompatibility(answers: Answer[]): number {
  let score = 60; // Base score

  answers.forEach((answer) => {
    if (typeof answer.value === 'number') {
      // Slider answers: higher values contribute more
      score += answer.value * 1.5;
    } else if (typeof answer.value === 'string') {
      // Choice answers: add points based on positive indicators
      if (answer.value.includes('talk') || answer.value.includes('weekly') || answer.value.includes('years')) {
        score += 5;
      } else {
        score += 2;
      }
      // Text answers: longer answers show more engagement
      if (answer.value.length > 20) {
        score += 5;
      }
    }
  });

  // Normalize to 0-100 range
  return Math.min(100, Math.max(0, Math.round(score)));
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export async function analyzeRelationship(answers: Answer[], language?: string): Promise<AIResult> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const compatibilityPercentage = calculateCompatibility(answers);

  // Use provided language or fallback to current i18n language
  const lang = language || i18n.language;

  // Get localized texts
  const analysisTexts = i18n.t('aiResults.analysis', { lng: lang, returnObjects: true }) as string[];
  const adviceTexts = i18n.t('aiResults.advice', { lng: lang, returnObjects: true }) as string[];
  const motivationTexts = i18n.t('aiResults.motivation', { lng: lang, returnObjects: true }) as string[];

  return {
    compatibilityPercentage,
    analysis: getRandomElement(analysisTexts),
    advice: getRandomElement(adviceTexts),
    motivation: getRandomElement(motivationTexts),
  };
}
