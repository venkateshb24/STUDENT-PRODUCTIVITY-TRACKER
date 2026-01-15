import { logout } from "../utils/auth";

function Dashboard(){
    return(
        <>
            <h1>Welcome to Dashboard</h1>
            <button onClick={()=>{
                logout();
                window.location.reload();
            }}>Logout</button>
        </>
    )
};

export default Dashboard;