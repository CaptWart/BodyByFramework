import React from 'react';
import './App.css';
import NavBar from './components/Navbar'
import HomePage from './components/Pages/Homepage/homepage'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from './components/Pages/Login/login';
import { Current } from './components/Pages/Current/current';
import { Create } from './components/Pages/Create/create';
import { Logout } from './components/Pages/Logout/logout';
import { Forgot } from './components/Pages/Forgot/forgot';
import { ForgotChange } from './components/Pages/ForgotChange/forgotChange';
import { ChangePassword } from './components/Pages/ChangePassword/changePassword';
import { Verify } from './components/Pages/Verify/verify';
import { Verified } from './components/Pages/Verified/verified';
import TeamPage from './components/Pages/Team/teampage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/current" component={Current} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/forgotpassword" component={Forgot} />
        <Route exact path="/forgotpasswordChange" component={ForgotChange} />
        <Route exact path="/changepassword" component={ChangePassword} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/verified" component={Verified} />
        <Route exact path="/team" component={TeamPage} />

      </Router>
    </div>
  );
}

export default App;
