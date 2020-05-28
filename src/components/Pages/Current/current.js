import React, { useState, useEffect } from "react";
import API from "../../Utils/API";
import EverythingTracker from "../../EverythingTracker";
import "../../EverythingTracker/style.css";

export function Current() {
    const [user, setUser] = useState([]);
    const [plans, setPlans] = useState([]);

    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch('http://ec2-3-13-138-147.us-east-2.compute.amazonaws.com/current', { method: "GET", credentials: 'include' })
            if(!response || response.status === 500 || response.status === 401){
                window.location.href = "/login";
            }
            else if(response.status === 403){
                window.location.href = "/verify"
            }
            else{
                const json = await response.json();
                setUser(json);
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
          .catch(err => {});
    };

    return (
        <div id="current">
            <EverythingTracker
                userID={user._id}
                nickname={user.nickname}
                plans={plans}
            />
        </div>
    );
}
