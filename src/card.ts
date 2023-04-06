/**
 * A flash card with no state
 */
export type BareCard = {
  question: string;
  answer: string;
};

/**
 * A flash card which remembers which box it is in
 */
export type StatefulCard = BareCard & {
  box: number;
};

export const allCards: BareCard[] = [
  { question: "● ▀▀▀", answer: "A" },
  { question: "▀▀▀ ● ● ●", answer: "B" },
  { question: "▀▀▀ ● ▀▀▀ ●", answer: "C" },
  { question: "▀▀▀ ● ●", answer: "D" },
  { question: "●", answer: "E" },
  { question: "● ● ▀▀▀ ●", answer: "F" },
  { question: "▀▀▀ ▀▀▀ ●", answer: "G" },
  { question: "● ● ● ●", answer: "H" },
  { question: "● ●", answer: "I" },
  { question: "● ▀▀▀ ▀▀▀ ▀▀▀", answer: "J" },
  { question: "▀▀▀ ● ▀▀▀", answer: "K" },
  { question: "● ▀▀▀ ● ●", answer: "L" },
  { question: "▀▀▀ ▀▀▀", answer: "M" },
  { question: "▀▀▀ ●", answer: "N" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀", answer: "O" },
  { question: "● ▀▀▀ ▀▀▀ ●", answer: "P" },
  { question: "▀▀▀ ▀▀▀ ● ▀▀▀", answer: "Q" },
  { question: "● ▀▀▀ ●", answer: "R" },
  { question: "● ● ●", answer: "S" },
  { question: "▀▀▀", answer: "T" },
  { question: "● ● ▀▀▀", answer: "U" },
  { question: "● ● ● ▀▀▀", answer: "V" },
  { question: "● ▀▀▀ ▀▀▀", answer: "W" },
  { question: "▀▀▀ ● ● ▀▀▀", answer: "X" },
  { question: "▀▀▀ ● ▀▀▀ ▀▀▀", answer: "Y" },
  { question: "▀▀▀ ▀▀▀ ● ●", answer: "Z" },
  { question: "● ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀", answer: "1" },
  { question: "● ● ▀▀▀ ▀▀▀ ▀▀▀", answer: "2" },
  { question: "● ● ● ▀▀▀ ▀▀▀", answer: "3" },
  { question: "● ● ● ● ▀▀▀", answer: "4" },
  { question: "● ● ● ● ●", answer: "5" },
  { question: "▀▀▀ ● ● ● ●", answer: "6" },
  { question: "▀▀▀ ▀▀▀ ● ● ●", answer: "7" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀ ● ●", answer: "8" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ●", answer: "9" },
  { question: "▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀", answer: "0" },
];
