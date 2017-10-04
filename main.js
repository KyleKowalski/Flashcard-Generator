(function() { // TODO:  more research on IIFE

    var flashcard = require('./flashcard.js');
    var fileSystem = require('./fileSystem.js');

    var normalStoredFlashcardArray = fileSystem.getFlashcardFile('normalFlashcards.txt');
    var normalFlashcardArray = [];
    createActualNormalFlashcards();
    var clozeStoredFlashcardArray = fileSystem.getFlashcardFile('clozeFlashcards.txt');
    var clozeFlashcardArray = [];
    createActualClozeFlashcards();

    // examples of creating normal flashcards
    // createAndStoreNormalFlashcard('',''); // Fails - no front card
    // createAndStoreNormalFlashcard('1',''); // Fails - no back card
    // createAndStoreNormalFlashcard('','1'); // Fails - no front card
    // createAndStoreNormalFlashcard('What year is it (when this was written)?','2017'); // Success
    // createAndStoreNormalFlashcard('What year is it (when this was written)?','2017'); // Fails - duplicate 

    console.log(normalFlashcardArray);

    // examples of creating cloze cards
    // createAndStoreClozeFlashcard('',''); // Fails - no sentence
    // createAndStoreClozeFlashcard('1',''); // Fails - no item to remove
    // createAndStoreClozeFlashcard('','1'); // Fails - no sentence
    // createAndStoreClozeFlashcard('This card was created in the year 2017','2016'); // Fails - item not contained in sentence
    // createAndStoreClozeFlashcard('This card was created in the year 2017','2017'); // Success
    // createAndStoreClozeFlashcard('This card was created in the year 2017','2017'); // Fails - duplicate

    console.log(clozeFlashcardArray);

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
            console.log(`Creating card using front: '${frontOfCard}' and back: '${backOfCard}'.`)
            fileSystem.storeFlashcard(frontOfCard, backOfCard, 'normalFlashcards.txt');
            normalStoredFlashcardArray = fileSystem.getFlashcardFile('normalFlashcards.txt');
            createActualNormalFlashcards();
        }
    }

    function createActualNormalFlashcards() {
        normalFlashcardArray = [];
        for (var i = 0; i < normalStoredFlashcardArray.length; i++) {
            var cardArray = normalStoredFlashcardArray[i].split('~;~');
            normalFlashcardArray[i] = new flashcard.NormalFlashcard(cardArray[0],cardArray[1]);
        }
    }

    function createAndStoreClozeFlashcard(wholeSentence, removeThisPart) {
        if (wholeSentence === '') {
            console.log(`Sentence part was empty - please fill this out first`);
            return false;
        }
        else if (removeThisPart === '') {
            console.log(`Item to remove was empty - please fill this out first`);
            return false;
        }
        else if (wholeSentence.includes(removeThisPart)) {
            console.log(`Creating card using '${removeThisPart}' removed from '${wholeSentence}'.`)
            fileSystem.storeFlashcard(wholeSentence, removeThisPart, 'clozeFlashcards.txt');
            clozeStoredFlashcardArray = fileSystem.getFlashcardFile('clozeFlashcards.txt');
            createActualClozeFlashcards();
        }
        else {
            console.log(`It appears your sentence does not contain the part to remove - please try again`);
            return false;
        }
    }

    function createActualClozeFlashcards() {
        clozeFlashcardArray = [];
        for (var i = 0; i < clozeStoredFlashcardArray.length; i++) {
            var cardArray = clozeStoredFlashcardArray[i].split('~;~');
            clozeFlashcardArray[i] = new flashcard.ClozeFlashcard(cardArray[0],cardArray[1]); 
        }
    }
})();