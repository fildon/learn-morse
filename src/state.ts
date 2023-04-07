import { type StatefulCard, allCards, BareCard } from "./card";
import { shuffle } from "./utils";

/**
 * The current state of the lesson
 */
export type State = {
  /**
   * The card currently being tested
   */
  currentCard: StatefulCard;
  /**
   * There are three wrong answers
   */
  wrongAnswers: [
    StatefulCard["answer"],
    StatefulCard["answer"],
    StatefulCard["answer"]
  ];
  /**
   * All other cards
   */
  otherCards: StatefulCard[];
};

/**
 * Given a state and a correct or incorrect answer, returns a new updated state
 */
export const advanceState = (
  { currentCard, otherCards }: State,
  answer: "correct" | "incorrect"
): State => {
  const updatedCard: StatefulCard = {
    ...currentCard,
    streak: answer === "correct" ? currentCard.streak + 1 : 0,
  };

  // TODO some kind of shuffled weighted thing?
  const shuffledOthers = shuffle(otherCards);

  // TODO persist updated state to localStorage
  return {
    currentCard: shuffledOthers[0],
    wrongAnswers: [
      shuffledOthers[1].answer,
      shuffledOthers[2].answer,
      shuffledOthers[3].answer,
    ],
    otherCards: [...shuffledOthers.slice(1), updatedCard],
  };
};

const initializeCard = (card: BareCard): StatefulCard => ({
  ...card,
  streak: 0,
});

export const initializeState = (): State => {
  // TODO retrieve from localStorage
  const initializedCards = shuffle(allCards.map(initializeCard));
  return {
    currentCard: initializedCards[0],
    wrongAnswers: [
      initializedCards[1].answer,
      initializedCards[2].answer,
      initializedCards[3].answer,
    ],
    otherCards: initializedCards.slice(1),
  };
};

export const getLearningProgress = ({
  currentCard,
  otherCards,
}: State): number => {
  const cards = [currentCard, ...otherCards];
  const averageLearning =
    cards
      // We treat a streak of 7 or more as 100% learnt
      .map(({ streak }) => Math.min(streak, 7) / 7)
      .reduce((acc, curr) => acc + curr) / cards.length;
  return averageLearning;
};
