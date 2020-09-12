const express = require("express"),
    app = express(),
    cors = require("cors"),
    chalk = require("chalk"),
    { Block } = require("../block"),
    bodyParser = require("body-parser"),
    { P2pserver } = require("./p2p-server"),
    { Blockchain } = require("../blockchain");

const PORT = process.env.HTTP_PORT || 3001;
const log = console.log;
var corsOptions = {
    origin: 'http:localhost:2001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.listen(PORT, () => {
    log(chalk.blueBright.bold.bgWhite(`HTTP server started listening at ${PORT}`));
})

app.use(bodyParser.json({ extended: true }));

const blockchain = new Blockchain([]); // object blockchain currently has only gensis block

const p2pserver = new P2pserver(blockchain);
p2pserver.listen();

// sends the existing blockchain array, which consists the block objects, to the new user
app.get("/chain", cors(corsOptions), (req, res) => {
    res.json(blockchain);
});

// receives transaction data to be added to the current chain
app.post("/mine", (req, res) => {
    const dataArray = [];
    dataArray.push(req.body.tsxn);
    blockchain.addBlock(dataArray);
    log(chalk.red.bold.bgWhite("New Block Mined"));
    log(chalk.red.bold.bgWhite("Latest State of Chain"));
    // log(chalk.blueBright.bgWhite(blockchain.chain[blockchain.chain.length - 1]));
    log(blockchain.chain)
    p2pserver.syncChain();
    res.redirect("/chain");
})

export { blockchain }



