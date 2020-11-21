module.exports = class {
    constructor(number, color, id) {
        if (number == "joker") {
            this.color = "joker";
            this.number = "joker";
            this.id = color;
        } else {
            this.number = number; //A - 1, J - 11, Q - 12, K - 13
            this.color = color;
            this.id = id;
        }

    }
    getName() {
        if (this.number == "joker") {
            return "Joker, ID: " + this.id;
        } else {
            return numberToName(this.number) + " of " + this.color + ", ID: " + this.id;
        }
    }
}

function numberToName(n) {
    switch (n) {
        case 1:
            return "Ace";
        case 2:
            return "Two";
        case 3:
            return "Three";
        case 4:
            return "Four";
        case 5:
            return "Five";
        case 6:
            return "Six";
        case 7:
            return "Seven";
        case 8:
            return "Eigth";
        case 9:
            return "Nine";
        case 10:
            return "Ten";
        case 11:
            return "Jack";
        case 12:
            return "Queen";
        case 13:
            return "King";
        case "joker":
            return n;
    }
}