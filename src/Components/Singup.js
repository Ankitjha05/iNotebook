import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alertcontext } from '../context/notes/noteContext';

export default function Singup() {
    let alert = useContext(Alertcontext);
    const { setmode, changeState } = alert//useState hook from Alert component

    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setmode(prevState => {
                return {
                    ...prevState, message: "Singup Sucessfully", display: "block", type: "success"
                }
            })
            changeState()
            localStorage.setItem('token', json.authtoken);
            navigate('/')
        } else {
            setmode(prevState => {
                return {
                    ...prevState, message: "Singup Failed", display: "block", type: "danger"
                }
            })
            changeState()
        }
    }
    const handlechange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <h3 className="my-3">
                <u>Please singup to keep your personal notes safe</u>
            </h3>
            <form onSubmit={handlesubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" onChange={handlechange} value={credentials.name} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={handlechange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={handlechange} value={credentials.password} className="form-control" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" onChange={handlechange} value={credentials.cpassword} className="form-control" id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >register</button>
            </form>
        </div>
    )
}
