
const lyhenteet = [
    ["QRG","Taajuus"],
    ["QRK","Signaalin luettavuus"],
    ["QRL","Taajuus käytössä"],
    ["QRM","Häiriöitä"]
]

function getRandomItemsFromArray(arr, numItems) {
    if (numItems >= arr.length) {
        return arr;
    } else {
        let result = [];
        let indices = new Set();

        while (indices.size < numItems) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            if (!indices.has(randomIndex)) {
                indices.add(randomIndex);
                result.push(arr[randomIndex]);
            }
        }

        return result;
    }
}


function shuffleArray(array) {
    return array
        .map((e) => [e,Math.random()])
        .sort((a,b) => a[1] - b[1])
        .map((e) => e[0])
}

function showQuestion(question) {
    let kysymykset=getRandomItemsFromArray(lyhenteet, 3)
    let suunta = Math.random()>=0.5

    let kysymys = suunta ? kysymykset[0][0] : kysymykset[0][1]
    

    document.getElementById('question').textContent = kysymys;
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
showQuestion();
