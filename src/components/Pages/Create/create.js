import React, { useState } from "react";

export function Create(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
      evt.preventDefault();
      const data = {email, password}
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
  
          fetch('http://localhost:3001/createUser', {
              method: 'POST',
              mode: 'cors',
              redirect: 'follow',
              credentials: "include",
              headers: headers,
              body: JSON.stringify(data)
          })
          .then(response => {
            if(response.status === 500){
              console.log("bad")
              //window.location.href = "/login";
          }
          else{
            window.location.href = "/login";
        }
        })
  }
  return (
    <form onSubmit={handleSubmit}>
        <h1>Create account</h1>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}