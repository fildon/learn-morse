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
  state: State,
  answer: "correct" | "incorrect"
): State => {
  // TODO update the state of the current card
  // TODO fetch the next card to test
  // TODO persist updated state to localStorage
  // TODO return updated state
  return initializeState();
};

const initializeCard = (card: BareCard): StatefulCard => ({
  ...card,
  box: 0,
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
