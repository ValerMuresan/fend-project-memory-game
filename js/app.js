
//  Built the list with cards

const pics = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];
const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
let firstClick = true;
const modal = document.getElementById("myModal");
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const movesContainer = document.querySelector(".moves");
let moves = 0;
const restartBtn = document.querySelector(".restart");
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

 // Start the game function
function startGame() {
  const shuffledPics = shuffle(pics);
    for(let i = 0; i < pics.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${pics[i]}"></i>`;
        cardsContainer.appendChild(card);
        // Call the click function
        click(card);
    }
}

// Create the timer
timerContainer.innerHTML = totalSeconds + 's';
 function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}
function stopTimer() {
    clearInterval(liveTimer);
}

// Create Reset function
function reset() {
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    firstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}

// Create restart
restartBtn.addEventListener("click", function() {
    cardsContainer.innerHTML = "";
    //Call Start game function
    startGame();
    // Game reset
    reset();
});

// Create Modal function from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
function showModal() {
modal.style.display = "block";
// modal close element
const span = document.getElementsByClassName("close")[0];
//play again element
const btn = document.getElementById("myBtn");
//quit element
const qbtn = document.getElementById("qBtn");
// When the user clicks on <button> (Play Again!), restart the game
btn.addEventListener ('click', function() {
    modal.style.display = "none";
    cardsContainer.innerHTML = "";
    startGame();
    reset();
});
// When the user clicks on <button> (Quit!), reload the page
qbtn.onclick = function() {
  modal.style.display ="none";
  location.reload();
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// Set the modal's moves
const movesInModal = document.querySelector("#allMoves");
movesInModal.innerHTML = ` ${moves + 1}`;
// Set the modal's time
const secondsInModal = document.querySelector("#timeInSeconds");
secondsInModal.innerHTML = totalSeconds;
// Set the modal's Rating
const starsInModal = starsContainer.innerHTML;
document.getElementById("totalStars").innerHTML = starsInModal;
}

// Game over function
function gameOver() {
    if(matchedCards.length === pics.length) {
        // Call the Stop the time function
        stopTimer();
        // Call the modal function
        showModal();
    }
}

// Create the rating
starsContainer.innerHTML = star + star + star;
function rating() {
    if( moves < 17) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 25) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}

// Create the move
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    // Call for Rating function
    rating();
}

// Compare the 2 cards function
function compare(secondCard, firstCard) {
    // Try to match the cards
    if(secondCard.innerHTML === firstCard.innerHTML) {
        // Cards are matched
        secondCard.classList.add("match");
        firstCard.classList.add("match");
        matchedCards.push(secondCard, firstCard);
        openedCards = [];
        // Call for Game over function
        gameOver();
    } else {
      // Set the time for matching the cards, in this case 300ms
        setTimeout(function() {
            secondCard.classList.remove("open", "show", "disable");
            firstCard.classList.remove("open", "show", "disable");
        }, 300);
        openedCards = [];
    }
    // Call for Add move function
    addMove();
}

// Create the Click Event
// Click Function
function click(card) {
    // Create Click Event for card
    card.addEventListener("click", function() {
        if(firstClick) {
            // Call Start the timer function
            startTimer();
            // Change the First Click value
            firstClick = false;
        }
        const secondCard = this;
        const firstCard = openedCards[0];
        // Opened card
        if(openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            // Call the Compare function
            compare(secondCard, firstCard);
        } else {
            secondCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
}
// Call Start the game function
startGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
