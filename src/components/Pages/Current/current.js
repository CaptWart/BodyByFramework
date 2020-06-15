import React, { useState, useEffect } from "react";
import API from "../../Utils/API";
import EverythingTracker from "../../EverythingTracker";
import "../../EverythingTracker/style.css";

export function Current() {
    const [user, setUser] = useState([]);
    const [plans, setPlans] = useState([]);
    const backendlocal = 'http://localhost:3001/'


    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch(backendlocal+'current', { method: "GET", credentials: 'include' })
            if(!response || response.status === 500 || response.status === 401){
                window.location.href = "/login";
            }
            else if(response.status === 403){
                window.location.href = "/verify"
            }
            else{
                const json = await response.json();
                setUser(json)
                //console.log(json)
                const info = await API.getUser(json._id)
                .then(res => {
                  //console.log(res.data.plans)
                  setPlans(res.data.plans)
                })
                .catch(err => {});
                
            }
        }
        fetchUser()

    }, []);


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
