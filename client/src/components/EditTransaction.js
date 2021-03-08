import { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import axios from 'axios'

const EditTransaction = ({ transactions }) => {
    const { id } = useParams()

    let [formValues, setFormValues] = useState({
        concept: "",
        amount: 0,
        type: 0,
        date: ""
    })

    // delete transaction 
    let handleDeleteButton = event => {
        event.preventDefault();

        axios.delete(`http://localhost:5000/transactions/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    // send form with new values 
    let handleSubmit = event => {
        event.preventDefault()
        alert("Transaction updated")
        axios.put(`http://localhost:5000/transactions/${id}`, {
            concept: formValues.concept,
            amount: formValues.amount,
            date: formValues.date,
            type: transactions.type
        }).then(response => {
            console.log(response)
        })
    }

    // set values on formValues
    const handleInputChange = (e) => {
        e.preventDefault()
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div>


            {transactions.filter(transaction => transaction.id == id).map((transaction) =>
                <div className="mt-5">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-4">
                                            <label for="concept" className="block text-sm font-medium text-gray-700">Concept</label>
                                            <input onChange={handleInputChange} type="text" name="concept" id="concept" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder={`${transaction.concept}`} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label for="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                            <input onChange={handleInputChange} type="text" name="amount" id="amount" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder={`${transaction.amount}`} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label for="" className="block text-sm font-medium text-gray-700">Date</label>
                                            <input onChange={handleInputChange} type="date" name="date" id="date" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" />
                                        </div>


                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Update
                                    </button>
                                    <button onClick={handleDeleteButton} className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            )}
        </div>
    )
}

export default EditTransaction;