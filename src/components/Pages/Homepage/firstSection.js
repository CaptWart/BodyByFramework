import React from 'react';
import run from './images/run.jpg';
import climb from './images//climb.jpg';
import logo from './images/logo.png';
import './style.css';
import { Link } from "react-router-dom";
import {Nav, NavDropdown, Navbar, Form, FormControl, Button} from 'react-bootstrap'


function FirstSection(){
    return(
      <div className='section'>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        {/* <div className='mainbox'>
          <img src={run} className='run float-left' alt='yes' />
            <div className='frontBox'>
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, deserunt vel deleniti distinctio ipsa dicta, cupiditate rerum nostrum magni sapiente tenetur repellat possimus laboriosam ipsam illum repudiandae at, quis ea.

            </p>
            <Link to="/login">
                <button type="button">
                      Login
                </button>
            </Link>           

            </div>
          <img src={climb} className='climb float-right' alt='yes' />
        </div> */}
      </div>
    );
}

export default FirstSection;