import { type State, initializeState, advanceState, getLearningProgress } from "./state";
import { shuffle } from "./utils";

// Find interactive elements
const queryDisplay = document.getElementById("question")!;
const buttonA = document.getElementById("A")!;
const buttonB = document.getElementById("B")!;
const buttonC = document.getElementById("C")!;
const buttonD = document.getElementById("D")!;
const previousResult = document.getElementById("previousResult")!;
const feedback = document.getElementById("feedback")!;
const previousQuestion = document.getElementById("previousQuestion")!;
const previousAnswer = document.getElementById("previousAnswer")!;
const progress = document.getElementById("progress") as HTMLProgressElement;

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
  
  // Progress update
  const progressValue = getLearningProgress(state);
  progress.value = progressValue * 100;
  progress.textContent = `${progressValue * 100}%`;
};

// Initial render
renderState(state);

// Bind event listeners
[buttonA, buttonB, buttonC, buttonD].forEach((button) =>
  button.addEventListener("click", () => {
    previousResult.style.display = "block";
    const isCorrect = button.textContent === state.currentCard.answer;
    feedback.textContent = `${isCorrect ? "Yes!" : "No."}`;
    previousQuestion.textContent = state.currentCard.question;
    previousAnswer.textContent = state.currentCard.answer;
    state = advanceState(state, isCorrect ? "correct" : "incorrect");
    renderState(state);
  })
);
