import { useState, useEffect } from "react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { fetchLog, saveLog } from "../api/productivity";

function Dashboard(){
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate("/");
    };

    const [logs,setLogs]=useState([]);
    const [dsaCount,setDsaCount]=useState("");
    const [studyHours,setStudyHours]=useState("");
    const [notes,setNotes]=useState("");

    useEffect(()=>{
        fetchLogs();
    },[]);

    const fetchLogs=async ()=>{
        try{
            const res=await fetchLog();
            setLogs(res.data.logs);
        }
        catch(err){
            alert("Failed to load logs");
        }
    };
    
    const saveToday=async ()=>{
        try{
            await saveLog({dsaCount,studyHours,notes});
            alert("Saved");
            setDsaCount("");
            setStudyHours("");
            setNotes("");
            fetchLogs();
        }
        catch(err){
            alert("Error saving data");
        }
    };

    return(
        <>
            <h1>Welcome to Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

            <hr />

            <h3>Today's Productivity</h3>
            DSA Count : <input placeholder="Enter DSA Count" value={dsaCount} onChange={(e)=>setDsaCount(e.target.value)} />
            Study Hours : <input placeholder="Enter Study Hours" value={studyHours} onChange={(e)=>setStudyHours(e.target.value)} />
            Notes : <input placeholder="Enter notes" value={notes} onChange={(e)=>setNotes(e.target.value)} /> 
            <button onClick={saveToday}>Save</button>

            <hr />

            <h3>Recent Logs</h3>
            {logs.length===0 && <p>No Logs yet</p>}

            {logs.map((log)=>(
                <div key={log._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
                    <p>Date : {log.date}</p>
                    <p>DSA : {log.dsaCount}</p>
                    <p>Study Hours : {log.studyHours}</p>
                    <p>Notes : {log.notes}</p>
                </div>
            ))}
        </>
    );
};

export default Dashboard;