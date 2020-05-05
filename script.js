const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreContainerElement = document.getElementById('score-container')
const scoreHeaderElement = document.getElementById('game-score')

let shuffledQuestions, currentQuestionIndex, scoreGame

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    scoreContainerElement.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    scoreGame = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    console.log(question)
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct =answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
} 

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    increaseScore(correct)
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > (currentQuestionIndex+1)) {
    nextButton.classList.remove('hide')
    } else {
    startButton.innerText = 'End' 
    startButton.classList.remove('hide')
    scoreHeaderElement.innerText ='You scored ' + scoreGame
    scoreContainerElement.classList.remove('hide')
    }
} 

function increaseScore(correct) {
    if (correct) {
        scoreGame++
    }
}

function setStatusClass (element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Metereology is the study of?',
        answers: [
            {text: 'weather', correct: true },
            {text: 'moonlight', correct: false },
            {text: 'meter', correct: false },
            {text: 'meteors', correct: false }
        ]
    },
    {
        question: 'Who is called the father of computer?',
        answers: [
            {text: 'Alexander Fleming', correct: false },
            {text: 'Bill Gates', correct: false },
            {text: 'Charles Babbage', correct: true },
            {text: 'Larry Page', correct: false }
        ]
    },
    {
        question: 'What is often seen as the smallest unit of memory?',
        answers: [
            {text: 'Megabytes', correct: false },
            {text: 'Kilobytes', correct: true },
            {text: 'Gigabytes', correct: false },
            {text: 'Microbytes', correct: false }
        ]
    },
    {
        question: 'In which part of the body is the femur?',
        answers: [
            {text: 'leg', correct: true },
            {text: 'Hand', correct: false },
            {text: 'Nose', correct: false },
            {text: 'Face', correct: false }
        ]
    },
    {
        question: 'Which element is said to keep the bones strong?',
        answers: [
            {text: 'Potassium', correct: false },
            {text: 'Nitrogen', correct: false },
            {text: 'Sodium', correct: false },
            {text: 'Calcium', correct: true }
        ]
    },
]


