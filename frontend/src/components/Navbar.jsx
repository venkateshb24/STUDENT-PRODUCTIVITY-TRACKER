import {Link, useNavigate} from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

function Navbar(){
    const navigate=useNavigate();
    const loggedIn=isLoggedIn();

    const handleLogout=()=>{
        logout();
        navigate("/");
    }

    return(
        <nav style={styles.nav}>
            <h2 style={styles.logo} onClick={() => navigate("/")}>StudyTracker</h2>

            <div style={styles.links}>
                {!loggedIn?(
                    <>
                        <Link to={"/login"} style={styles.link}>Login</Link>
                        <Link to={"/register"} style={styles.link}>Register</Link>
                    </>
                ):(
                    <>
                        <Link to={"/dashboard"} style={styles.link}>Dashboard</Link>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

const styles={
    nav:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"15px 30px",
        backgroundColor:"#1e293b",
        color:"white",
        borderRadius:"8px"
    },
    logo:{
        margin:"0",
        cursor:"pointer",
    },
    links:{
        display:"flex",
        gap:"15px",
        alignItems:"center",
    },
    link:{
        color:"white",
        textDecoration:"none",
        fontWeight:"500",
    },
    logoutBtn:{
        background:"#ef4444",
        border:"none",
        color:"white",
        padding:"6px 12px",
        cursor:"pointer",
        borderRadius:"4px",
    },
};

export default Navbar;