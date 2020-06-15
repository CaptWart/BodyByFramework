import React, { useState } from "react";
import './style.css';
import bbf from './images/bbf.png'
export function Create(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [ageCheck, setAgeCheck] = useState(false);
    const [policyCheck, setPolicyCheck] = useState(false);
    const [badForm, setBadForm] = useState("none")
    const [emailUse, setEmailUse] = useState("none")
    const [emailCheck, setEmailCheck] = useState("none")
    const [passwordCheck, setPasswordCheck] = useState("none")
    const backendlocal = 'http://localhost:3001/'

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
        const emailFormat = /\S+@\S+\.\S+/;
        const passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');


        if (!emailFormat.test(email)){
            setEmailCheck("block")
        }
        else {
            setEmailCheck("none")
        }
        
        if (!passwordFormat.test(password)){
            setPasswordCheck("block")
        }
        else {
            setPasswordCheck("none")
        }

        if (!email || !password || !nickname || !ageCheck || !policyCheck || !emailFormat.test(email) || !passwordFormat.test(password)) {
            setBadForm("block")
        }

        else {
            fetch(backendlocal+'createUser', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                credentials: "include",
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 500) {
                        //window.location.href = "/login";
                    }
                    else if (response.status === 400){
                        setEmailUse("block")
                    }
                    else {
                        window.location.href = "/verify";
                    }
                })
        }


    }
    return (
        <div>
            <form id='mainframe' onSubmit={handleSubmit}>
                <img style={{width: '100%'}} alt="Body By Framework" src={bbf}></img>
                <br></br>
                <br></br>
                <input
                    className="inputs"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />    
                <label
                    className="inputs"
                    style={{ display: emailCheck }}>
                    Incorrect email format
                </label>            
                <label
                style={{ display: emailUse }}>
                Email in use
                </label>
                <input
                    className="inputs"
                    type="text"
                    placeholder="Nickname"
                    maxLength="20"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <br></br>
   
                <input
                    className="inputs"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label
                    className="inputs"
                    style={{ display: passwordCheck }}>
                    Password must be at least 8 characters, have an uppercase, lowercase and number
                </label>
                <br></br>
                <input
                    className="inputs"
                    name="isGoing"
                    type="Checkbox"
                    checked={ageCheck}
                    onChange={ageCheckHandler}
                /> I am at least 13 years old
        <br></br>
                <input
                    className="inputs"
                    name="isGoing"
                    type="Checkbox"
                    checked={policyCheck}
                    onChange={policyCheckHandler}
                /> I agree to your <a href='/policy.html'>policies</a>
        <br></br>
        <input style={{height: "28px", width: "178px"}} type="submit" value="Create Account" />
        <label
            className="inputs"
            style={{ display: badForm }}>
            Everything needs to be filled and checked
        </label>
        <p> Have an account <a href="/login">login</a></p>
            </form>
        </div>
    );
}