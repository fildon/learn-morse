import { type State, initializeState, advanceState } from "./state";
import { shuffle } from "./utils";

// Find interactive elements
const queryDisplay = document.getElementById("question")!;
const buttonA = document.getElementById("A")!;
const buttonB = document.getElementById("B")!;
const buttonC = document.getElementById("C")!;
const buttonD = document.getElementById("D")!;
const previousResult = document.getElementById("previousResult")!;

let state = initializeState();

const renderState = (state: State): void => {
  // Display the current question
  queryDisplay.textContent = state.currentCard.question;

  // Shuffle the correct answer among the wrong answers
  const [a, b, c, d] = shuffle([
    state.currentCard.answer,
    ...state.wrongAnswers,
  ]);
  // Display the possible answers
  buttonA.textContent = a;
  buttonB.textContent = b;
  buttonC.textContent = c;
  buttonD.textContent = d;
};

// Initial render
renderState(state);

// Bind event listeners
[buttonA, buttonB, buttonC, buttonD].forEach((button) =>
  button.addEventListener("click", () => {
    const isCorrect = button.textContent === state.currentCard.answer;
    previousResult.textContent = `${isCorrect ? "Yes!" : "No."} ${
      state.currentCard.question
    } is ${state.currentCard.answer}`;
    state = advanceState(state, isCorrect ? "correct" : "incorrect");
    renderState(state);
  })
);
