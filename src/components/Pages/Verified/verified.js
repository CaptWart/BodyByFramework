import React from 'react';
import { Link } from 'react-router-dom'

export function Verified(){
    console.log(window.location.search)
    fetch('http://localhost:3001/verifyEmail'+window.location.search, { 
        method: "GET", 
        credentials: 'include'
    })
    return(
        <div>
            Yours account has been verified
            <Link to="/login">
                <button type="button">
                      Login
                </button>
            </Link>         
        </div>
    )
}