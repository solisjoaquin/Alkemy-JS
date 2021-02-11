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
            <List transactions={transactions} currentBalance={currentBalance} />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

const List = ({ transactions, currentBalance }) => {
  return (
    <div>
      <h1>Current balance: {currentBalance}</h1>

      {transactions.map((transaction) =>
        <div className="transaction-element">
          <li> <label className="label-list" htmlFor="">Concept: </label>
            {transaction.concept}
            <label className="label-list" htmlFor="">Amount: </label> {transaction.amount}
            <label className="label-list" htmlFor="">Type: </label> {transaction.type}
          </li>

          <button className=" button-edit">
            <Link className="links" to={`/edit/${transaction.id}`}>Edit</Link>
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
            <label for="concept">Concept</label><br />
            <input type="text" id="concept" name="concept" value={transaction.concept} /><br />
            <label for="amount">Amount</label><br />
            <input type="text" id="amount" name="amount" value={transaction.amount} /><br />
            <label for="date">Date</label><br />
            <input type="text" id="date" name="date" value={transaction.date} /><br />
            <input type="submit" />
          </form>
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

  const handleSubmit = e => {
    e.preventDefault();
    const data = { formValues };
    axios
      .post("http://localhost:5000/transactions", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <h1>Create transaction</h1>
      <div className="">
        <form onSubmit={handleSubmit} action="">
          <label for="concept">Concept</label><br />
          <input type="text" id="concept" name="concept" onChange={handleInputChange} /><br />
          <label for="amount">Amount</label><br />
          <input type="text" id="amount" name="amount" onChange={handleInputChange} /><br />
          <label for="date">Date</label><br />
          <input type="text" id="date" name="date" onChange={handleInputChange} /><br />

          <input type="radio" id="1" name="type" value="1" onChange={handleInputChange} />
          <label for="1">income</label><br />
          <input type="radio" id="2" name="type" value="2" onChange={handleInputChange} />
          <label for="2">Outcome</label><br />

          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default App
