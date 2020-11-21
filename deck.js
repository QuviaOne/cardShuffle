const Card = require('./card.js');
const logB = function (base, of ) {
    return Math.log( of ) / Math.log(base);
}

module.exports = class {
    constructor(jokers) {
        this.jokers = jokers;
        this.cards = [];
        this.initiate();
    }
    initiate() {
        for (let i = 0; i < 13; i++) {
            this.cards.push(new Card(i + 1, "diamonds", i + 1));
        }
        for (let i = 0; i < 13; i++) {
            this.cards.push(new Card(i + 1, "hearts", i + 14));
        }
        for (let i = 0; i < 13; i++) {
            this.cards.push(new Card(i + 1, "spades", i + 27));
        }
        for (let i = 0; i < 13; i++) {
            this.cards.push(new Card(i + 1, "clubs", i + 40));
        }
        for (let i = 0; i < this.jokers; i++) {
            this.cards.push(new Card("joker", i + 53));
        }
    }
    getNames() {
        var rv = [];
        for (var i = 0; i < this.cards.length; i++) {
            try {
                rv.push(this.cards[i].getName());
            } catch (e) {
                console.log(this.cards[i]);
            }
        }
        return rv;
    }

    logNames() {
        var val = this.getNames();
        for (var i = 0; i < this.cards.length; i++) {
            console.log(val[i]);
        }
    }

    getDerivative() {
        var r = [];

        for (var i = 0; i < this.cards.length; i++) {
            var diff = Math.abs(this.cards[i].id - this.cards[(i + 1) % this.cards.length].id);
            r[i] = diff;
        }

        return (r);
    }
    sumKindOfMiddleEastStyleShuffle(rounds) {
        for (var i = 0; i < rounds; i++) {
            var deck2 = [];
            while (this.cards.length > 0) {
                var take = weightedChance([2, 0.3, 1, 1, 1, 3, 5, 3, 1, 1, 0, 1]);
                if (take > this.cards.length) take = this.cards.length;
                var taken = this.cards.splice(this.cards.length - take, take);
                for (var j = 0; j < taken.length; j++) deck2.push(taken[j]);
            }
            this.cards = deck2;
        }
        //console.log("Some Kind of Middle East Shuffle finished!");
    }
    
    classicalShuffle(rounds) {
        for (var i = 0; i < rounds; i++) {
            var take = weightedChance([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
            var takenArr = this.cards.splice(0, take);
            while (takenArr.length > 0) {
                var rnd = weightedChance([1, 2, 4, 4, 2, 1]);
                if (rnd > takenArr.length) continue;
                else {
                    var a = takenArr.splice(takenArr.length - rnd, rnd)
                    for (var j = 0; j < a.length; j++) {
                        this.cards.push(a[j]);
                    }
                }
            }
        }
        //console.log("Classical shuffle finished!");
    }
    riffleShuffle(rounds) {
        for (var i = 0; i < rounds; i++) {
            var take = weightedChance([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1]);
            var takenArr = this.cards.splice(0, take);
            var secondArr = this.cards;
            takenArr = takenArr.reverse();
            secondArr = secondArr.reverse();
            this.cards = [];
            while (takenArr.length > 0 && secondArr.length > 0) {
                var ran1 = weightedChance([1, 2, 2, 1]);
                var ran2 = weightedChance([1, 2, 2, 1]);
                var tk1 = takenArr.splice(0, ran1);
                var tk2 = secondArr.splice(0, ran2);
                for (var j = 0; j < tk1.length; j++) {
                    this.cards.push(tk1[j]);
                }
                for (j = 0; j < tk2.length; j++) {
                    this.cards.push(tk2[j]);
                }
            }
            if (takenArr.length > 0) {
                for (j = 0; j < takenArr.length; j++) {
                    this.cards.push(takenArr[j]);
                }
            }
            if (secondArr.length > 0) {
                for (j = 0; j < secondArr.length; j++) {
                    this.cards.push(secondArr[j]);
                }
            }
            this.cards = this.cards.reverse();
        }
        //console.log("Riffle shuffle finished!");
    }
    randomnessCheck(rv, derNum) {
        var der = [];

        switch (derNum) {
            case 1: {
                der = this.getDerivative(this.cards);
            }
            break;

        case 2: {
            der = this.getDerivative(this.getDerivative(this.cards));
        }
        break;

        case 3: {
            der = this.getDerivative(this.getDerivative(this.getDerivative(this.cards)));
        }
        break;

        }

        var inRow = 0;
        var set = [];
        for (var i = 0; i < der.length; i++) {
            if (der[i] == 1) {
                inRow++;
            } else {
                if (set[inRow] === undefined) set[inRow] = 0;
                set[inRow]++;
                inRow = 0;
            }

        }
        for (var i = 0; i < set.length; i++) {
            if (typeof set[i] != typeof 1) set[i] = 0;
            rv *= Math.pow(m(i), set[i]);
        }
        return rv;
        //der: der,
        //set: set,
        //rv: 


        function m(x) {
            return Math.pow(logB(52, (52 - x)), (x));
        }
    }

    fullRandomnessCheck() {
        var a = 1;

        var rv = this.randomnessCheck(this.randomnessCheck(this.randomnessCheck(a, 1), 2), 3);

        return (rv);
    }

    getIds() {
        var rv = [];
        for (var i = 0; i < this.cards.length; i++) {
            rv[i] = this.cards[i].id;
        }
        return rv;
    }
}

function weightedChance(arr) {
    var sum = sumArr(arr);
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr[i] = arr[i] / sum;
    }
    ran = Math.random();
    i = 0;
    while (sumTo(newArr, i) < ran) {
        i++;
    }
    i--;
    return i + 1;
}

function sumTo(arr, to) {
    var rv = 0;
    for (var i = 0; i < to; i++) {
        rv += arr[i];
    }
    return rv;
}

function sumArr(arr) {
    var rv = 0;
    for (var i = 0; i < arr.length; i++) {
        rv += arr[i];
    }
    return rv;
}