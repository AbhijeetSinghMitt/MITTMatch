const cardsList = ["fas fa-atom", "fas fa-frog", "fas fa-feather-alt", "fas fa-cogs", "fas fa-anchor", "fas fa-fan", "fas fa-bolt", "fas fa-hat-wizard", "fas fa-apple-alt", "fas fa-bell", "fas fa-bomb", "fas fa-brain"];

const cards = ["fas fa-atom", "fas fa-frog", "fas fa-feather-alt", "fas fa-cogs", "fas fa-anchor", "fas fa-fan", "fas fa-bolt", "fas fa-hat-wizard", "fas fa-apple-alt", "fas fa-bell", "fas fa-bomb", "fas fa-brain"];

const puzzelCards = document.getElementById('cards').getElementsByTagName('li');
let cardNum = 0;
let nextCard = document.getElementById('next-card').getElementsByTagName('i')[0].className = cardsList[cardNum];
let moves = 0;
document.getElementById('score').textContent = moves;
let markedCount = 0;

// functions ===================================
// =============================================

// Shuffle function from http://stackoverflow.com/a/2450976

let shuffle = function(cards) {
  let currentIndex = cards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}

// reset puzzelCards function

function reset() {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    puzzelCards[i].getElementsByTagName('i')[0].className = cards[i];
  }

  // reseting next card
  cardNum = 0;
  nextCard = document.getElementById('next-card').getElementsByTagName('i')[0].className = cardsList[cardNum];
  console.log(cardsList[0]);

  // reseting moves
  moves = 0;
  document.getElementById('score').textContent = moves;

  // reseting marked cards
  markedCount = 0;
}

// checkWin function

function checkWin() {
  if (markedCount === cards.length) {
    alert("Winner");
  }
}

// foldCard function

function foldCard() {
  for (let j = 0; j < cards.length; j++) {
    if (puzzelCards[j].classList.contains("show")) {
      puzzelCards[j].classList.remove("show");
    }  
  }
}

// checkMatch function

function checkMatch(event) {
  if (event.target.getElementsByTagName('i')[0].className === cardsList[cardNum]) {
    event.target.classList.add("matched");

    cardNum++;
    nextCard = document.getElementById('next-card').getElementsByTagName('i')[0].className = cardsList[cardNum];
    
    markedCount++;
  }
}

// foldAllCards function

function foldAllCards() {
  for (let j = 0; j < cards.length; j++) {
    if (puzzelCards[j].classList.contains("show")) {
      puzzelCards[j].classList.remove("show");
    }   
    if (puzzelCards[j].classList.contains("matched")) {
      puzzelCards[j].classList.remove("matched");
    }
  }
}

// click events ================================
// ============================================= 

// click event for card.

window.addEventListener('click', function(event){
  if (event.target.className === "card") {

    // fold card so that only one card shown at a time.
    foldCard();
    event.target.classList.add("show");

    // Card will automatically fold after one second. (1s = 1000ms)
    setInterval(function(){ event.target.classList.remove("show"); }, 1000);
    checkMatch(event);
    moves++;
    document.getElementById('score').textContent = moves;
    checkWin(); 
  }
})

// click event to restart game.

window.addEventListener('click', function(event){
  if (event.target.className === "restart") {
    foldAllCards();
    reset();
  }
})

// calling function ===========================
// =============================================

// calling reset function

reset();
