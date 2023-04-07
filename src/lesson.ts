import { type StatefulCard, type BareCard } from "./card";
import { shuffle } from "./utils";

/**
 * A single lesson. Typically the current lesson.
 */
export type Lesson = {
  /**
   * The card currently being tested
   */
  quizCard: StatefulCard;
  /**
   * There are three wrong answers
   */
  wrongAnswers: [
    BareCard["answer"],
    BareCard["answer"],
    BareCard["answer"]
  ];
};

export const getLesson = (cards: StatefulCard[]): Lesson => {
  // TODO some kind of shuffled weighted thing?
  const [quizCard, wrong1, wrong2, wrong3] = shuffle(cards);
  return {
    quizCard,
    wrongAnswers: [wrong1.answer, wrong2.answer, wrong3.answer],
  };
};

/**
 * Finish a lesson (correctly or incorrectly) and return the next lesson.
 */
export const completeLesson = (
  cards: StatefulCard[],
  quizCard: StatefulCard,
  submittedAnswer: BareCard["answer"]
): {
  updatedCards: StatefulCard[];
  nextLesson: Lesson;
  feedbackMessage: string;
} => {
  const isCorrectAnswer = submittedAnswer === quizCard.answer;

  const updatedQuizCard: StatefulCard = {
    ...quizCard,
    streak: isCorrectAnswer ? quizCard.streak + 1 : 0,
  };

  const updatedCards = cards.map((card) =>
    card.question === quizCard.question ? updatedQuizCard : card
  );

  // Avoid showing the same quiz card twice in a row
  const nextLesson = getLesson(
    updatedCards.filter((card) => card.question !== quizCard.question)
  );

  return {
    updatedCards,
    nextLesson,
    feedbackMessage: isCorrectAnswer ? "Yes!" : "No.",
  };
};

/**
 * A single card is "learnt" when the streak is 7 or greater.
 *
 * This function returns the progress to learnt averaged across all cards.
 */
export const getLearningProgress = (cards: StatefulCard[]): number =>
  cards
    // We treat a streak of 7 or more as 100% learnt
    .map(({ streak }) => Math.min(streak, 7) / 7)
    .reduce((acc, curr) => acc + curr) / cards.length;
