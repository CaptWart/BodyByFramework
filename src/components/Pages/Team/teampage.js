import React from 'react';
import logo from './images/logo.png';
import './style.css';
import {Nav, Navbar, Row, Col} from 'react-bootstrap'
import teamHeader from './images/TeamHeader.png'
import david from './images/david.png'
import emi from './images/emi.png'
import aaron from './images/aaron.png'
import xavier from './images/xavier.png'
import { Footer } from '../../Footer/index'
import linked from './images/linkedin.png'
import web from './images/web.png'
import github from './images/github.png'

// import background from './images/TeamBackground.png'

function TeamPage(){
    return(
      <div className='homeApp'>
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
        
        <div style={{"textAlign": "center"}} className='teambox'>
        <img id='meetTheTeam' alt="Meet the team" src={teamHeader}/>

         <div  id='teamInfo'>
              <br></br>
              {/* <img src={background}></img> */}
                <Row>
                  <Col md={3}> 
                  {/* <img src={frame} className='frames'/> */}
                  <img src={david} alt="David" className='portrait'/>
                  <br></br>
                  <a href="https://github.com/CaptWart">
                    <img src={github}></img>
                  </a>
                  <a href="https://thedavidchau.com">
                   <img src={web}></img>
                  </a>
                  </Col>
                  <Col md={6}> <h1>David Chau - Full Stack Developer</h1>David is a goat. Not a literal Goat but like Goated</Col>
                </Row>
                <Row>
                  <Col md={3}> 
                  {/* <img src={frame} className='frames'/> */}
                  <img src={emi} alt="Emi" className='portrait'/>
                  <br></br>
                  <a href="https://github.com/Emi-dev">
                    <img src={github}></img>
                  </a>
                  <a href="https://www.linkedin.com/in/emiclar/">
                   <img src={linked}></img>
                  </a>
                  </Col>
                  <Col md={6}> <h1>Emi Clar - Full Stack Developer</h1>Emi is a Full Stack Web Developer with a background in technical support and software programming. I have the Certificate from the University of Central Florida Coding Boot Camp in addition to a Bachelor of Science in Computer Science from Northeastern University, and eager to combine my previous IT experience and web development skills to create meaningful web applications</Col>
                </Row>
                <Row>
                  <Col md={3}> 
                  {/* <img src={frame} className='frames'/> */}
                  <img src={aaron} alt="Aaron" className='portrait'/>
                  <br></br>
                  <a href="http://aaroncseals.com/">
                   <img src={web}></img>
                  </a>
                  <a href="https://www.linkedin.com/in/aaron-seals-06516996">
                   <img src={linked}></img>
                  </a>
                  </Col>
                  <Col md={6}> <h1>Aaron Seals - Graphic Designer</h1>Aaron is a graduate of UCF and a designer with 6+ years of experience. He loves taking dreams and making them tangible for you, going as far as the imagination will take him. He loves to travel, has been in Orlando for far too long, and is fluent in Lorel Ipsum. 
                    He also loves to dance. Like all the time.
                  </Col>
                </Row>
                <Row>
                  <Col md={3}> 
                  {/* <img src={frame} className='frames'/> */}
                  <img src={xavier} alt="Xavier" className='portrait'/>
                  <br></br>
                  <a href="https://www.linkedin.com/mwlite/in/xavier-leblanc-88072673">
                   <img src={linked}></img>
                  </a>
                  </Col>
                  <Col md={6}> <h1>Xavier Leblanc - Brand Manager</h1>Media, broadcast and marketing professional with over 14 years of experience. LeBlanc has managed video content creation and social media strategy for employers with 40,000+ follower bases. Along with comprehensive copywriting of company blogs, emails, scripts and product copy.
                  LeBlanc has also produced content aired on major broadcast networks such as CBS, Telemundo and Azteca. Over 80 televised episodes. Published over 50 entertainment articles across various media outlets. And served as a Production Assistant on the Academy Award winning motion picture 'Ford V Ferrari'.
                  </Col>
                </Row>
          </div>

        </div>
        <Footer></Footer>
      </div>

    );
}

export default TeamPage;