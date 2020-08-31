const { Block } = require("./block");

export class Blockchain {
    constructor(public chain: any[]) {
        this.chain[0] = Block.genesis();
    }
    addBlock(data: number[]) {
        const newBlock = Block.mineBlockFunction(this.chain[this.chain.length - 1], data);
        this.chain.push(newBlock);
    }

    isChainValid(chain: any[]) { // this chain is the incoming chain and different from of our own chain 
        // I don't see the point of making this function a method, it could have been made a static function
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            if (chain[i - 1].hash !== chain[i].lastHash || (Block.isBlockValid(chain[i]))) {
                return false;
            }
        }
        return true;
    }
    replaceChain(newChain: any[]) {
        if (newChain.length <= this.chain.length) {
            console.log("Incoming chain is not longer than the current chain");
            return;
        } else if (!this.isChainValid(newChain)) {
            console.log("Incoming chain is invalid");
            return;
        }
        console.log("Replacing the existing chain with the incoming chain");
        this.chain = newChain;
        console.log("Successfully replaced the existing chain");
    }
}