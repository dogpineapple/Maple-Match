const cards = document.querySelectorAll('.card');
const gameWindow = document.querySelector('.game');
const gameHeader = document.querySelector('header');
const flipCounter = document.querySelector('.flip-counter');
const matchesCounter = document.querySelector('.matches-counter');
const titleScreen = document.querySelector('.title-screen');
const startGameBtn = document.querySelector('.start');
const startGameBtnPressed = document.querySelector('.start-pressed');
const playAgainBtn = document.querySelector('.play-again');
var numberOfFaceUp = 0;
var numberOfFlips = 0;
var numberOfMatches = 0;
var firstCardType = ""; 
var secondCardType = "";
var matchedArray = [];



startGameBtn.addEventListener("click", function(event) {
    startGameBtn.classList.toggle('hide');
    startGameBtnPressed.classList.toggle('hide');
    let timerId = setTimeout(function() {
        titleScreen.classList.toggle('hide');
        gameHeader.classList.toggle('hide');
        gameWindow.classList.toggle('hide');
        shuffle(gameWindow);
    }, 1000);
})

playAgainBtn.addEventListener("click", function(event) {
    flipCounter = 0;
    matchesCounter = 0;
    numberOfFlips.innerText = 0;
    numberOfMatches.innerText = 0;
    cards.forEach(element => {
        element.firstElementChild.classList.toggle('hide');
        element.lastElementChild.classList.toggle('reveal');
    });
    document.querySelector('.completion-image').classList.toggle('hide');
    shuffle(gameWindow);
})


for (var card of cards) {
    card.addEventListener("click", function(event){
        const backside = event.target.parentElement.firstElementChild
        const monsterside = event.target.parentElement.lastElementChild

        numberOfFlips++;
        flipCounter.innerText = numberOfFlips;

        if (event.target.className === 'face-down' && numberOfFaceUp < 1) {
            event.target.setAttribute('id', 'first-pick');

            backside.classList.toggle('hide');
            monsterside.classList.toggle('reveal');

            firstCardType = monsterside.classList[1];
            numberOfFaceUp++;
        } 
        if (event.target.className === 'face-down' && numberOfFaceUp >= 1) {

            backside.classList.toggle('hide');
            monsterside.classList.toggle('reveal');

            secondCardType = monsterside.classList[1];

            if (firstCardType === secondCardType) {
                numberOfMatches++;
                matchesCounter.innerText = numberOfMatches;

                if (numberOfMatches === 9) {
                    document.querySelector('.completion-image').classList.toggle('hide');
                }

                matchedArray.push(firstCardType);
                document.querySelector('#first-pick').removeAttribute('id');
                numberOfFaceUp = 0;
            } else {
                numberOfFaceUp = 0;
                
                // turn off pointer events if wrong card match to prevent glitches.
                cards.forEach(element => {
                    element.style.pointerEvents = 'none';
                });
                // MARK: if the cards has .reveal on, turn .reveal off if it isn't a correctly matched card. 
               let timerId = setTimeout(function() {
                   tryAgain(backside, monsterside);
               }, 1000);

            }
        }  
    })
}

function tryAgain(backside, monsterside) {
    backside.classList.toggle('hide');
    monsterside.classList.toggle('reveal');

    let firstPick = document.querySelector('#first-pick');

    firstPick.classList.toggle('hide');
    firstPick.nextElementSibling.classList.toggle('reveal');
    firstPick.removeAttribute('id');

    // for each card, set the style pointerevents to auto to enable pointer events again. 
    cards.forEach(element => {
        element.style.pointerEvents = 'auto';
    });
}

// shuffles the cards within the game container.
function shuffle(arr) {
    for (var i=0; i<arr.children.length; i++) {
        arr.appendChild(arr.children[Math.random() * i | 0]);
    }
}
