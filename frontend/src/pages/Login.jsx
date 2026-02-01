import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=async ()=>{
        try{
            const res=await loginUser({username,password});
            localStorage.setItem("token",res.data.token);
            alert("Login Successful");
            navigate("/dashboard");
        }
        catch(err){
            alert("Login Failed");
        }
    };
    return(
        <>
            <Navbar />

            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Login</h2>

                    <div style={styles.field}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>


                    <button onClick={handleLogin} style={styles.button}>Login</button>

                    <p style={styles.text}>
                        New user?{" "}
                        <span style={styles.link} onClick={()=>navigate("/register")}>Register</span>
                    </p>
                </div>
            </div>
        </>
    );
}

const styles = {
  page: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  card: {
    width: "320px",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "15px",
  },
  text: {
    fontSize: "0.9rem",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "6px",
    fontSize: "0.9rem",
    color: "#334155",
    fontWeight: "500",
  },
};


export default Login;

