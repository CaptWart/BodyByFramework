import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (evt) => {
      console.log(email)
    evt.preventDefault();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

    fetch('http://localhost:3001/sendPasswordReset', {
      method: 'POST',
      credentials: "include",
      headers: headers,
      body: JSON.stringify({ "email": email})
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
          console.log("bad")
        }
        else {
          window.location.href = "/login";
        }
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your email</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <input type="submit" value="Forgot Password" />
      </form>
    </div>
  );
}