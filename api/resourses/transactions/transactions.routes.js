const express = require("express");

var { transaction } = require('../../../database/models');

const transactionsRouter = express.Router()


// show all transactions
transactionsRouter.get('/', (req, res) => {
    transaction.findAll()
        .then(transaction => {
            //res.send(transaction)

            res.json({
                meta: {
                    status: 200,
                    numberOfTransactions: transaction.length,
                    currentBalance: transaction.reduce((total, product) =>
                        (product.type == 1 ? (total += product.amount) : (total -= product.amount)), 0),
                    types: { "1": "income", "2": "outcome" },
                    url: "/transactions",
                },
                data: transaction,
            });

        })
        .catch(error => {
            console.log(error);
        })
})

// send a new transaction
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

// get an specific transaction
transactionsRouter.get('/:id', (req, res) => {

    transaction.findByPk(req.params.id)
        .then((result) => res.json(result))
})

// update a transaction
transactionsRouter.put('/:id', (req, res) => {
    let updatedTransaction = req.body

    transaction.update(updatedTransaction,
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.redirect('/transactions/' + req.params.id))
})

// delete a transaction
transactionsRouter.delete('/:id', (req, res) => {
    transaction.destroy(
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.redirect('/transactions/'))
})

module.exports = transactionsRouter