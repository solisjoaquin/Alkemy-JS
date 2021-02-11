const express = require("express");
const bodyParser = require("body-parser")
//const models = require('./database/models')
var { transaction } = require('./database/models');


const transactionsRouter = require('./api/recourses/transactions/transactions.routes')

const app = express()

app.use(bodyParser.json())

app.use('/transactions', transactionsRouter)

app.get('/db', (req, res) => {
    transaction.findAll()
        .then(transaction => {
            res.send(transaction)
        })
        .catch(error => {
            console.log(error);
        })
})

app.listen(3000, () => {
    console.log("escuchando en el puesto 3000")
})