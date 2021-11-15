import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style2.css"

import LoggedIn from './LoggedIn';
import LogIn from './Login';
import facade from './ApiFacade';

import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { URL, WEATHER_URL } from './settings';

function LoginPrompt() {
  const [loggedIn, setLoggedIn] = useState(false)
  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {
    facade.login(user, pass)
    .then(res => setLoggedIn(true));
  }



  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn facade={facade} />
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )
}

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header/>
        <hr />
        
        {
          /*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
          */
        }
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/whatisthiseven">
            <Dashboard />
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


function Header(){
  return(
    <div>
      <ul className="header">
          <li>
          <NavLink exact activeClassName="selected" to="/">Weather</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/whatisthiseven">Dashboard</NavLink>
          </li>
        </ul>
    </div>
  );
}



function Home() {
  const [weather,setWeather] = useState({
    "weather": {
      "id": "",
      "countryName": "",
      "countryCode": "",
      "timezone": "",
      "temperature": ""
    },
    "country": {
      "name": "",
      "officialName": "",
      "population": "",
      "continents": [
        ""
      ],
      "capital": [
        ""
      ]
    }
  })

  const weatherData1 =(city) => {
    facade.weatherData(city)
    .then(res => res.json())
    .then(data => setWeather(...weather,data))
    .catch(error => {
      console.log(error)
    })
  }
  const [searchTerm, setSearchTerm] = useState("");
  const searchForCity = (evt) => {
      evt.preventDefault();
      weatherData1(searchTerm);
  }
  const onChange = (evt) => {
      setSearchTerm({...searchTerm, [evt.target.id]: evt.target.value})
  }
  
  return(
      <div>
          <h2>Search for a city:</h2>
          <form onChange={onChange} >
                  <input placeholder="City Name" id="cityName" />
                  <button onClick={searchForCity}>Submit</button>
          </form>
          <p>{weather.weather.id}</p>
      </div>
  );
}

function Login() {
  return (
    <form action="{URL}">
    <div class="form-group w-25">
      <LoginPrompt/>
    </div>
  </form>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

