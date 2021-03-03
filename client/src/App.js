import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Navbar from './components/Navbar';

const App = () => {

  // State for retrieving player ID numbers from roster endpoint
  const [currentBalance, setCurrentBalance] = useState(null)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/transactions`)
      .then(
        res => (
          setCurrentBalance(res.data.meta.currentBalance),
          setTransactions(res.data.data)
        )
      )
      .catch(err => {
        console.log('Error : ' + err);
      })
  }, [])


  return (
    <Router>
      <div>
        <Navbar currentBalance={currentBalance} />

        <main>
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

            <div class="px-4 py-6 sm:px-0">
              <div class="border-4 border-gray-200 rounded-lg ">

                <Switch>
                  <Route path="/new">
                    <CreateTransaction />
                  </Route>
                  <Route path="/edit/:id">
                    <EditTransaction transactions={transactions} />
                  </Route>
                  <Route exact path="/">
                    <List transactions={transactions} currentBalance={currentBalance} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </main>

      </div>
    </Router>
  )
}

const List = ({ transactions, currentBalance }) => {
  return (
    <div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Concept
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                   </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                     </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                {transactions.map((transaction) =>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">

                          <div class="">
                            <div class="text-sm font-medium text-gray-900">
                              {transaction.concept}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{transaction.amount}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {transaction.type == 2 ?
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                            expend.
                          </span>
                          :
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            income
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(transaction.date)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link className="text-indigo-600 hover:text-indigo-900" to={`/edit/${transaction.id}`}>Edit</Link>
                      </td>
                    </tr>
                  </tbody>
                )}

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EditTransaction = ({ transactions }) => {
  const { id } = useParams()
  const handleSubmit = (e) => {
    console.log()
  }

  return (
    <div>


      {transactions.filter(transaction => transaction.id == id).map((transaction) =>
        <div class="mt-5">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">

                    <div class="col-span-6 sm:col-span-4">
                      <label for="concept" class="block text-sm font-medium text-gray-700">Concept</label>
                      <input type="text" name="concept" id="concept" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" value={transaction.concept} />
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                      <input type="text" name="amount" id="amount" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" value={transaction.amount} />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="" class="block text-sm font-medium text-gray-700">Date</label>
                      <input type="date" name="date" id="date" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" />
                    </div>


                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Change
            </button>
                  <button type="submit" class="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

const CreateTransaction = () => {
  const [formValues, setFormValues] = useState({
    concept: "",
    amount: 0,
    type: 0,
    date: ""
  })

  const handleSubmit = (e) => {
    /* e.preventDefault(); */

    const url = 'http://localhost:5000/transactions';
    const data = { formValues };
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  };


  const handleInputChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  /*   const url = 'http://localhost:5000/transactions';
    const data = { formValues };
    fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response)); */


  return (
    <div>

      <div class="mt-5">
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="/" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">


                  <div class="col-span-6 sm:col-span-4">
                    <label for="concept" class="block text-sm font-medium text-gray-700">Concept</label>
                    <input type="text" name="concept" id="concept" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder="Shop" />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="text" name="amount" id="amount" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" placeholder="3000" />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md" />
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Income
                    </button>
                    <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Expenditure
                    </button>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default App
