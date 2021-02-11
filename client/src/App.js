import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const App = () => {

  // State for retrieving player ID numbers from roster endpoint
  const [currenntBalance, setCurrentBalance] = useState(null)
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState([])
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
      <div className="App-header">
        <nav>
          <ul>
            <li>
              <Link className="links" to="/">Home</Link>
            </li>
            <li>
              <Link className="links" to="/create">New</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/create">
            <CreateTransaction />
          </Route>
          <Route path="/edit/:id">
            <EditTransaction transactions={transactions} />
          </Route>
          <Route exact path="/">
            <List transactions={transactions} currenntBalance={currenntBalance} />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

const List = ({ transactions, currenntBalance }) => {
  return (
    <div>
      <h1>Current balance: {currenntBalance}</h1>

      {transactions.map((transaction) =>
        <div className="transaction-li">
          <li>{`
  Concept = ${transaction.concept} - 
  Amount = ${transaction.amount} - 
  Type = ${transaction.type}`}
          </li>

          <button className=" button-edit">
            <Link to={`/edit/${transaction.id}`}>Edit</Link>
          </button>
        </div>
      )}
    </div>
  )
}

const EditTransaction = ({ transactions }) => {
  const { id } = useParams()
  return (
    <div>
      <h1>Edit transaction</h1>
      {transactions.filter(transaction => transaction.id == id).map((transaction) =>
        <div className="">
          <form action="">
            <label for="fname">Concept</label><br />
            <input type="text" id="fname" name="fname" value={transaction.concept} /><br />
            <label for="fname">Amount</label><br />
            <input type="text" id="fname" name="fname" value={transaction.amount} /><br />
            <label for="fname">Date</label><br />
            <input type="text" id="fname" name="fname" value={transaction.date} /><br />
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  )
}

const CreateTransaction = () => {
  return (
    <div>
      <h1>Create transaction</h1>
      <div className="">
        <form action="">
          <label for="fname">Concept</label><br />
          <input type="text" id="fname" name="fname" /><br />
          <label for="fname">Amount</label><br />
          <input type="text" id="fname" name="fname" /><br />
          <label for="fname">Date</label><br />
          <input type="text" id="fname" name="fname" /><br />
          <input type="radio" id="male" name="gender" value="male" />
          <label for="male">income</label><br />
          <input type="radio" id="female" name="gender" value="female" />
          <label for="female">Outcome</label><br />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default App
