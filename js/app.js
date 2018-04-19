// Create a list that holds all of your cards
const cardArray = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// Define the selectors
const cardList = document.getElementById("myDeck");
const moveDisplay = document.querySelector(".moves");
const btnReset = document.querySelector(".restart");
const starRating = document.querySelector(".stars");
const playAgain = document.getElementById("playAgain");
const modal = document.getElementById("myModal");
const scoreLine = document.getElementById("scoreLine");

// Define Variables
let numberOfMoves = 0;
let numberOfMatches = 0;
let openCards = [];
let numberOfStars = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffledDeck = shuffle(cardArray);

btnReset.addEventListener("click", function (){
	location.reload();
});

playAgain.addEventListener("click", function (){
	location.reload();
});

for (let i = 0; i <= 15; i++) {
	    var lineItem = document.createElement("li");
	    lineItem.setAttribute("class", "card");
	    lineItem.addEventListener("click", function(){
			//var child = this.children;
			cardClicked(this);
			checkOpened(this);

		});
	    let iTag = document.createElement("i");
	    iTag.setAttribute("class", shuffledDeck[i]);
	    lineItem.appendChild(iTag);
	    cardList.appendChild(lineItem);
	}

// Start the timer
 let startingTime = Date.now();

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

// Use CSS to display the card.
function cardClicked(card){
	card.classList.toggle("open");
	card.classList.toggle("show");
}

// This checkes the card to see if there is one open.  If it is open, it compare to see if it is a match or not.
function checkOpened(cCard) {
	let openChild = cCard.children[0].classList[1];
	if (openCards.length === 0) {
		moves();
		openCards.push(cCard);
	} else if (openCards[0] == cCard){
		cardClicked(cCard);

	} else if (openCards[0].children[0].classList[1] === openChild){
		cardMatched(openCards[0], cCard);
	} else {
		cardClicked(openCards[0]);
		cardClicked(cCard);
		openCards = [];
	}
}

// Run this funtion when the cards match.  If you have 8 matches, then the game is over.
function cardMatched (matchCard1, matchCard2) {
	cardClicked(matchCard1);
	cardClicked(matchCard2);
	matchCard1.classList.toggle("match");
	matchCard2.classList.toggle("match");
	matchCard1.removeEventListener;
	matchCard2.removeEventListener;
	numberOfMatches += 1
	openCards = [];
	console.log(numberOfMatches);
	if (numberOfMatches === 8){
		 endGame ();
	}
}

// Display the stars based on the number of move.  Each move consists of turning over two careds.
function moves (){
	numberOfMoves += 1;
	moveDisplay.textContent = numberOfMoves;
	if (numberOfMoves >= 25){
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>";
		numberOfStars = 1;
	} else if (numberOfMoves >= 20){
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>";
		numberOfStars = 2;
	} else {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	}
}

// Display the model
function endGame () {
	let endTime = Date.now();
	time = Math.floor((endTime - startingTime)/1000);
	scoreLine.innerText = "You won in " + time + " seconds, with " + numberOfStars + " stars!";
	console.log(time);
	modal.style.display = "block";
}









/*
 * set up the event listener for a card. If a card is clicked: DONE
 *  - display the card's symbol (put this functionality in another function that you call from this one) DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) DONE
 *  - if the list already has another card, check to see if the two cards match DONE
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)DONE
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)Done
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)Done
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
