import { allCards, type BareCard, type StatefulCard } from "./card";
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
const buttons = document.getElementsByTagName("button");
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
  buttons[0].textContent = a;
  buttons[1].textContent = b;
  buttons[2].textContent = c;
  buttons[3].textContent = d;
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
  // We use a little rounding trick here to display only 2 decimal places
  progress.textContent = `${
    Math.round(progressValue * 10000) / 100
  }%`;
};

const submitAnswer = (answer: BareCard["answer"]) => {
  const { updatedCards, nextLesson, feedbackMessage } =
    completeLesson(currentCards, currentLesson.quizCard, answer);

  // Update UI
  renderLesson(nextLesson);
  renderPreviousResult(currentLesson.quizCard, feedbackMessage);
  renderProgress(updatedCards);

  // Update in memory state
  currentCards = updatedCards;
  currentLesson = nextLesson;

  // Update persisted state
  storageModule.writeStatefulCardsToStore(updatedCards);
};

// Initial render
renderLesson(currentLesson);
renderProgress(currentCards);

// Bind event listeners
[...buttons].forEach((button) =>
  button.addEventListener("click", () =>
    submitAnswer(button.textContent!)
  )
);

document.addEventListener("keyup", ({ key }) => {
  if (
    currentLesson.quizCard.tag === "morseToText" &&
    allCards.some(
      (card) =>
        card.answer.toLocaleLowerCase() === key.toLocaleLowerCase()
    )
  ) {
    submitAnswer(key);
  }
});
