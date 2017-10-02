var flashcard = require('./flashcard.js');
var fileSystem = require('./fileSystem.js');

var normalStoredFlashcardArray = fileSystem.getNormalFlashcards();
var normalFlashcardArray = [];
var clozeStoredFlashcardArray = fileSystem.getClozeFlashcards();
var clozeFlashcardArray = [];

console.log(normalStoredFlashcardArray);
// console.log(clozeStoredFlashcardArray);

function createAndStoreNormalFlashcard(frontOfCard, backOfCard) {
    if (frontOfCard === '') {
        console.log(`Front of card was empty - please fill this out first`);
        return false;
    }
    else if (backOfCard === '') {
        console.log(`Back of card was empty - please fill this out first`);
        return false;
    }
    else {
        fileSystem.storeNormalFlashcard(frontOfCard, backOfCard);
        normalStoredFlashcardArray = fileSystem.getNormalFlashcards;
    }
}

function createActualNormalFlashcards() {

}

function createAndStoreClozeFlashcard(wholeSentence, removeThisPart) {
    if (wholeSentence === '') {
        console.log(`Front of card was empty - please fill this out first`);
        return false;
    }
    else if (removeThisPart === '') {
        console.log(`Back of card was empty - please fill this out first`);
        return false;
    }
    else if (wholeSentence.includes(removeThisPart)) {
        fileSystem.storeClozeFlashcard(wholeSentence, removeThisPart);
        clozeStoredFlashcardArray = fileSystem.getClozeFlashcards;
    }
    else {
        console.log(`It appears your sentence does not contain the part to remove - please try again`);
        return false;
    }
}

function createActualClozeFlashcards() {

}
