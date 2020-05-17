import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Create(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [ageCheck, setAgeCheck] = useState(false);
    const [policyCheck, setPolicyCheck] = useState(false);
    const [badForm, setBadForm] = useState("none")
    const [emailUse, setEmailUse] = useState("none")


    const ageCheckHandler = () => {
        setAgeCheck(!ageCheck);

        //onChange && onChange(event);
    };

    const policyCheckHandler = () => {
        setPolicyCheck(!policyCheck);

        //onChange && onChange(event);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = { email, password, nickname, ageCheck, policyCheck }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        if (!email || !password || !nickname || !ageCheck || !policyCheck) {
            setBadForm("block")
        }
        else {
            fetch('http://ec2-3-13-138-147.us-east-2.compute.amazonaws.com/createUser', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                credentials: "include",
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 500) {
                        console.log("bad")
                        //window.location.href = "/login";
                    }
                    else if (response.status === 400){
                        setEmailUse("block")
                    }
                    else {
                        window.location.href = "/login";
                    }
                })
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create account</h1>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />                
                <label
                style={{ display: emailUse }}>
                Email in use
                </label>
                <br></br>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <br></br>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br></br>
                <input
                    name="isGoing"
                    type="Checkbox"
                    checked={ageCheck}
                    onChange={ageCheckHandler}
                /> I'm 13 I promise
        <br></br>
                <input
                    name="isGoing"
                    type="Checkbox"
                    checked={policyCheck}
                    onChange={policyCheckHandler}
                /> I agree to your stupid policies
        <br></br>
                <input type="submit" value="Submit" />
                <label
                    style={{ display: badForm }}>
                    Everything needs to be filled and checked
      </label>
            </form>
            <Link to="/login">
                <button type="button">
                    Login
                </button>
            </Link>
        </div>
    );
}