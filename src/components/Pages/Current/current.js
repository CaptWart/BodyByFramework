import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../Utils/API";
import Dashboard from "../../Dashboard";

export function Current() {
    const [user, setUser] = useState([]);
    const [plans, setPlans] = useState([]);

    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch('http://localhost:3001/current', { method: "GET", credentials: 'include' })
            console.log(response.status)
            if(!response || response.status === 500 || response.status === 401){
                window.location.href = "/login";
            }
            else if(response.status === 403){
                window.location.href = "/verify"
            }
            else{
                const json = await response.json();
                setUser(json)
                console.log("user json: ", json);
            }
        }
        fetchUser()

    }, []);

    useEffect(() => {
        loadPlans(user._id)
    }, [user._id]); 

    // Load Plans of the user
    function loadPlans(userID) {
        API.getAllPlans(userID)
          .then(res => {
            setPlans(res.data)
          })
          .catch(err => console.log(err));
    };

    return (
        <div>
            logged in as {user.email} and {user._id}
            <Link to="/logout">
                <button type="button">
                    Logout
                </button>
            </Link>

            <Dashboard
                userID={user._id}
                nickname={user.nickname}
                plans={plans}
            />
        </div>
    );
}
