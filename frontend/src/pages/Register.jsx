import { useState } from "react";
import { RegisterUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleRegister=async ()=>{
        try{
            await RegisterUser({username,password});
            alert("Registration Successful");
            window.location.href="/login";
        }
        catch(err){
            alert("Registration failed");
        }
    };

    return(
        <div>
            <h2>Register : </h2>
            Username : <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/> 
            Password : <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            Already have an account? <button onClick={() => navigate("/login")}>Login</button>
        </div>
    )
};

export default Register;