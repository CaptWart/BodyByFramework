import React, { useState } from "react";
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

    fetch('http://ec2-54-163-74-245.compute-1.amazonaws.com/login', {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: "include",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
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
      <img style={{width: '100%'}} alt="Body By Framework" src={bbf}></img>
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