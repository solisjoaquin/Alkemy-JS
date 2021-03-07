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
import CreateTransaction from './components/CreateTransaction'
import List from './components/List';
import EditTransaction from './components/EditTransaction'

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
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-gray-200 rounded-lg ">

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

export default App
