const { Blockchain } = require("../blockchain");
const { Block } = require("../block");

describe("Blockchain", () => {
    let blockchain
    beforeEach(() => {
        blockchain = new Blockchain([]);
    })
    it("intiates the block with genesis block", () => {
        expect(JSON.stringify(blockchain.chain[0])).toEqual(JSON.stringify(Block.genesis()));
    })
    it("checks if the data added is the data present in the latest block", () => {
        const data = [4, 5];
        blockchain.addBlock(data);
        expect(blockchain.chain[1].data).toEqual(data);
    })
    it("validates incoming chain", () => {
        const newChain = new Blockchain([]);
        newChain.addBlock([10, 11]);
        expect(newChain.isChainValid(newChain.chain)).toEqual(true)
    })
    it("invalidated wrong incoming chain", () => {
        const newChain = new Blockchain([]);
        newChain.addBlock([10, 11]);
        newChain.chain[1].lastHash = "123412adsfdfjh"
        expect(newChain.isChainValid(newChain.chain)).toEqual(false)
    })
    it("invalidates chain with wrong genesis block", () => {
        const newChain = new Blockchain([]);
        newChain.addBlock([10, 11]);
        newChain.chain[0].hash = "sefasdf";
        expect(newChain.isChainValid(newChain.chain)).toEqual(false)
    })
})

export { }