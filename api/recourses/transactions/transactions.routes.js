const express = require("express");
const _ = require('underscore')
const transactions = require('../../../database').transactions

var { transaction } = require('../../../database/models');

const transactionsRouter = express.Router()

transactionsRouter.get('/', (req, res) => {
    transaction.findAll()
        .then(transaction => {
            res.send(transaction)
        })
        .catch(error => {
            console.log(error);
        })
})

transactionsRouter.post('/', (req, res) => {
    let newTransaction = req.body

    if (!newTransaction.amount || !newTransaction.type || !newTransaction.concept) {
        res.status(400).send("missing data")
        return
    }

    transaction.create(newTransaction)
        .then(newTransaction => {
            return res.redirect('/transactions/' + newTransaction.id)
        })

})


transactionsRouter.get('/:id', (req, res) => {

    transaction.findByPk(req.params.id)
        .then((result) => res.json(result))
})


transactionsRouter.put('/:id', (req, res) => {
    let updatedTransaction = req.body

    transaction.update(updatedTransaction,
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.redirect('/transactions/' + req.params.id))
})


transactionsRouter.delete('/:id', (req, res) => {
    transaction.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.redirect('/transactions/'))
})

module.exports = transactionsRouter