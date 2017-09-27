// General use - cleaner user input
var inquirer = require('inquirer');

function Flashcard (front, back) {
    this.front = front;
    this.back = back;
}


function ClozeFlashcard (wholeSentence, removeThisPart) {
    this.wholeSentence = wholeSentence;
    this.removeThisPart = removeThisPart;
    this.partial = wholeSentence.replace(removeThisPart, "_____");
}

var thisFlashcard = new Flashcard("Who am I?", "Kyle");

console.log(thisFlashcard);

var thisClozeCard = new ClozeFlashcard("My name is Kyle", "Kyle");

console.log(thisClozeCard);
