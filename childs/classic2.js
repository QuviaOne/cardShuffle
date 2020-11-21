// const Deck = require('../deck.js');
// var path = "./stat/8744444/classic/run";
// const fs = require('fs');
// for (let j = 1; j < 8744444; j+=2) {
//     let saveR = 0;
//     let str = "";
//     let deck = new Deck(0);
//     for (let i = 0; saveR != 1; i++) {
//         // deck.classicalShuffle(10000000);
//         deck.classicalShuffle(1);
//         saveR = deck.fullRandomnessCheck();
//         str += saveR + "\n";
//     }
//     fs.appendFileSync(path + j + ".txt", str);
//     if (j % 100 == 1) console.log(j+ "(classic 2)");
// }