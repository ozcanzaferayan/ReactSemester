import { useTranslation } from 'react-i18next';
import { Question } from '@/data/questions';

export function useTranslatedQuestions(): Question[] {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      type: 'choice',
      question: t('questions.q1'),
      options: [
        { label: t('questions.q1_opt1'), value: 'less_6_months' },
        { label: t('questions.q1_opt2'), value: '6_months_1_year' },
        { label: t('questions.q1_opt3'), value: '1_3_years' },
        { label: t('questions.q1_opt4'), value: 'more_3_years' },
      ],
    },
    {
      id: 2,
      type: 'slider',
      question: t('questions.q2'),
      sliderConfig: {
        min: 1,
        max: 10,
        step: 1,
        minLabel: t('questions.q2_min'),
        maxLabel: t('questions.q2_max'),
      },
    },
    {
      id: 3,
      type: 'choice',
      question: t('questions.q3'),
      options: [
        { label: t('questions.q3_opt1'), value: 'talk_calmly' },
        { label: t('questions.q3_opt2'), value: 'time_apart' },
        { label: t('questions.q3_opt3'), value: 'compromise' },
        { label: t('questions.q3_opt4'), value: 'avoid' },
      ],
    },
    {
      id: 4,
      type: 'slider',
      question: t('questions.q4'),
      sliderConfig: {
        min: 1,
        max: 10,
        step: 1,
        minLabel: t('questions.q4_min'),
        maxLabel: t('questions.q4_max'),
      },
    },
    {
      id: 5,
      type: 'text',
      question: t('questions.q5'),
      placeholder: t('questions.q5_placeholder'),
    },
    {
      id: 6,
      type: 'choice',
      question: t('questions.q6'),
      options: [
        { label: t('questions.q6_opt1'), value: 'weekly' },
        { label: t('questions.q6_opt2'), value: 'monthly' },
        { label: t('questions.q6_opt3'), value: 'once_month' },
        { label: t('questions.q6_opt4'), value: 'rarely' },
      ],
    },
    {
      id: 7,
      type: 'slider',
      question: t('questions.q7'),
      sliderConfig: {
        min: 1,
        max: 10,
        step: 1,
        minLabel: t('questions.q7_min'),
        maxLabel: t('questions.q7_max'),
      },
    },
    {
      id: 8,
      type: 'choice',
      question: t('questions.q8'),
      options: [
        { label: t('questions.q8_opt1'), value: 'words' },
        { label: t('questions.q8_opt2'), value: 'time' },
        { label: t('questions.q8_opt3'), value: 'touch' },
        { label: t('questions.q8_opt4'), value: 'service' },
      ],
    },
    {
      id: 9,
      type: 'slider',
      question: t('questions.q9'),
      sliderConfig: {
        min: 1,
        max: 10,
        step: 1,
        minLabel: t('questions.q9_min'),
        maxLabel: t('questions.q9_max'),
      },
    },
    {
      id: 10,
      type: 'text',
      question: t('questions.q10'),
      placeholder: t('questions.q10_placeholder'),
    },
  ];
}
