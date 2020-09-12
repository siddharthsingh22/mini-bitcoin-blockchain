const express = require("express"),
    axios = require("axios"),
    chalk = require("chalk"),
    app = express();

const TRANSACTION_PORT = process.env.TRANSACTION_PORT || 2001;
const log = console.log;

app.listen(TRANSACTION_PORT, () => {
    log(chalk.blueBright.bold.bgWhite(`READY TO SPAM 3002 from ${TRANSACTION_PORT} :)`))
})

let i = 0;
do {
    setTimeout(
        async () => {
            try {
                const result = await axios.post("http://localhost:3002/mine", {
                    "tsxn": i
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        , 30000)
} while (i++ < 15)

