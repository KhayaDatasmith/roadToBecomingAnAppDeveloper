
// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const choices =[
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
]

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const FinalResultDiv = document.querySelectorAll(".results-result");

const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");

const playAgainBtn =document.querySelector('.play-again');

const scoreNumber = document.querySelector('.scoreNumber')
let score = 0;

//Game logic
choiceButtons.forEach(button => {
    button.addEventListener('click',() =>{
        const choiceName = button.dataset.choice;
        const choice = choices.find(choice => choice.name == choiceName);
        choose(choice);
    })
})


function choose(choice) {
    const aiChoice = aiChoose();
    displayResults([choice, aiChoice]);
    displayWinner([choice, aiChoice]);
}

function aiChoose(){
    const rand = Math.floor(Math.random() * choices.length);
    return choices[rand];
}

function displayResults(results) {
    FinalResultDiv.forEach((resultsDiv, idx) => {
        setTimeout(() => {
            resultsDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="./images/icon-${results[idx].name}.svg" alt="${results[idx].name}"/>
                </div>
                ` 
        }, idx * 1000);
    });


gameDiv.classList.toggle('hidden');
resultsDiv.classList.toggle('hidden');
}

function displayWinner(results){
    setTimeout(()=>{
        const[userChoice, aiChoice] = results;
        
        const userWins = isWinner(userChoice, aiChoice);
        const aiWins = isWinner(aiChoice, userChoice);

        if(userWins) {
            resultText.innerText = "you win"
            FinalResultDiv[0].classList.toggle("winner");
            keepScore(1);
        } else if(aiWins) {
            resultText.innerText = "you lose"
            FinalResultDiv[1].classList.toggle("winner");
            keepScore(-1);
        } else{
            resultText.innerText = "draw";
        }
        resultWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');
    }, 1000);
}

function isWinner(player, opponent){
    return player.beats === opponent.name;
}

function keepScore(point){
    score += point
    scoreNumber.innerText = score
}

//Play again
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')

    FinalResultDiv.forEach(resultsDiv => {
        resultsDiv.innerHTML = ""
        resultsDiv.classList.remove('winner')
    })    
    resultText.innerText = "";
    resultWinner.classList.toggle('hidden')
    resultsDiv.classList.toggle('show-winner')
})

// Show/Hide rules
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener('click', () => {
    modalRules.classList.toggle("show-modal");
});