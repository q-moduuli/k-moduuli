const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "Berlin", "London", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
];

let currentQuestionIndex = 0;
let shuffledQuestions = shuffleArray(questions);

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion(question) {
    document.getElementById('question').textContent = question.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', handleChoice);
        choicesDiv.appendChild(button);
    });
}

function handleChoice(event) {
    const selectedChoice = event.target.textContent;
    const correctAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
    if (selectedChoice === correctAnswer) {
        alert('Correct!');
    } else {
        alert(`Wrong! The correct answer is ${correctAnswer}`);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        alert('Congratulations! You have completed the questionnaire.');
        currentQuestionIndex = 0;
        shuffledQuestions = shuffleArray(questions);
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

// Initial question
showQuestion(shuffledQuestions[currentQuestionIndex]);
