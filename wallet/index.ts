import { throws } from "assert";
const { ChainUtil } = require("../chain-util");

class Walllet {
    public keyPair: any;
    public publicKey: string;
    public balance: number;
    constructor() {
        this.keyPair = ChainUtil.keyGen();
        this.publicKey = this.keyPair.getPublic().encode("hex");
        this.balance = 100;
    }

    toString() {
        return `Wallet Details
Public Key = ${this.publicKey}
Balance = ${this.balance}`
    }
    // sign function gives wallet the functionality of signing the transaction using private key
    sign(dataHash: any) {
        return this.keyPair.sign(dataHash);
    }
}