const express = require("express"),
    app = express(),
    { Block } = require("../block"),
    bodyParser = require("body-parser"),
    { P2pserver } = require("./p2p-server"),
    { Blockchain } = require("../blockchain");

const PORT = process.env.HTTP_PORT || 3001;

app.listen(PORT, () => {
    console.log(`HTTP server started listening at ${PORT}`);
})

app.use(bodyParser.json({ extended: true }));

const blockchain = new Blockchain([]); // object blockchain currently has only gensis block

const p2pserver = new P2pserver(blockchain);
p2pserver.listen();

// sends the existing blockchain array, which consists the block objects, to the new user
app.get("/chain", (req, res) => {
    res.json(blockchain);
});

// receives transaction data to be added to the current chain
app.post("/mine", (req, res) => {
    const dataArray = [];
    dataArray.push(req.body.tsxn);
    blockchain.addBlock(dataArray);
    console.log(blockchain.chain);
    p2pserver.syncChain();
    res.redirect("/chain");
})




