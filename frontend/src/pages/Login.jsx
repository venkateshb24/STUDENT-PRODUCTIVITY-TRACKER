import { useState } from "react";
import { loginUser } from "../api/auth";

function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async ()=>{
        try{
            const res=await loginUser({username,password});
            localStorage.setItem("token",res.data.token);
            alert("Login Successful");
        }
        catch(err){
            alert("Login Failed");
        }
    };
    return(
    <div>
        <h2>Login</h2> 

        Username : <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/> 
        Password : <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />  

        <button onClick={handleLogin}>Login</button>
    </div>
    );
}

export default Login;

