import React from "react";


export function Logout(){
    
    fetch('http://ec2-100-26-225-56.compute-1.amazonaws.com/logout', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then (response => { 
        if(response.status === 500){
            window.location.href = "/login";
        }
        else{
            window.location.href = "/login";
        }
      })
      .then(data => {
       })

    return(
        <div>Logging out</div>
    )
}