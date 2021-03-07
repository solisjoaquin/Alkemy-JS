import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

const EditTransaction = ({ transactions }) => {
    const { id } = useParams()
    const handleSubmit = (e) => {
        console.log()
    }

    return (
        <div>


            {transactions.filter(transaction => transaction.id == id).map((transaction) =>
                <div className="mt-5">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-4">
                                            <label for="concept" className="block text-sm font-medium text-gray-700">Concept</label>
                                            <input type="text" name="concept" id="concept" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" value={transaction.concept} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label for="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                            <input type="text" name="amount" id="amount" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" value={transaction.amount} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label for="" className="block text-sm font-medium text-gray-700">Date</label>
                                            <input type="date" name="date" id="date" autocomplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" />
                                        </div>


                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Change
                                    </button>
                                    <button type="submit" className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <Link to={`/delete/${transaction.id}`}>Delete</Link>
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