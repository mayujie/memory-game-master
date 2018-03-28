const cardDeck = document.querySelector('.deck');	//the score the deck of card

let cardStack = document.querySelectorAll('.card');	//nodelist of all cards 

let cardArray = [...cardStack];	// create array initialized to cardStack

let moves = 0;// initial moves count

let count = document.querySelector('.moves');// access the 'moves' class to set up event listeners

const starCount = document.querySelectorAll('.fa-star');// adds stars to array for rating 

let matchList = 0;//count the number of cards matched

let timer = document.querySelector('.gameTimer');//access the timer at the top of the game 

let openCards = [];//array to hold open cards

//variables for timer
let second = 0;
let minute = 0;
let hour = 0;
let timePassed;

let isAnimating = true;// allow additional card clicks to be disabled during animations 

let endStar= document.querySelector('.rating');// access class "rating" in html 

let endTime = document.querySelector('.endTime');//access the ending time for the model display 

let endMoves = document.querySelector('.totalMoves');//access the amount of moves for the model display 

let starList = document.querySelector('.stars');// access stars to set up for model

let modelSelector = document.querySelector('.model');// access the class "model" from html 

let replayButton = document.querySelector('.replay');// target "replay" at top right of screen and triggers displayCards on click 

replayButton.onclick = displayCards;

document.body.onload = displayCards;//shuffle and display cards face down upon game load 

/* @description: changes .restart to a clickable event which triggers the function displayCards
*/
let replayGame= document.querySelector('.restart');
replayGame.onclick = displayCards;
/*
@param: Name: array, type: array
@returns: randomized array
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
 /* @description: calls the shuffle function and displays all cards face down
 */
function displayCards() {
    cardArray = shuffle(cardArray);
    let tempHolder= [];
    for (let i=0; i < cardArray.length; i++) {
        cardDeck.innerHTML ='';
        tempHolder.forEach.call(cardArray, function(item){
        cardDeck.appendChild(item);
    });
    cardArray[i].classList.remove('show', 'open', 'match', 'unmatched', 'disabled');
    }
    moves =0;
    matchList =0;
    count.innerHTML = 0;
    for (let i=0; i < starCount.length; i++){
       starCount[i].style.visibility = 'visible';
    }
    /*starts/restarts timer */
    clearInterval(timePassed);
    /* resets all variables and innerHTML */
    hour =0;
    minute=0;
    second =0;
    timer.innerHTML = hour + ' h ' + minute + ' m ' + second + ' s';
    endTime.innerHTML = '';
    endMoves.innerHTML = '';
    endStar.innerHTML = '';
    openCards = [];
    isAnimating = false;
    modelSelector.classList.remove('show');
    gameTime();
 }
/* @description: open and compare cards open the cards and pushes it into the array.
 Compares cards and executes code or calls function whether or not they match.
*/
let openCard = function(){
    if(isAnimating) return;
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
    openCards.push(this);
    let cardCount = openCards.length;
    if (cardCount === 2) {
        movesCounter();
        if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            matchList++;
            for (let i=0; i < 2; i++){
                openCards[i].classList.add('match');
                openCards[i].classList.remove('show', 'open');
            }
            openCards = [];
        } else {
            notMatch();
        }
    }
    finished();
}
/* @description: sets delay when cards don't match and flips over 
*/
function notMatch(){
    isAnimating =true;
    for (let i=0; i < 2; i++){
    openCards[i].classList.add('unmatched');
    }
    setTimeout(function(){
        isAnimating = false;
        for (let i=0; i < openCards.length; i++){
            openCards[i].classList.remove('show', 'open', 'unmatched', 'disabled');
        }
        openCards = [];
    }, 2000);
}
/* @description: Add 1 each time 2 cards are clicked and updates the moves in index.html. Track moves and adjust star rating.
*/
function movesCounter(){
    moves ++;
    count.innerHTML = moves;
    if (moves < 30 && moves > 23){
        starCount[2].style.visibility = 'collapse';
    } else if (moves > 30){
        starCount[1].style.visibility = 'collapse';
    }
}
/*@description: game timer
*/
function gameTime(){
    timePassed = setInterval(function(){
        timer.innerHTML = hour + ' h ' + minute + ' m ' + second + ' s';
        second ++;
        if (second == 60){
            minute ++;
            second =0;
        }
        if (minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}
/* @description: model for when all cards are matched
*/
function finished() {
    if (matchList === 8){
        clearInterval(timePassed);
        endTime.innerHTML = timer.innerHTML;
        endMoves.innerHTML = count.innerHTML;
        endStar.innerHTML = starList.innerHTML;
        modelSelector.classList.add('show');
    }
}
/* @description: loop through the cards and add event listeners
*/
for (let i=0; i <cardArray.length; i++){
    cardStack= cardArray[i];
    cardStack.addEventListener('click', openCard);
}
