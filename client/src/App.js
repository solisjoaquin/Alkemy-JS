import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

  // State for retrieving player ID numbers from roster endpoint
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/transactions`)
      .then(
        res => setTransactions(res.data)
      )
      .catch(err => {
        console.log('Error : ' + err);
      })
  }, [])


  return (
    <div className="App-header">
      <h1>transactions</h1>
      { transactions.map((transaction) =>
        <div className="transaction-li">
          <li>{`
        Concept = ${transaction.concept} - 
        Amount = ${transaction.amount} - 
        Type = ${transaction.type}`}
          </li>
          <button className=" button-edit">Edit</button>
        </div>
      )}
    </div>
  )
}

export default App
