import { useNavigate } from "react-router-dom";

function Landing(){
    const navigate=useNavigate();

    return(
        <div style={{padding:"40px",textAlign:"center"}}>
            <h1>Productivity Tracker</h1>

            <p style={{fontSize:"18px",marginTop:"10px"}}>
                Track your daily DSA practice, study hours, and stay consistent.
            </p>

            <button style={{marginTop:"20px", padding:"10px 20px", fontSize:"16px", cursor:"pointer"}}
            onClick={()=>navigate("/register")}>
                Get Started
            </button>

            <div style={{marginTop:"30px"}}>
                <p>Already have an account?</p>
                <button onClick={()=>navigate("/login")}>Login</button>
            </div>
        </div>
    );
}

export default Landing;