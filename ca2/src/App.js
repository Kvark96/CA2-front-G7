
import logo from './logo.svg';
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
          <Route path="/about">
            <Login />
          </Route>
          <Route path="/dashboard">
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
            <NavLink exact activeClassName="selected" to="/about">Login</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
    </div>
  );
}

function Home() {
  return (
    <div className="col-md-12 text-center">
      <h2>Home</h2>
      <Button variant="primary" >Submit</Button>
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

/*

<label for="exampleInputEmail1">Username</label>
      <input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
      <small id="userHelp" class="form-text text-muted">We'll share your USERNAME with anyone else.</small>
    </div>
    <br/>
    <div class="form-group w-25">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <div class="form-check">
    </div>
    <button type="submit" class="btn btn-primary">Login</button>

*/