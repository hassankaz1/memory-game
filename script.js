const selectedCards = [];
const gameContainer = document.getElementById("game");
let canClick = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //if boolean check is false then nothing will happen when clicked
  if (!canClick) return;
  //if card same as previous picked then nothing will happen
  if (event.target === selectedCards[selectedCards.length - 1]) return;

  //will turn current card into background color 
  event.target.style.backgroundColor = event.target.className;

  //add current card to our array that keeps track of cards flipped
  selectedCards.push(event.target)

  //this below code will only run when atleast two cards are chosen, so will happen when selectedCards.length is 2,4,6,8,10
  if (selectedCards.length % 2 == 0) {

    //make sure user cant choose a third card
    canClick = false;

    //if last two cards have same color we keep them faced up and remove the event listener on those cards
    if (selectedCards[selectedCards.length - 1].className === selectedCards[selectedCards.length - 2].className) {
      console.log("match");
      selectedCards[selectedCards.length - 1].removeEventListener("click", handleCardClick);
      selectedCards[selectedCards.length - 2].removeEventListener("click", handleCardClick);

      canClick = true;
    } else {
      //if the last two cards do not match then we remove them from our array that keeps track of cards flipped
      setTimeout(function () {

        const removedCard1 = selectedCards.pop(selectedCards[selectedCards.length - 1]);
        const removedCard2 = selectedCards.pop(selectedCards[selectedCards.length - 2]);

        console.log(selectedCards)

        removedCard1.style.backgroundColor = "";
        removedCard2.style.backgroundColor = "";

        canClick = true;

      }, 1000);
    }
  }

  //this checks if every card is flipped then we alert game over - our array should contain all cards now 
  if (selectedCards.length === COLORS.length) alert("GAME OVER")
}

// when the DOM loads
createDivsForColors(shuffledColors);
