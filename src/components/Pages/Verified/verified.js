import React from 'react';
import { Link } from 'react-router-dom'

export function Verified(){
    const backendlocal = 'http://localhost:3001/'

    fetch(backendlocal+'verifyEmail'+window.location.search, { 
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