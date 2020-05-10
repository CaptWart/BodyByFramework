import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Current() {
    const [user, setUser] = useState([]);

    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch('http://localhost:3001/current', { method: "GET", credentials: 'include' })
            const json = await response.json();
            setUser(json)
        }
        fetchUser()

    }, []);

    return (
        <div>
            logged in as {user.email} and {user._id}
            <Link to="/logout">
                <button type="button">
                    Logout
                </button>
            </Link>
        </div>
    );
}
