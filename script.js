
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

var oikeaVastaus=""

function showQuestion(question) {
    let kysymykset=getRandomItemsFromArray(lyhenteet, 3)
    let suunta = Math.random()>=0.5

    let kysymys = suunta ? kysymykset[0][0] : kysymykset[0][1]
    let vastaukset = kysymykset.map((e,i) =>[i,(suunta ? e[1] : e[0])])

    oikeaVastaus=kysymykset[0]
    if (suunta) oikeaVastaus.reverse()
    oikeaVastaus=oikeaVastaus[0] + " on " +oikeaVastaus[1]

    document.getElementById('question').textContent = kysymys +" on";
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    shuffleArray(vastaukset).forEach(choice => {
        const button = document.createElement('div');
        button.textContent = choice[1];
        button.classList.add('choice');
        button.addEventListener('click', choice[0]==0 ? handleCorrectChoice : handleIncorrectChoice);
        choicesDiv.appendChild(button);
    });
}

function handleChoice(oikein)
{
    let e = document.getElementById('tulos')
    if (oikein) {
        e.innerHTML="Oikein! "+oikeaVastaus
    } else {
        e.innerHTML="Väärin! "+oikeaVastaus
    }
    
    showQuestion()
}

function handleCorrectChoice(event) {
    handleChoice(true)
}

function handleIncorrectChoice(event) {
    handleChoice(false)
}


// Initial question
showQuestion();
