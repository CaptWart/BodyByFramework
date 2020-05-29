import React from 'react';
import { Link } from 'react-router-dom'

export function Verified(){
    fetch('http://ec2-100-26-225-56.compute-1.amazonaws.com/verifyEmail'+window.location.search, { 
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