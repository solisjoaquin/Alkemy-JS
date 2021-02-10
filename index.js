const express = require("express");
const bodyParser = require("body-parser")

const transactionsRouter = require('./api/recourses/transactions/transactions.routes')

const app = express()
app.use(bodyParser.json())

app.use('/', transactionsRouter)

app.listen(3000, () => {
    console.log("escuchando en el puesto 3000")
})