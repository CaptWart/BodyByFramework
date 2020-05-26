import React from 'react';
import logo from './images/logo.png';
import './style.css';
import {Nav, Navbar, Button} from 'react-bootstrap'
import { Footer } from '../../Footer/index'

function HomePage(){
    return(
      <div className="homeApp">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" />
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
            <div id='info'>
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