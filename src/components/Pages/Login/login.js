import React, { useState } from "react";
import { Link } from "react-router-dom";

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

    fetch('http://localhost:3001/login', {
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
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Login" />
        <label
          style={{ display: badLogin }}>
          Bad login credentials
      </label>
      </form>
      <Link to="/forgotpassword">
        <button type="button">
          Forgot Password
      </button>
      </Link>
      <br></br>
      <Link to="/create">
        <button type="button">
          Create
      </button>
      </Link>
    </div>
  );
}