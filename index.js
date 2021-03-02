const express = require("express");
const bodyParser = require("body-parser")

const cors = require('cors');

const config = require('./config');

var app = express();

app.use(cors(
    config.application.cors.server
));

const transactionsRouter = require('./api/recourses/transactions/transactions.routes')


app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Go to /transactions"))

// all transactions will occur in this route
app.use('/transactions', transactionsRouter)

app.listen(5000, () => {
    console.log("escuchando en el puesto 5000")
})