import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Destination from './components/Destinaton/Destination';
import SearchRide from './components/SearchRide/SearchRide';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <h3>Name: {loggedInUser.name}</h3>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/search-ride/:id">
            <SearchRide />
          </PrivateRoute>
          <Route path="/destination">
            <Destination></Destination>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;