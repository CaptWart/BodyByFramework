import React, { useState } from "react";
import { Link } from "react-router-dom";

export function ForgotChange() {
  const [password, setPassword] = useState("");

  console.log(window.location.search)
  const handleSubmit = (evt) => {
      console.log(password)
    evt.preventDefault();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

    fetch('http://localhost:3001/passwordReset'+window.location.search, {
      method: 'POST',
      credentials: "include",
      headers: headers,
      body: JSON.stringify({ "password": password,})
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
          console.log("bad")
        }
        else {
          window.location.href = "/login";
          console.log("changed")
        }
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your email</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
}