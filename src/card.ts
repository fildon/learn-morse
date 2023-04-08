/**
 * A flash card with no state
 */
export type BareCard = {
  question: string;
  answer: string;
  tag: "morseToText" | "textToMorse";
};

/**
 * A flash card which remembers the current correct streak
 */
export type StatefulCard = BareCard & {
  /**
   * How many times has the card been answered correctly without mistake?
   *
   * Any incorrect answer resets this to zero
   */
  streak: number;
};

const isUnknownObject = (
  x: unknown
): x is Record<PropertyKey, unknown> =>
  x !== null && typeof x === "object";

export const isStatefulCard = (x: unknown): x is StatefulCard =>
  isUnknownObject(x) &&
  typeof x.question === "string" &&
  typeof x.answer === "string" &&
  typeof x.streak === "number";

export const allCards: BareCard[] = [
  // Morse to Text
  { question: "● ▀▀▀", answer: "A", tag: "morseToText" },
  { question: "▀▀▀ ● ● ●", answer: "B", tag: "morseToText" },
  { question: "▀▀▀ ● ▀▀▀ ●", answer: "C", tag: "morseToText" },
  { question: "▀▀▀ ● ●", answer: "D", tag: "morseToText" },
  { question: "●", answer: "E", tag: "morseToText" },
  { question: "● ● ▀▀▀ ●", answer: "F", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ●", answer: "G", tag: "morseToText" },
  { question: "● ● ● ●", answer: "H", tag: "morseToText" },
  { question: "● ●", answer: "I", tag: "morseToText" },
  { question: "● ▀▀▀ ▀▀▀ ▀▀▀", answer: "J", tag: "morseToText" },
  { question: "▀▀▀ ● ▀▀▀", answer: "K", tag: "morseToText" },
  { question: "● ▀▀▀ ● ●", answer: "L", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀", answer: "M", tag: "morseToText" },
  { question: "▀▀▀ ●", answer: "N", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀", answer: "O", tag: "morseToText" },
  { question: "● ▀▀▀ ▀▀▀ ●", answer: "P", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ● ▀▀▀", answer: "Q", tag: "morseToText" },
  { question: "● ▀▀▀ ●", answer: "R", tag: "morseToText" },
  { question: "● ● ●", answer: "S", tag: "morseToText" },
  { question: "▀▀▀", answer: "T", tag: "morseToText" },
  { question: "● ● ▀▀▀", answer: "U", tag: "morseToText" },
  { question: "● ● ● ▀▀▀", answer: "V", tag: "morseToText" },
  { question: "● ▀▀▀ ▀▀▀", answer: "W", tag: "morseToText" },
  { question: "▀▀▀ ● ● ▀▀▀", answer: "X", tag: "morseToText" },
  { question: "▀▀▀ ● ▀▀▀ ▀▀▀", answer: "Y", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ● ●", answer: "Z", tag: "morseToText" },
  { question: "● ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀", answer: "1", tag: "morseToText" },
  { question: "● ● ▀▀▀ ▀▀▀ ▀▀▀", answer: "2", tag: "morseToText" },
  { question: "● ● ● ▀▀▀ ▀▀▀", answer: "3", tag: "morseToText" },
  { question: "● ● ● ● ▀▀▀", answer: "4", tag: "morseToText" },
  { question: "● ● ● ● ●", answer: "5", tag: "morseToText" },
  { question: "▀▀▀ ● ● ● ●", answer: "6", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ● ● ●", answer: "7", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀ ● ●", answer: "8", tag: "morseToText" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ●", answer: "9", tag: "morseToText" },
  {
    question: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀",
    answer: "0",
    tag: "morseToText",
  },
  // Text to Morse
  { question: "A", answer: "● ▀▀▀", tag: "textToMorse" },
  { question: "B", answer: "▀▀▀ ● ● ●", tag: "textToMorse" },
  { question: "C", answer: "▀▀▀ ● ▀▀▀ ●", tag: "textToMorse" },
  { question: "D", answer: "▀▀▀ ● ●", tag: "textToMorse" },
  { question: "E", answer: "●", tag: "textToMorse" },
  { question: "F", answer: "● ● ▀▀▀ ●", tag: "textToMorse" },
  { question: "G", answer: "▀▀▀ ▀▀▀ ●", tag: "textToMorse" },
  { question: "H", answer: "● ● ● ●", tag: "textToMorse" },
  { question: "I", answer: "● ●", tag: "textToMorse" },
  { question: "J", answer: "● ▀▀▀ ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "K", answer: "▀▀▀ ● ▀▀▀", tag: "textToMorse" },
  { question: "L", answer: "● ▀▀▀ ● ●", tag: "textToMorse" },
  { question: "M", answer: "▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "N", answer: "▀▀▀ ●", tag: "textToMorse" },
  { question: "O", answer: "▀▀▀ ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "P", answer: "● ▀▀▀ ▀▀▀ ●", tag: "textToMorse" },
  { question: "Q", answer: "▀▀▀ ▀▀▀ ● ▀▀▀", tag: "textToMorse" },
  { question: "R", answer: "● ▀▀▀ ●", tag: "textToMorse" },
  { question: "S", answer: "● ● ●", tag: "textToMorse" },
  { question: "T", answer: "▀▀▀", tag: "textToMorse" },
  { question: "U", answer: "● ● ▀▀▀", tag: "textToMorse" },
  { question: "V", answer: "● ● ● ▀▀▀", tag: "textToMorse" },
  { question: "W", answer: "● ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "X", answer: "▀▀▀ ● ● ▀▀▀", tag: "textToMorse" },
  { question: "Y", answer: "▀▀▀ ● ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "Z", answer: "▀▀▀ ▀▀▀ ● ●", tag: "textToMorse" },
  { question: "1", answer: "● ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "2", answer: "● ● ▀▀▀ ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "3", answer: "● ● ● ▀▀▀ ▀▀▀", tag: "textToMorse" },
  { question: "4", answer: "● ● ● ● ▀▀▀", tag: "textToMorse" },
  { question: "5", answer: "● ● ● ● ●", tag: "textToMorse" },
  { question: "6", answer: "▀▀▀ ● ● ● ●", tag: "textToMorse" },
  { question: "7", answer: "▀▀▀ ▀▀▀ ● ● ●", tag: "textToMorse" },
  { question: "8", answer: "▀▀▀ ▀▀▀ ▀▀▀ ● ●", tag: "textToMorse" },
  { question: "9", answer: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ●", tag: "textToMorse" },
  {
    question: "0",
    answer: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀",
    tag: "textToMorse",
  },
];
