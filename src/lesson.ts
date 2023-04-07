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

/**
 * Assign a weight to a card.
 *
 * Lower streak has higher weight.
 *
 * Each weight class is double/half the weight of the class above/below
 */
const toWeightedCard = (
  card: StatefulCard
): { card: StatefulCard; weight: number } => {
  // All cards with streak 7 and above, are treated the same for weight
  const clippedStreak = Math.min(card.streak, 7);

  // This assigns weight 0 to max streak cards, and one more weight to each level below that.
  // Runs from 0 to 7.
  const linearWeight = 7 - clippedStreak;

  // This assigns weight in a doubling fashion. A card with streak 1 has double the weight of a card with streak 2.
  const exponentialWeight = 2 ** linearWeight;
  return { card, weight: exponentialWeight };
};

export const getLesson = (cards: StatefulCard[]): Lesson => {
  /**
   * Imagine all the cards taking up "space" according to their weight.
   *
   * This algo picks a random point in that space, and advances a pointer,
   * until it finds the element that spans that point.
   *
   * Since "heavier" elements take up more "space", they are more likely to be picked.
   */
  const weightedCards = shuffle(cards.map(toWeightedCard));
  const totalWeight = weightedCards
    .map(({ weight }) => weight)
    .reduce((acc, curr) => acc + curr);

  let weightRemaining = Math.random() * totalWeight;
  let searchPointer = 0;
  while (weightedCards[searchPointer].weight < weightRemaining) {
    weightRemaining -= weightedCards[searchPointer].weight;
    searchPointer++;
  }
  const quizCard = weightedCards[searchPointer].card;

  // Next up, we need to find our wrong answers
  const otherCards = cards.filter(
    (card) => card.question !== quizCard.question
  );

  // Find three wrong answers
  const [wrong1, wrong2, wrong3] = otherCards
    .map((card) => ({
      card,
      // Sort cards by proximity to correct answer, with a little randomness for fun.
      rank: Math.abs(card.streak - quizCard.streak) + Math.random(),
    }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ card: { answer } }) => answer);

  return {
    quizCard,
    wrongAnswers: [wrong1, wrong2, wrong3],
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
