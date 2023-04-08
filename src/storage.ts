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
  stage: "ready",
});

const initializeCards = (): StatefulCard[] =>
  shuffle(allCards.map(initializeCard));

const VERSION = "1";

/**
 * Read and write to localStorage, but with explicit dependency injection
 */
export const createStorageModule = ({
  clear,
  getItem,
  setItem,
}: Pick<Storage, "clear" | "getItem" | "setItem">) => ({
  writeStatefulCardsToStore: (cards: StatefulCard[]): void =>
    setItem("cards", JSON.stringify(cards)),
  readStatefulCardsFromStore: (): StatefulCard[] => {
    const storedVersion = getItem("version");
    // If the stored version is out of date, we clear the store.
    if (storedVersion !== VERSION) {
      clear();
      setItem("version", VERSION);
      return initializeCards();
    }

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
      clear();
      return initializeCards();
    }
  },
});
