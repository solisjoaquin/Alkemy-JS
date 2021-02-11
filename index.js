const express = require("express");
const bodyParser = require("body-parser")

const transactionsRouter = require('./api/recourses/transactions/transactions.routes')

const app = express()

app.use(bodyParser.json())

// all transactions will occur in this route
app.use('/transactions', transactionsRouter)

app.listen(5000, () => {
    console.log("escuchando en el puesto 3000")
})