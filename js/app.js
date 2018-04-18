/*
 * Create a list that holds all of your cards
 */
const cardArray = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const cardList = document.getElementById("myDeck");
const moveDisplay = document.querySelector(".moves");
const btnReset = document.querySelector(".restart");
const starRating = document.querySelector(".stars");
let numberOfMoves = 0;
let numberOfMatches = 0;
let openCards = [];
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

for (let i = 0; i <= 15; i++) {
	    var lineItem = document.createElement("li");
	    lineItem.setAttribute("class", "card");
	    lineItem.addEventListener("click", function(){
			var child = this.children;
			cardClicked(this);
			checkOpened(this);

		});
	    let iTag = document.createElement("i");
	    iTag.setAttribute("class", shuffledDeck[i]);
	    lineItem.appendChild(iTag);
	    cardList.appendChild(lineItem);
	}


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

function cardClicked(card){
	card.classList.toggle("open");
	card.classList.toggle("show");
	console.log(card);
}

function checkOpened(cCard) {
	let openChild = cCard.children[0].classList[1];
	if (openCards.length === 0) {
		moves();
		openCards.push(cCard);
		} else if (openCards[0].children[0].classList[1] === openChild){
			numberOfMatches += 1
			cardMatched(openCards[0], cCard);
		} else {
			cardClicked(openCards[0]);
			cardClicked(cCard);
			openCards = [];
		}
}

function cardMatched (matchCard1, matchCard2) {
	cardClicked(matchCard1);
	cardClicked(matchCard2);
	matchCard1.classList.toggle("match");
	matchCard2.classList.toggle("match");
	openCards = [];
	if (numberOfMatches === 8){
		console.log("WINNER");
	}
}

function moves (){
	numberOfMoves += 1;
	moveDisplay.textContent = numberOfMoves;
	if (numberOfMoves >= 25){
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>";
	} else if (numberOfMoves >= 20){
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>";
	} else {
		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	}
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
