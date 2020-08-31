const { Block } = require("../block");
const { Blockchain } = require("../blockchain");

describe("Block", () => {
    let data, lastBlock, block;
    beforeEach(() => {
        data = [1, 2, 3];
        lastBlock = Block.genesis();
        block = Block.mineBlockFunction(lastBlock, data);
    })
    it("sets the `data` to match the input", () => {
        expect(block.data).toEqual(data);
    })
    it("sets the lastHash to match the hash of the last block", () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    })
    it("checks of isBlockValid function working", () => {
        const checkChain = new Blockchain([]);
        const testData = [12, 13];
        checkChain.addBlock(testData);
        expect(checkChain.chain[1].data).toEqual(testData);
    })

})

export { }