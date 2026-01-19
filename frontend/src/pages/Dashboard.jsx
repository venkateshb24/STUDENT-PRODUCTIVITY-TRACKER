import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate("/login");
    };

    return(
        <>
            <h1>Welcome to Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Dashboard;