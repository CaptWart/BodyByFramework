import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');


export function Current() {
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");

fetch('http://localhost:3001/current', {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then (response => { 
    if(response.status === 500){
        console.log("bad")
        window.location.href = "/login";
    }
    else{
        return response.json()
    }
  })
  .then(data => {
    setEmail(data.email)
    setID(data._id)
    console.log(data)
   })

  return (
    <div>
        logged in as {email} ID: {id} 
        <Link to="/logout">
                <button type="button">
                      Logout
                </button>
            </Link>       
    </div>
  );
}
