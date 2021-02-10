const express = require("express");
const _ = require('underscore')
const transactions = require('../../../database').transactions

const transactionsRouter = express.Router()

transactionsRouter.get('/', (req, res) => {
    res.json(transactions)
})

transactionsRouter.post('/', (req, res) => {
    let newTransaction = req.body

    if (!newTransaction.amount) {
        res.status(400).send("missing data")
        return
    }
    newTransaction.id = Math.floor(Math.random() * 1000)
    transactions.push(newTransaction)
    res.status(201).json(newTransaction)
})


transactionsRouter.get('/:id', (req, res) => {
    for (let transaction of transactions) {
        if (transaction.id = req.params.id) {
            res.json(transaction)
            return
        }
    }
    res.status(404).send(`error`)
})


transactionsRouter.put('/:id', (req, res) => {
    let id = req.params.id
    let replacedValue = req.body
    if (!replacedValue.amount) {
        res.status(400).send("missing data")
        return
    }
    let index = _.findIndex(transactions, transaction => transaction.id == id)

    if (index != -1) {
        replacedValue.id = id
        transactions[index] = replacedValue
        res.status(200).json(replacedValue)
    } else {
        res.status(404).send("That transaction doesn't match")
    }
})


transactionsRouter.delete('/:id', (req, res) => {
    let indexToDelete = _.findIndex(transactions, transaction => transaction.id == req.params.id)

    if (indexToDelete === -1) {
        res.status(404).send("Can't delete")
        return
    }
    let deleted = transactions.splice(indexToDelete, 1)
    res.json(deleted)
})

module.exports = transactionsRouter