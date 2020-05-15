import React from 'react';
import { Link } from 'react-router-dom'

export function Verify(){
    return(
        <div>
            Your account needs to be verified. Please check your email
            <Link to="/login">
                <button type="button">
                      Login
                </button>
            </Link>         
        </div>
    )
}