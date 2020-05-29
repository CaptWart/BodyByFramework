import React, { useState } from "react";

export function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

    fetch('http://ec2-100-26-225-56.compute-1.amazonaws.com/sendPasswordReset', {
      method: 'POST',
      credentials: "include",
      headers: headers,
      body: JSON.stringify({ "email": email})
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
          
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