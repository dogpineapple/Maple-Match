const cards = document.querySelectorAll('.card');
const gameWindow = document.querySelector('.game');
const gameHeader = document.querySelector('header');
const flipCounter = document.querySelector('.flip-counter');
const matchesCounter = document.querySelector('.matches-counter');
const titleScreen = document.querySelector('.title-screen');
const startGameBtn = document.querySelector('.start');
const startGameBtnPressed = document.querySelector('.start-pressed');
const playAgainBtn = document.querySelector('.play-again');
const highestScore = document.querySelector('.highest-score');
var numberOfFaceUp = 0;
var numberOfFlips = 0;
var numberOfMatches = 0;
var firstCardType = ""; 
var secondCardType = "";

// MARK: Start Game Button - reveals the game window and hides the title screen, then shuffle the card div elements.
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

// MARK: Play Again Button - Resets all counters to 0 and flip all face-up cards, then Shuffle the card div elements.
playAgainBtn.addEventListener("click", function(event) {
    flipCounter.innerText = 0;
    matchesCounter.innerText = 0;
    numberOfFlips = 0;
    numberOfMatches = 0;
    cards.forEach(element => {
        element.firstElementChild.classList.toggle('hide');
        element.lastElementChild.classList.toggle('reveal');
    });
    document.querySelector('.completion-image').classList.toggle('hide');
    shuffle(gameWindow);
})

// MARK: Cards - When clicked, checks if it is a match. 
for (var card of cards) {
    card.addEventListener("click", function(event){
        const backside = event.target.parentElement.firstElementChild
        const monsterside = event.target.parentElement.lastElementChild

        // First card picked by player will stay face-up and be given an id 'first-pick'. Also increase the flip counter by 1.
        if (event.target.className === 'face-down' && numberOfFaceUp < 1) {
            event.target.setAttribute('id', 'first-pick');

            backside.classList.toggle('hide');
            monsterside.classList.toggle('reveal');

            firstCardType = monsterside.classList[1];
            numberOfFaceUp++;
            flipNumbers();
        } 
        // Second card picked by player be flipped face-up and is checked if it is a match or not. Also increase the flip counter by 1.
        if (event.target.className === 'face-down' && numberOfFaceUp >= 1) {
            backside.classList.toggle('hide');
            monsterside.classList.toggle('reveal');

            secondCardType = monsterside.classList[1];
            flipNumbers();
            // Checks if the first card is the same type as the second card's type.
            if (firstCardType === secondCardType) {
                numberOfMatches++;
                matchesCounter.innerText = numberOfMatches;

               // Checks if all cards have been paired, if so, display the completion elements.
                if (numberOfMatches === 9) {
                     // Check to replace the highest score with the new possible highest score. 
                    if (highestScore.innerText > numberOfFlips) {
                        highestScore.innerText = numberOfFlips;
                        setTimeout(function() {
                            alert('Nice! You got a new high-score! :D');
                        }, 500);
                    }
                    document.querySelector('.completion-image').classList.toggle('hide');
                }
                // Remove the #first-pick to be used again for the next card to match. 
                document.querySelector('#first-pick').removeAttribute('id');
                numberOfFaceUp = 0;
            } else {
                numberOfFaceUp = 0;
                // Turn off pointer events if wrong card match to prevent glitches.
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

// Flips the chosen mis-match cards. This is called when the cards are not a match.
function tryAgain(backside, monsterside) {
    backside.classList.toggle('hide');
    monsterside.classList.toggle('reveal');

    let firstPick = document.querySelector('#first-pick');

    firstPick.classList.toggle('hide');
    firstPick.nextElementSibling.classList.toggle('reveal');
    firstPick.removeAttribute('id');

    // For each card, set the style pointerevents to auto to enable pointer events again. 
    cards.forEach(element => {
        element.style.pointerEvents = 'auto';
    });
}

// Shuffles the cards within the game container.
function shuffle(arr) {
    for (var i=0; i<arr.children.length; i++) {
        arr.appendChild(arr.children[Math.random() * i | 0]);
    }
}

// Increases the flip counter by 1 and alters the flip counter html.
function flipNumbers() {
    numberOfFlips++;
    flipCounter.innerText = numberOfFlips;
}