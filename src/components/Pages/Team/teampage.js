import React from 'react';
import logo from './images/logo.png';
import './style.css';
import { Link } from "react-router-dom";
import {Nav, NavDropdown, Navbar, Form, FormControl, Button, Container, Row, Col} from 'react-bootstrap'
import teamHeader from './images/TeamHeader.png'
import david from './images/david.png'
import emi from './images/emi.png'
import aaron from './images/aaron.png'
import xavier from './images/xavier.png'
import { Footer } from '../../Footer/index'
function TeamPage(){
    return(
      <div className='homeApp'>
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
        
        <div style={{"text-align": "center"}} className='teambox'>
        <img id='meetTheTeam' src={teamHeader}/>

         <div  id='teamInfo'>
              <br></br>
                <Row>
                  <Col md={3}> <img src={david} className='portrait'/></Col>
                  <Col md={6}> <h1>David Chau Full Stack Developer</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis vitae sit eos. Vel quis praesentium modi? Alias provident veniam, quia atque libero vitae repellat sit sequi eos explicabo quaerat. </Col>
                </Row>
                <Row>
                  <Col md={3}> <img src={emi} className='portrait'/></Col>
                  <Col md={6}> <h1>Emi Clar Full Stack Developer</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis vitae sit eos. Vel quis praesentium modi? Alias provident veniam, quia atque libero vitae repellat sit sequi eos explicabo quaerat. </Col>
                </Row>
                <Row>
                  <Col md={3}> <img src={aaron} className='portrait'/></Col>
                  <Col md={6}> <h1>Aaron Seals Graphic Designer</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis vitae sit eos. Vel quis praesentium modi? Alias provident veniam, quia atque libero vitae repellat sit sequi eos explicabo quaerat. </Col>
                </Row>
                <Row>
                  <Col md={3}> <img src={xavier} className='portrait'/></Col>
                  <Col md={6}> <h1>Xavier Leblanc Brand Manager</h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quis vitae sit eos. Vel quis praesentium modi? Alias provident veniam, quia atque libero vitae repellat sit sequi eos explicabo quaerat. </Col>
                </Row>
          </div>

        </div>
        <Footer></Footer>
      </div>

    );
}

export default TeamPage;