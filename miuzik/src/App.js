import Header from './Components/Header';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import Library from './Pages/Library';
import Login from './Auth/Login'
import { useEffect, useState } from 'react';
import useAuth from './Auth/useAuth'



const hash = new URLSearchParams(window.location.search).get('code')

function App() {
  const [code, setCode] = useState(null);
  const accessToken = useAuth(code);

  useEffect(() => {
    if (hash) {
      setCode(hash)
    }

  }, [])

  return (
    code ?
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/'><Home code={accessToken} /></Route>
            <Route exact path='/Pages/Home'><Home code={accessToken}></Home></Route>
            <Route path='/Pages/Explore'> <Explore code={accessToken} /></Route>
            <Route path='/Pages/Library' component={Library}></Route>
          </Switch>

        </div>
      </Router> :
      <Login></Login>
  );
}

export default App;
