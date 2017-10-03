var fs = require('fs');

function storeNormalFlashcard(front,back) {
    // TODO read the file - if first entry do not add the pre-terminator
    fs.appendFile("normalFlashcards.txt",'~/~' + front + "~;~" + back ,  function(error, data) {
        if (error) {
          return console.log(error);
        }
  });
}

function getNormalFlashcards() {
    var returnArray = readFile('normalFlashcards.txt');
    return returnArray;
}

function storeClozeFlashcard(wholeSentence, removeThisPart) {
    // TODO read the file - if first entry do not add the pre-terminator
    fs.appendFile("clozeFlashcards.txt",'~/~' + wholeSentence + "~;~" + removeThisPart,  function(error, data) {
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