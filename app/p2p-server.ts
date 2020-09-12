import { json } from "body-parser";

const webSockets = require("ws");
const chalk = require("chalk");
const log = console.log;
const P2P_PORT = process.env.P2P_PORT || 6001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : []; // this array will store the
const Blockchain = require("../blockchain");
// the port numbers that we want to connect in the start
// environment variables seperated by commas are used stored in PEERS array if the terminal input exists

export class P2pserver {
    sockets: number[]; //stores socket object of currently coonected nodes
    constructor(public blockchain: typeof Blockchain) {
        this.sockets = [];
    }

    listen() {
        const server = new webSockets.Server({ port: P2P_PORT }); // created server
        server.on("connection", socket => this.connectionSocket(socket));
        // this event is emited when the handshake is completed
        // when a new connection is made to the server, call connectionSocket function
        // i.e. store the socke object of new connection in the sockets array
        this.connectToPeers();
        // conncect to peers whose port numbers are already stored in the peers array
        log(chalk.blueBright.bold.bgWhite(`Listening to peers on port ${P2P_PORT}`));
    }
    messageHandler(socket) {
        socket.on("message", (message) => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data.chain)
            log(this.blockchain.chain)

        })
    }
    connectionSocket(socket) {
        // simply pushes the socket object into the sockets array
        this.sockets.push(socket);
        log(chalk.redBright.bold.bgWhite("Socket Connected and Added to the Array"));
        // register a message event listener to every socket
        this.messageHandler(socket);
    }
    connectToPeers() {
        // function which conncect to peers whose port numbers are already stored in the peers array
        peers.forEach(peer => {
            const socket = new webSockets(peer);
            socket.on("open", () => this.connectionSocket(socket))
            // emitted when the connection is established
        })
    }
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain));
    }
    syncChain() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        })
    }
}

// what is the difference between open and connection events

export { }