import React, { useState } from "react";

export function ForgotChange() {
  const [password, setPassword] = useState("");
  const passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  const [passwordCheck, setPasswordCheck] = useState("none")

  const handleSubmit = (evt) => {
    evt.preventDefault();


    if (!passwordFormat.test(password)){
      setPasswordCheck("block")
    }
    else {
        setPasswordCheck("none")
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
      
          fetch('http://ec2-100-26-225-56.compute-1.amazonaws.com/passwordReset'+window.location.search, {
            method: 'POST',
            credentials: "include",
            headers: headers,
            body: JSON.stringify({ "password": password,})
          })
            .then(response => {
              if (response.status === 401 || response.status === 422) {
              }
              else {
                window.location.href = "/login";
              }
            })
        }
    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your new password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label
          className="inputs"
          style={{ display: passwordCheck }}>
          Password must be at least 8 characters, have an uppercase, lowercase and number
        </label>
        <br></br>
        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
}