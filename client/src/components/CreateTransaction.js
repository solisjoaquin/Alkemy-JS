import { useState } from 'react'
import axios from 'axios'

const CreateTransaction = () => {

    const [formValues, setFormValues] = useState({
        concept: "",
        amount: 0,
        type: 0,
        date: ""
    })

    let [typeButton, setTypeButton] = useState(null)

    const handleSubmit = (e) => {
        alert(`New transacction concept: ${formValues.concept} amount: ${formValues.amount}`);

        e.preventDefault();

        /*         axios.post(`http://localhost:5000/transactions`, { formValues })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
         */
        axios.post('http://localhost:5000/transactions', {
            concept: formValues.concept,
            amount: formValues.amount,
            date: formValues.date,
            type: formValues.type
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });

    };

    const handleInputChange = (e) => {
        e.preventDefault()
        setFormValues({ ...formValues, type: typeButton, [e.target.name]: e.target.value })
        console.log(formValues)
    }

    return (
        <div>

            <div className="mt-5">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">


                                    <div className="col-span-6 sm:col-span-4">
                                        <label for="concept" className="block text-sm font-medium text-gray-700">Concept</label>
                                        <input onChange={handleInputChange} type="text" name="concept" id="concept" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder="Shop" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label for="type" className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                        <button onClick={() => setTypeButton(1)} type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Income
                                        </button>
                                        <button onClick={() => setTypeButton(2)} type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Expenditure
                                        </button>

                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label for="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input onChange={handleInputChange} type="text" name="amount" id="amount" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder="3000" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label for="date" className="block text-sm font-medium text-gray-700">Date</label>
                                        <input onChange={handleInputChange} type="date" name="date" id="date" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" />
                                    </div>


                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

                <div className="m-4">
                    <div>
                        Concept:
                {formValues.concept}
                    </div>
                    <div>
                        Amount:
                {formValues.amount}
                    </div>
                    <div>
                        Date:
                {formValues.date}
                    </div>
                    <div>
                        Concept:
                {formValues.type}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default CreateTransaction;  