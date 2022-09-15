import React,{useState,useContext} from "react";
import {useNavigate } from "react-router-dom";
import { Alertcontext } from "../context/notes/noteContext";
const Login = () => {
    let alert = useContext(Alertcontext);
    const {setmode,changeState} = alert;//useState hook from Alert component

    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handlesubmit = async(e) =>{
        e.preventDefault();
        //http://localhost:5000/api/auth/login
        // const port = process.env.port || 5000;
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:credentials.email,password:credentials.password})
              });
              const json = await response.json();
              //console.log(json);
              if(json.success){
              setmode(prevstate=>{
                return{...prevstate,message:'Login Successfully',display: "block",type: "success"}
            })
            changeState()
                //save the authToken and redirect
                localStorage.setItem('token',json.authtoken)
                navigate("/");
            }else{
                setmode(prevstate=>{
                    return{...prevstate,message:'Login failed',display: "block",type:"danger"}
                })
                changeState()
            }
    }
    const handlechange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h3 className="my-3">
                <u>Please login with valid email and password</u>
            </h3>
            <form onSubmit={handlesubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={handlechange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={handlechange} value={credentials.password} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
export default Login