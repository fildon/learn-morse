import { type StatefulCard, type BareCard } from "./card";
import { pickRandom, shuffle, sortBy } from "./utils";

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

const getTargetForLesson = () => {
  let targetStreak: number | null = null;
  while (targetStreak === null) {
    /**
     * Think of this like a sieve. We descend down the layers of the sieve,
     * with a 50% chance of stopping at each layer. This has the overall
     * effect of making each target a half as likely as its predecessor.
     */
    targetStreak =
      Math.random() < 0.5
        ? 0
        : Math.random() < 0.5
        ? 1
        : Math.random() < 0.5
        ? 2
        : Math.random() < 0.5
        ? 3
        : Math.random() < 0.5
        ? 4
        : Math.random() < 0.5
        ? 5
        : Math.random() < 0.5
        ? 6
        : Math.random() < 0.5
        ? 7
        : null;
  }
  return targetStreak;
};

const getNextQuizCard = (cards: StatefulCard[]): StatefulCard => {
  let quizCard: StatefulCard | undefined;
  while (quizCard === undefined) {
    const targetStreak = getTargetForLesson();
    // Try to pick a random card with the target streak
    quizCard = pickRandom(
      cards.filter((card) =>
        // Cards with streak greater than 7 are treated as being at target 7
        card.streak > 7
          ? targetStreak === 7
          : card.streak === targetStreak
      )
      // It could be that the target is empty, in which case we'll get undefined here
      // and that's ok, it'll just run the loop again with a new random target
    );
  }
  return quizCard;
};

const getWrongAnswers = (
  cards: StatefulCard[],
  quizCard: StatefulCard
): Lesson["wrongAnswers"] => {
  const [wrong1, wrong2, wrong3] = sortBy(
    cards.filter((card) => card.question !== quizCard.question),
    // Sort cards by proximity to correct answer, with a little randomness for fun.
    (card) => Math.abs(card.streak - quizCard.streak) + Math.random()
  ).map(({ answer }) => answer);
  return [wrong1, wrong2, wrong3];
};

export const getLesson = (cards: StatefulCard[]): Lesson => {
  const quizCard = getNextQuizCard(cards);

  return {
    quizCard,
    wrongAnswers: getWrongAnswers(cards, quizCard),
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
  const isCorrectAnswer =
    submittedAnswer.toLocaleLowerCase() ===
    quizCard.answer.toLocaleLowerCase();

  const updatedCards = cards.map((card: StatefulCard) => {
    // Update the quiz card
    if (card.question === quizCard.question) {
      return {
        ...quizCard,
        streak: isCorrectAnswer ? quizCard.streak + 1 : 0,
      };
    }

    // If the submitted answer was wrong, we also reset the streak on the card matching the submitted answer.
    if (!isCorrectAnswer && card.answer === submittedAnswer) {
      return { ...card, streak: 0 };
    }

    // Otherwise, no need to update this card
    return card;
  });

  const nextLesson = getLesson(
    // Avoid showing the same quiz card twice in a row
    updatedCards.filter((card) => card.question !== quizCard.question)
  );

  return {
    updatedCards,
    nextLesson,
    feedbackMessage: isCorrectAnswer
      ? "Yes!"
      : `No. Not: "${submittedAnswer.toLocaleUpperCase()}"`,
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
