const { ChainUtil } = require("../chain-util"),
    chalk = require("chalk"),
    { blockchain } = require("../app/index"),
    log = console.log;

export class Transaction {
    public txid: string;
    public timeStamp: number;
    public UTXOStatus: true;   // intially making the output as UTXO and when it is refrenced UTXO = false
    public inputs = [];
    public outputs = [];
    private UTXO: any[];
    constructor(id: string) {
        this.txid = ChainUtil.id();
        this.timeStamp = Date.now();
    }
    newTransaction(senderDetials: any, amount: number) {   // makes new transaction 
        // STEP 1 find all the UTXOs that the sender can unlock 
        blockchain.chain.forEach((eachBlock: any) => {
            if (eachBlock.outputs[0].UTXO === true) {
                // unlocking the UTXOs, the ones to get unlocked belong to the sender
                // 1) hash of public key should match the public key present in locking script
                // 2) digital signature must be correct
                if (1) { // not unlocking right now
                    // the transaction is valid UTXO for the payee
                    // currently there is only one transaction per block 
                    this.inputs.push({
                        txid: eachBlock.outputs[0].txid,
                        amount: amount,
                    })
                    this.outputs.push({
                        amount: amount,
                        address: "test" // hashed address of the receiver
                    }, {
                        amount: eachBlock.outpus[0].amount - amount,
                        adress: "test" // hashed address of the sender to receive the rest amount 
                    }
                    )
                }
            }
        })
    }

    // STEP_1 find all UTXOs, choose which one should go in input array, put them in the inputs array
    // STEP_2 make the output array 
    // STEP_3 add this transaction object to the block and mine the block

    // STEP_1 implementation
    // STEP_1 A) find all UTXOs
    findUTXO() {
        blockchain.chain.forEach((eachBlock: any) => {
            if (eachBlock.outputs[0].UTXOStatus === true) {
                if (1) {   // if the unlocking script works against the locking script, include the UTXO in the UTXO array
                    this.UTXO.push(eachBlock.outputs[0]);
                }
            }
        })
    }
    // STEP_1 B) choose which ones should go in the input array
    sortUTXO() {
        // sorting the elements of UTXO array using amount, largest amount element comes first
        for (let i = 0; i < this.UTXO.length; i++) {
            for (let j = 0; j < this.UTXO.length - i; j++) {
                if (this.UTXO[j + 1].amount > this.UTXO[j].amount) {
                    let temp = this.UTXO[j + 1];
                    this.UTXO[j + 1] = this.UTXO[j];
                    this.UTXO[j] = temp;
                }
            }
        }
        return this.UTXO;
    }
    // STEp_1 C) put the selected inputs in an array
    findInputUTXO(transactionAmount: number) {  // transactionAount is the amount whcih has to be transffered
        let tempArray: any[];
        tempArray.length = 0;
        let totalAmount: number;
        this.UTXO.forEach((eachUTXO) => {
            totalAmount += eachUTXO.amount;
        })
        if (totalAmount > transactionAmount) {
            return false;
        }
        totalAmount = 0;
        let startPoint: number;
        for (let i = 0; i < this.UTXO.length; i++) {

        }

    }
}




// what does a transaction have 
// 1) id number - uuid in util
// 2) input --> previous UTXOs with an unlocking script
// 3) ouptput would be an array which contains who gets what amount with a locking script
