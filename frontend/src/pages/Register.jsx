import { useState} from "react";
import { RegisterUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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
        <>
            <Navbar />

            <div style={styles.container}>
                <form style={styles.card} onSubmit={handleRegister}>
                    <h2 style={styles.title}>Create Account</h2>

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

                    <button type="submit" style={styles.button}>
                        Register
                    </button>

                    <p style={styles.footerText}>
                        Already have an account?{" "}
                        <Link to="/login" style={styles.link}>
                        Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
};

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#334155",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cbd5f5",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Register;
