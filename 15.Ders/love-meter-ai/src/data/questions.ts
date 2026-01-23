export type QuestionType = 'choice' | 'slider' | 'text';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: QuestionOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    minLabel: string;
    maxLabel: string;
  };
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: 'How long have you been together?',
    options: [
      { label: 'Less than 6 months', value: 'less_6_months' },
      { label: '6 months - 1 year', value: '6_months_1_year' },
      { label: '1-3 years', value: '1_3_years' },
      { label: 'More than 3 years', value: 'more_3_years' },
    ],
  },
  {
    id: 2,
    type: 'slider',
    question: 'How often do you communicate during the day?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'Rarely',
      maxLabel: 'Constantly',
    },
  },
  {
    id: 3,
    type: 'choice',
    question: 'How do you usually resolve conflicts?',
    options: [
      { label: 'Talk it out calmly', value: 'talk_calmly' },
      { label: 'Take some time apart first', value: 'time_apart' },
      { label: 'Compromise quickly', value: 'compromise' },
      { label: 'Avoid confrontation', value: 'avoid' },
    ],
  },
  {
    id: 4,
    type: 'slider',
    question: 'How much do you trust your partner?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'Need work',
      maxLabel: 'Completely',
    },
  },
  {
    id: 5,
    type: 'text',
    question: 'What do you love most about your partner?',
    placeholder: 'Write something sweet...',
  },
  {
    id: 6,
    type: 'choice',
    question: 'How often do you go on dates?',
    options: [
      { label: 'Every week', value: 'weekly' },
      { label: 'A few times a month', value: 'monthly' },
      { label: 'Once a month', value: 'once_month' },
      { label: 'Rarely', value: 'rarely' },
    ],
  },
  {
    id: 7,
    type: 'slider',
    question: 'How well do you understand each other\'s needs?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'Learning',
      maxLabel: 'Perfectly',
    },
  },
  {
    id: 8,
    type: 'choice',
    question: 'What\'s your love language?',
    options: [
      { label: 'Words of Affirmation', value: 'words' },
      { label: 'Quality Time', value: 'time' },
      { label: 'Physical Touch', value: 'touch' },
      { label: 'Acts of Service', value: 'service' },
    ],
  },
  {
    id: 9,
    type: 'slider',
    question: 'How happy are you in your relationship overall?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: 'Could be better',
      maxLabel: 'Very happy',
    },
  },
  {
    id: 10,
    type: 'text',
    question: 'Describe your ideal future together in a few words.',
    placeholder: 'Dream together...',
  },
];

export interface Answer {
  questionId: number;
  value: string | number;
}

export interface AIResult {
  compatibilityPercentage: number;
  analysis: string;
  advice: string;
  motivation: string;
}
