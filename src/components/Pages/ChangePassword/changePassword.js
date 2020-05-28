import React, { useState } from "react";

export function ChangePassword() {
  const [user, setUser] = useState([]);

  const [password, setPassword] = useState("");

  React.useEffect(function effectFunction() {
    async function fetchUser() {
        const response = await fetch('http://localhost:3001/current', { method: "GET", credentials: 'include' })
        //const json = await response.json();
        if(!response || response.status === 500 || response.status === 401){
            window.location.href = "/login";
        }
        else{
                  const json = await response.json();
                  setUser(json)
        }

    }
    fetchUser()

}, [user]);


  
  const handleSubmit = (evt) => {
    evt.preventDefault();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

    fetch('http://localhost:3001/changePassword', {
      method: 'POST',
      credentials: "include",
      headers: headers,
      body: JSON.stringify({ "password": password,})
    })
      .then(response => {
        if (response.status === 401 || response.status === 422) {
        }
        else {
          //window.location.href = "/login";
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