

function NormalFlashcard (front, back) {
    this.front = front;
    this.back = back;
}


function ClozeFlashcard (wholeSentence, removeThisPart) {
    this.wholeSentence = wholeSentence;
    this.removeThisPart = removeThisPart;
    this.partial = wholeSentence.replace(removeThisPart, "_____");
}

module.exports = {
    NormalFlashcard: NormalFlashcard,
    ClozeFlashcard: ClozeFlashcard
}
