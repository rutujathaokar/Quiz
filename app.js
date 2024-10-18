const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which animal lays the largest egg in the world?",
        answers: [
            {text: "Fish", correct: false},
            {text: "Hen", correct: false},
            {text: "Ostrich", correct: true},
            {text: "Goat", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
];

const questionElement = document.getElementById('question');
const answerBtn = document.getElementById('answer-btn');
const nextBtn = document.getElementById('next-btn');

let currentQue = 0;
let score = 0;

function startQuiz() {
    currentQue = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQue();
}

function showQue() {
    resetState();
    let currentQuestion = questions[currentQue];
    let queNo = currentQue + 1;
    questionElement.innerHTML = queNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQue++;
    if (currentQue < questions.length) {
        showQue();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQue < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();