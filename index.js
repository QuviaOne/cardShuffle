const fs = require('fs')
const child_process = require('child_process');
// var deck = new Deck(0);
// deck.classicalShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.classicalShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.classicalShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.classicalShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// var deck = new Deck(0);
// deck.riffleShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.riffleShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.riffleShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// deck.riffleShuffle(1);
// console.log(deck.randomnessCheck());
// deck.logNames();
// console.log(deck.cards.length);

var childs = [];
var gFiles = [];
fs.readdir("./childs/", (err, files) => {
    gFiles = files;
    for (var i = 0; i < files.length; i++) {
        childs[i] = (child_process.spawn("node", ["./childs/" + files[i]]));
        childs[i].stdout.on("data", data => {
            console.log(gFiles[i] + ": " + data);
        });
        childs[i].stderr.on("data", data => {
            console.warn(gFiles[i] + ": " + data);
        });
        childs[i].on("close", data => {
            console.log(gFiles[i] + " ended with code: " + data);
        });
    }
})
// http.createServer((req, res) => {
//     switch (req.method) {
//         case "GET": {
//             res.writeHead(200, "application/json");
//             res.write(JSON.stringify({
//                 deck: deck.getIds(),
//                 randomness: deck.randomnessCheck()
//             }));
//             res.end();
//         }
//         break;
//     default: {
//         res.writeHead(404);
//         res.end();
//     }
//     }

// }).listen(223);