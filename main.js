(function() { // TODO:  more research on IIFE

    var flashcard = require('./flashcard.js');
    var fileSystem = require('./fileSystem.js');
    var inquirer = require('inquirer');

    var normalStoredFlashcardArray = fileSystem.getFlashcardFile('normalFlashcards.txt');
    var normalFlashcardArray = [];
    createActualNormalFlashcards();
    var clozeStoredFlashcardArray = fileSystem.getFlashcardFile('clozeFlashcards.txt');
    var clozeFlashcardArray = [];
    createActualClozeFlashcards();

    mainPrompt();
    
    function mainPrompt() {
        inquirer.prompt([
            {
                type: "list",
                message: "\n\n=====\nWelcome to the Flashcard Generator - please make a selection:\n=====",
                choices: ["Normal Flashcard", "Cloze Flashcard", "List Normal Flashcards Array", "List Cloze Flashcards Array", "Quit"],
                name: "mainPromptChoice"
            }
        ]).then(function(response) {
            if (response.mainPromptChoice === 'Normal Flashcard') {
                createFlashcard('normal');
            }
            else if (response.mainPromptChoice === 'Cloze Flashcard') {
                createFlashcard('cloze');
            }
            else if (response.mainPromptChoice === 'List Normal Flashcards Array') {
                console.log(normalFlashcardArray);
                mainPrompt();
            }
            else if (response.mainPromptChoice === 'List Cloze Flashcards Array') {
                console.log(clozeFlashcardArray);
                mainPrompt();
            }
            else if (response.mainPromptChoice === 'Quit') {
                quit();
            }
            else {
                console.log("We've escaped the main prompt choice somehow - log an error")
            }
        })
    }

    function createFlashcard(cardType) {
        var message1 = 'Please enter your entire sentence for a cloze flashcard:';
        var message2 = 'Please enter the value to remove from said sentence (exact match is required):';
        if (cardType === 'normal') {
            message1 = 'Please enter the question for the front of the card (ie. Who was the first president of the United States?)';
            message2 = 'Please enter the correct answer for said question.';
        }
        inquirer.prompt([
            {
                type: 'input',
                message: message1,
                name: 'firstCardPart'
            },
            {
                type: 'input',
                message: message2,
                name: 'secondCardPart'
            }
        ]).then(function(response){
            if (cardType === 'normal') {
                createAndStoreNormalFlashcard(response.firstCardPart, response.secondCardPart);
            }
            else {
                createAndStoreClozeFlashcard(response.firstCardPart, response.secondCardPart);
            }
            mainPrompt();
        });
    }

    function quit() {
        console.log("\n=====\nHave a great day!\n\nGood Bye!\n=====");
    }

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