import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import './style.css';

function NavBar(){
    return(
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
            </Navbar>
        </div>

    );
}

export default NavBar;