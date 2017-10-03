var fs = require('fs');

function storeNormalFlashcard(front,back) {
    // read the file - if first entry do not add the pre-terminator
    var storeThisText = '~/~' + front + "~;~" + back;
    var checkArrayLength = getNormalFlashcards();
    if (checkArrayLength[0].length === 0) {
        storeThisText = front + "~;~" + back
    } 

    fs.appendFile("normalFlashcards.txt", storeThisText,  function(error, data) {
        if (error) {
          return console.log(error);
        }
  });
}

storeNormalFlashcard('front', 'back')

function getNormalFlashcards() {
    var returnArray = readFile('normalFlashcards.txt');
    return returnArray;
}

function storeClozeFlashcard(wholeSentence, removeThisPart) {
    // read the file - if first entry do not add the pre-terminator
    var storeThisText = '~/~' + wholeSentence + "~;~" + removeThisPart;
    var checkArrayLength = getClozeFlashcards();
    if (checkArrayLength[0].length === 0) {
        storeThisText = wholeSentence + "~;~" + removeThisPart
    } 

    fs.appendFile("clozeFlashcards.txt", storeThisText,  function(error, data) {
        if (error) {
          return console.log(error);
        }
    });
}

function getClozeFlashcards() {
    var returnArray = readFile('clozeFlashcards.txt');
    return returnArray;
}

function readFile(fileName) {
    var data = fs.readFileSync(fileName, "utf8");
    var dataArray = data.split('~/~');
    return dataArray;
}

module.exports = {
    storeNormalFlashcard: storeNormalFlashcard,
    getNormalFlashcards: getNormalFlashcards,
    storeClozeFlashcard: storeClozeFlashcard,
    getClozeFlashcards:  getClozeFlashcards
}