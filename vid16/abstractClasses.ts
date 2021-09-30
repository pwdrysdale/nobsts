// abstract classes cannot be instantiated
// used to ensure that derived classes are up to scratch
abstract class StreetFighter {
    constructor() {}
    move(): void {}
    fight(): void {
        console.log(
            `${this.getName()} attacks with ${this.getSpecialAttack()}`
        );
    }

    abstract getSpecialAttack(): string;
    abstract getName(): string;
}

// not going to fly - an abstract class
// const ryu = new StreetFighter()

class Ryu extends StreetFighter {
    getSpecialAttack(): string {
        return "Hadoken";
    }

    getName(): string {
        return "Ryu";
    }
}

class ChunLi extends StreetFighter {
    getSpecialAttack(): string {
        return "Lightning Kick";
    }

    getName(): string {
        return "Chun-Li";
    }
}

const ryu: Ryu = new Ryu();
const chunLi: ChunLi = new ChunLi();

console.log(ryu.getSpecialAttack());
ryu.fight();
chunLi.fight();
