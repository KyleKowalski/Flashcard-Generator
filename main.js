(function() { // TODO:  more research on IIFE

    var flashcard = require('./flashcard.js');
    var fileSystem = require('./fileSystem.js');

    var normalStoredFlashcardArray = fileSystem.getNormalFlashcards();
    var normalFlashcardArray = [];
    createActualNormalFlashcards();
    var clozeStoredFlashcardArray = fileSystem.getClozeFlashcards();
    var clozeFlashcardArray = [];
    createActualClozeFlashcards();

    // examples of creating normal flashcards
    // createAndStoreNormalFlashcard('','');
    // createAndStoreNormalFlashcard('1','');
    // createAndStoreNormalFlashcard('','1');
    // createAndStoreNormalFlashcard('What year is it (when this was written)?','2017');

    console.log(normalFlashcardArray);

    // examples of creating cloze cards
    // createAndStoreClozeFlashcard('','');
    // createAndStoreClozeFlashcard('1','');
    // createAndStoreClozeFlashcard('','1');
    // createAndStoreClozeFlashcard('This card was created in the year 2017','2016');
    // createAndStoreClozeFlashcard('This card was created in the year 2017','2017');

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
            fileSystem.storeNormalFlashcard(frontOfCard, backOfCard);
            normalStoredFlashcardArray = fileSystem.getNormalFlashcards;
            createActualNormalFlashcards();
        }
    }

    function createActualNormalFlashcards() {
        normalFlashcardArray = [];
        for (var i = 0; i < normalStoredFlashcardArray.length; i++) {
            var cardArray = normalStoredFlashcardArray[i].split(';');
            normalFlashcardArray[i] = new flashcard.NormalFlashcard(cardArray[0],cardArray[1]);
        }
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
            var cardArray = clozeStoredFlashcardArray[i].split(';');
            clozeFlashcardArray[i] = new flashcard.ClozeFlashcard(cardArray[0],cardArray[1]); 
        }
    }

})();