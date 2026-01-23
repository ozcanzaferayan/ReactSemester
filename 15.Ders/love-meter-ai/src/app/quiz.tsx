import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Answer, Question } from '@/data/questions';
import { useTranslatedQuestions } from '@/hooks/use-translated-questions';

export default function QuizScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const questions = useTranslatedQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const saveAnswer = () => {
    if (currentAnswer === '' && currentQuestion.type !== 'slider') return false;

    const answer: Answer = {
      questionId: currentQuestion.id,
      value: currentQuestion.type === 'slider' && currentAnswer === '' ? 5 : currentAnswer,
    };

    setAnswers((prev) => [...prev.filter((a) => a.questionId !== currentQuestion.id), answer]);
    return true;
  };

  const handleNext = () => {
    if (!saveAnswer()) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer('');
    } else {
      const finalAnswers = [
        ...answers.filter((a) => a.questionId !== currentQuestion.id),
        {
          questionId: currentQuestion.id,
          value: currentQuestion.type === 'slider' && currentAnswer === '' ? 5 : currentAnswer,
        },
      ];
      router.push({
        pathname: '/loading',
        params: { answers: JSON.stringify(finalAnswers) },
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevAnswer = answers.find((a) => a.questionId === questions[currentIndex - 1].id);
      setCurrentAnswer(prevAnswer?.value ?? '');
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'choice':
        return (
          <View style={styles.optionsContainer}>
            {question.options?.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.optionButton,
                  { backgroundColor: theme.card, borderColor: theme.backgroundElement },
                  currentAnswer === option.value && {
                    backgroundColor: theme.primaryLight,
                    borderColor: theme.primary,
                  },
                ]}
                onPress={() => setCurrentAnswer(option.value)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    { color: theme.text },
                    currentAnswer === option.value && { color: theme.primaryDark },
                  ]}
                >
                  {option.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        );

      case 'slider':
        return (
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabels}>
              <ThemedText style={[styles.sliderLabel, { color: theme.textSecondary }]}>
                {question.sliderConfig?.minLabel}
              </ThemedText>
              <ThemedText style={[styles.sliderValue, { color: theme.primary }]}>
                {currentAnswer || 5}
              </ThemedText>
              <ThemedText style={[styles.sliderLabel, { color: theme.textSecondary }]}>
                {question.sliderConfig?.maxLabel}
              </ThemedText>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={question.sliderConfig?.min ?? 1}
              maximumValue={question.sliderConfig?.max ?? 10}
              step={question.sliderConfig?.step ?? 1}
              value={typeof currentAnswer === 'number' ? currentAnswer : 5}
              onValueChange={(value) => setCurrentAnswer(value)}
              minimumTrackTintColor={theme.primary}
              maximumTrackTintColor={theme.backgroundElement}
              thumbTintColor={theme.primary}
            />
          </View>
        );

      case 'text':
        return (
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.card,
                borderColor: theme.backgroundElement,
                color: theme.text,
              },
            ]}
            placeholder={question.placeholder}
            placeholderTextColor={theme.textSecondary}
            value={typeof currentAnswer === 'string' ? currentAnswer : ''}
            onChangeText={setCurrentAnswer}
            multiline
            numberOfLines={4}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText style={[styles.progress, { color: theme.textSecondary }]}>
            {t('quiz.question')} {currentIndex + 1}/{questions.length}
          </ThemedText>
          <View style={[styles.progressBar, { backgroundColor: theme.backgroundElement }]}>
            <Animated.View
              layout={LinearTransition}
              style={[
                styles.progressFill,
                { backgroundColor: theme.primary, width: `${progress}%` },
              ]}
            />
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            key={currentQuestion.id}
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(300)}
            style={styles.questionContainer}
          >
            <ThemedText style={[styles.emoji]}>
              {currentQuestion.type === 'choice' ? '💭' : currentQuestion.type === 'slider' ? '💫' : '💌'}
            </ThemedText>
            <ThemedText style={[styles.question, { color: theme.text }]}>
              {currentQuestion.question}
            </ThemedText>
            {renderQuestion(currentQuestion)}
          </Animated.View>
        </ScrollView>

        <View style={styles.buttons}>
          {currentIndex > 0 && (
            <Pressable
              style={[styles.backButton, { borderColor: theme.primary }]}
              onPress={handleBack}
            >
              <ThemedText style={[styles.backButtonText, { color: theme.primary }]}>
                {t('common.back')}
              </ThemedText>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.nextButton,
              { backgroundColor: theme.primary },
              currentIndex === 0 && styles.fullWidthButton,
            ]}
            onPress={handleNext}
          >
            <ThemedText style={styles.nextButtonText}>
              {currentIndex === questions.length - 1 ? `${t('quiz.seeResults')} 💕` : t('common.next')}
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    paddingTop: Spacing.three,
    gap: Spacing.two,
  },
  progress: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Spacing.five,
  },
  questionContainer: {
    alignItems: 'center',
    gap: Spacing.four,
  },
  emoji: {
    fontSize: 50,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  optionButton: {
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  sliderContainer: {
    width: '100%',
    marginTop: Spacing.three,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  sliderLabel: {
    fontSize: 14,
  },
  sliderValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  textInput: {
    width: '100%',
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 2,
    padding: Spacing.three,
    fontSize: 16,
    textAlignVertical: 'top',
    marginTop: Spacing.three,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  backButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 30,
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
