import { type BareCard, type StatefulCard } from "./card";
import {
  completeLesson,
  getLearningProgress,
  getLesson,
  type Lesson,
} from "./lesson";
import { createStorageModule } from "./storage";
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
const progress = document.getElementById(
  "progress"
) as HTMLProgressElement;

// Prepare mutable state
const storageModule = createStorageModule({
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
});
let currentCards = storageModule.readStatefulCardsFromStore();
let currentLesson = getLesson(currentCards);

const renderLesson = ({ quizCard, wrongAnswers }: Lesson): void => {
  // Display the current question
  queryDisplay.textContent = quizCard.question;

  // Shuffle the correct answer among the wrong answers
  const [a, b, c, d] = shuffle([quizCard.answer, ...wrongAnswers]);

  // Display the possible answers
  buttonA.textContent = a;
  buttonB.textContent = b;
  buttonC.textContent = c;
  buttonD.textContent = d;
};

const renderPreviousResult = (
  { question, answer }: BareCard,
  feedbackMessage: string
) => {
  // The element is initially display: none since there is nothing to display
  // So we have to ensure that it is revealed in order to show anything
  previousResult.style.display = "block";

  feedback.textContent = feedbackMessage;
  previousQuestion.textContent = question;
  previousAnswer.textContent = answer;
};

const renderProgress = (cards: StatefulCard[]) => {
  const progressValue = getLearningProgress(cards);
  progress.value = progressValue * 100;
  progress.textContent = `${progressValue * 100}%`;
};

// Initial render
renderLesson(currentLesson);
renderProgress(currentCards);

// Bind event listeners
[buttonA, buttonB, buttonC, buttonD].forEach((button) =>
  button.addEventListener("click", () => {
    const { updatedCards, nextLesson, feedbackMessage } =
      completeLesson(
        currentCards,
        currentLesson.quizCard,
        button.textContent!
      );

    // Update UI
    renderLesson(nextLesson);
    renderPreviousResult(currentLesson.quizCard, feedbackMessage);
    renderProgress(updatedCards);

    // Update in memory state
    currentCards = updatedCards;
    currentLesson = nextLesson;

    // Update persisted state
    storageModule.writeStatefulCardsToStore(updatedCards);
  })
);
