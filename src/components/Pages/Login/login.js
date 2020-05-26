import React, { useState } from "react";
import { Link } from "react-router-dom";
import phone from './phone.jpg'
import { Row, Col, Container } from "react-bootstrap"
import bbf from './images/bbf.png'


export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badLogin, setBadLogin] = useState("none")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = { email, password }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('http://ec2-3-13-138-147.us-east-2.compute.amazonaws.com/login', {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: "include",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
          console.log("bad")
          setBadLogin("block")
        }
        else {
          window.location.href = "/current";
        }
      })
  }
  return (
    <div>
      <form id='mainframe' onSubmit={handleSubmit}>
      <img style={{width: '100%'}} src={bbf}></img>
                <br></br>
                <br></br>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <input style={{height: "28px", width: "178px"}} type="submit" value="Login" />
        <label
          style={{ display: badLogin }}>
          Bad login credentials
      </label>
      <p> <a href="/forgotpassword">Forgot password</a></p>
      <p> Don't have an account <a href="/create">create</a> one!</p>
      </form>
    </div>
  );
}