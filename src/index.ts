const queryDisplay = document.getElementById("query")!;

const buttonA = document.getElementById("A")!;
const buttonB = document.getElementById("B")!;
const buttonC = document.getElementById("C")!;
const buttonD = document.getElementById("D")!;

buttonA.addEventListener("click", () => (queryDisplay.textContent = "A"));
buttonB.addEventListener("click", () => (queryDisplay.textContent = "B"));
buttonC.addEventListener("click", () => (queryDisplay.textContent = "C"));
buttonD.addEventListener("click", () => (queryDisplay.textContent = "D"));
