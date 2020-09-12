const SHA256 = require('crypto-js/sha256');
export class Block {
    constructor(public blockNumber?: number, public timeStamp?: number, public lastHash?: string, public hash?: string, public nonce?: number, public difficulty?: number, public data?: number[], public ttm?: number) { }
    static genesis() { // DO not use arrow function else following error would come ---> 'this' cannot be referenced in a static property initializer
        // This error arises with ts when using arrow function, not with js
        return new this(0, 0, "-", "#", 0, 0, [], 0); // this refers to class 'Block' itself
    }
    toString = () => {
        return `=======Block details======
block number -> ${this.blockNumber},
timestamps ---> ${this.timeStamp}, 
last hash ----> ${this.lastHash}, 
difficulty ---> ${this.difficulty},
nonce --------> ${this.nonce}
hash ---------> ${this.hash},
data ---------> ${this.data},        
ttm ----------> ${this.ttm}`
        // this refers to objects(instances of the class Block)
    }
    static nonceFunction(timeStamp: number, lastHash: string, data: number[], difficulty: number) { // finds hash of the block and the nonce
        let nonce = 0;
        let hash: string;
        let mineStartTime = Date.now();
        do {
            hash = this.hashFunction(timeStamp, lastHash, data, nonce).toString();
            nonce++;
        } while (hash.substring(0, difficulty) != "0".repeat(difficulty));
        let ttm = Date.now() - mineStartTime;
        return { hash, nonce, ttm };
    }
    static hashFunction(timeStamp: number, lastHash: string, data: number[], nonce: number) {
        return SHA256(`${timeStamp}${lastHash}${data}${nonce}`)
    }
    static isBlockValid(block) {
        const { timeStamp, lastHash, data, hash, nonce } = block;
        if (Block.hashFunction(timeStamp, lastHash, data, nonce) === hash) {
            return true
        }
        return false;
    }
    static mineBlockFunction(lastBlock: any, data: number[]) {
        let blockNumber = lastBlock.blockNumber + 1;
        let timeStamp = Date.now();
        let lastHash = lastBlock.hash;
        let difficulty = 6;
        let { hash, nonce, ttm } = this.nonceFunction(timeStamp, lastHash, data, difficulty);
        return new this(blockNumber, timeStamp, lastHash, hash, nonce, difficulty, data, ttm / 1000); // this refers to the class 'Block' itself 
    }
}



// files are either modules(with own scope) or script(global scope) here export  {} is added to make this Block.ts a module
// so that Block becomes local state otherwise there would be an error in block.test.ts

export { }