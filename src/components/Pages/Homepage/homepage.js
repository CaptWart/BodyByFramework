import React from 'react';
import run from './images/run.jpg';
import climb from './images/climb.jpg';
import logo from './images/logo.png';
import './style.css';
import { Link } from "react-router-dom";
import {Nav, NavDropdown, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import background from './images/background.jpg'
import { Login } from '../Login/login';
import { Footer } from '../../Footer/index'

function HomePage(){
    return(
      <div class="homeApp">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/team">Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='mainbox'>
          {/* <img src={run} className='run float-left' alt='yes' /> */}
          {/* <img id='imgbg' src={background} /> */}
            <div id='info'>
              {/* <img src={phone}/> */}
              <h1>Create Interesting Fitness Content</h1>
              <br></br>
              <h2>Put your fitness data in a different perspective for more engagment with your followers</h2>
              <br></br>
               <a href="/login"><Button style={{ width: "178px"}}>Login</Button></a>
               <br></br>
              <br></br>
              <p> Don't have an account <a href="/create">create</a> one!</p>
            </div>
        </div>
        <Footer></Footer>
      </div>
    );
}

export default HomePage;