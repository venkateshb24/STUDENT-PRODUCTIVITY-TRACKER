import { useState, useEffect } from "react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { fetchLog, saveLog } from "../api/productivity";
import Navbar from "../components/Navbar";

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

    const fetchLogs=async ()=>{
        try{
            const res=await fetchLog();
            setLogs(res.data.logs);
        }
        catch(err){
            alert("Failed to load logs");
        }
    };

    useEffect(()=>{
        fetchLogs();
    },[]);
    
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

    return (
        <>
            <Navbar />

            <div style={styles.container}>
            <h2 style={styles.heading}>Welcome back 👋</h2>
            <p style={styles.subheading}>Log today’s productivity</p>

            <form
                style={styles.card}
                onSubmit={(e) => {
                e.preventDefault();
                saveToday();
                }}
            >
                <div style={styles.field}>
                <label style={styles.label}>DSA Problems Solved</label>
                <input
                    type="number"
                    value={dsaCount}
                    onChange={(e) => setDsaCount(e.target.value)}
                    style={styles.input}
                />
                </div>

                <div style={styles.field}>
                <label style={styles.label}>Study Hours</label>
                <input
                    type="number"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                    style={styles.input}
                />
                </div>

                <div style={styles.field}>
                <label style={styles.label}>Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={styles.textarea}
                />
                </div>

                <button type="submit" style={styles.primaryButton}>
                Save Log
                </button>
            </form>

            <div style={styles.logsSection}>
                <h3 style={{ marginBottom: "20px" }}>Recent Logs</h3>

                {logs.length === 0 && <p>No logs yet</p>}

                {logs.map((log) => (
                <div key={log._id} style={styles.logCard}>
                    <p><strong>Date:</strong> {log.date}</p>
                    <p><strong>DSA:</strong> {log.dsaCount}</p>
                    <p><strong>Study Hours:</strong> {log.studyHours}</p>
                    <p><strong>Notes:</strong> {log.notes}</p>
                </div>
                ))}
            </div>
            </div>
        </>
    );

};

const styles = {
  container: {
    minHeight: "90vh",
    backgroundColor: "#f8fafc",
    padding: "40px 20px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "5px",
  },
  subheading: {
    marginBottom: "30px",
    color: "#475569",
  },
  card: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "left",
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
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cbd5e1",
    minHeight: "80px",
    fontSize: "1rem",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  primaryButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    },

    logsSection: {
    marginTop: "50px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
    },

    logCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    marginBottom: "15px",
    border: "1px solid #e2e8f0",
    },
};



export default Dashboard;