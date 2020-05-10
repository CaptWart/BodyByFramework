import React from 'react';
import './App.css';
import NavBar from './components/Navbar'
import FirstSection from './components/Pages/Homepage/firstSection'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from './components/Pages/Login/login';
import { Current } from './components/Pages/Current/current';
import { Create } from './components/Pages/Create/create';
import { Logout } from './components/Pages/Logout/logout';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={FirstSection} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/current" component={Current} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/logout" component={Logout} />

      </Router>
    </div>
  );
}

export default App;
