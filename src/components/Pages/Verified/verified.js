import React from 'react';
import { Link } from 'react-router-dom'

export function Verified(){
    fetch('https://bodybyframework.com/api/verifyEmail'+window.location.search, { 
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