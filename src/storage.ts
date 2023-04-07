import {
  isStatefulCard,
  type StatefulCard,
  type BareCard,
  allCards,
} from "./card";
import { shuffle } from "./utils";

const initializeCard = (card: BareCard): StatefulCard => ({
  ...card,
  streak: 0,
});

const initializeCards = (): StatefulCard[] =>
  shuffle(allCards.map(initializeCard));

/**
 * Read and write to localStorage, but with explicit dependency injection
 */
export const createStorageModule = ({
  getItem,
  setItem,
}: Pick<Storage, "getItem" | "setItem">) => ({
  writeStatefulCardsToStore: (cards: StatefulCard[]): void =>
    setItem("cards", JSON.stringify(cards)),
  readStatefulCardsFromStore: (): StatefulCard[] => {
    const stored = getItem("cards");

    // Nothing found in storage
    if (stored === null) return initializeCards();

    try {
      const parsed = JSON.parse(stored);

      // Stored item was not an array
      if (!Array.isArray(parsed)) throw new Error();

      // If not every item is a stateful card, then something went wrong.
      if (!parsed.every(isStatefulCard)) throw new Error();

      // We have confirmed that we have an array of stateful cards.
      return parsed;
    } catch (_) {
      console.error(
        `Found corrupted data in localStorage. The storage will now be cleared. The corrupted data were: ${stored}`
      );
      localStorage.clear();
      return initializeCards();
    }
  },
});
