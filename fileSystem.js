var fs = require('fs');

function storeFlashcard(front,back, sourceFile) {
    // read the file - if first entry do not add the pre-terminator
    var storeThisText = '~/~' + front + '~;~' + back;
    var checkString = getFlashcardFile(sourceFile).toString();
    console.log(`Check array length: '${checkString}'`);
    if (checkString === '') {
        storeThisText = front + '~;~' + back
    } 
    var saveThis = checkToSeeIfCardAlreadyExists(front, back, sourceFile)
    if (saveThis) {
        fs.appendFile(sourceFile, storeThisText,  function(error, data) {
            if (error) {
                return console.log(error);
            }
        });
    }
}

// storeFlashcard('front', 'back', 'normalFlashcards.txt');
// storeFlashcard('front', 'back', 'normalFlashcards.txt');

function getFlashcardFile(fileName) {
    var data = fs.readFileSync(fileName, 'utf8');
    var dataArray = data.split('~/~');
    return dataArray;
}

function checkToSeeIfCardAlreadyExists(firstPart, secondPart, sourceFile) {
    var checkThisText = firstPart + '~;~' + secondPart;
    var fileText = getFlashcardFile(sourceFile);
    var returnThis = true;
    if (fileText.includes(checkThisText)) {
        console.log("This appears to be a duplicate - so we're not saving it.")
        returnThis = false;
    }
    return returnThis;
}

module.exports = {
    storeFlashcard: storeFlashcard,
    getFlashcardFile: getFlashcardFile
}