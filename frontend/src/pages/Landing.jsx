import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Landing(){
    const navigate=useNavigate();

    return(
        <>
            <Navbar />

            <div style={styles.container}>
                <h1 style={styles.title}>Track Your Daily Productivity</h1>
                <p style={styles.subtitle}>
                    Log DSA problems, study hours, and notes — all in one place.
                </p>

                <button style={styles.button} onClick={()=>navigate("/register")}>Get Started</button>
            </div>

            <div style={styles.features}>
                <h2 style={styles.featuresTitle}>Why StudyTracker?</h2>

                <div style={styles.featuresGrid}>
                    <div style={styles.featureCard}>
                        <h3>📊 Daily Productivity Logs</h3>
                        <p>Track DSA problems, study hours, and notes every day.</p>
                    </div>
                    
                    <div style={styles.featureCard}>
                        <h3>🔐 Secure Authentication</h3>
                        <p>JWT-based login keeps your data safe and private.</p>
                    </div>

                    <div style={styles.featureCard}>
                        <h3>📅 Auto Daily Updates</h3>
                        <p>No duplicate logs — update today’s progress anytime.</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

const styles={
    container:{
        height:"90vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        backgroundColor:"#f8fafc",
        fontFamily:"Arial, Helvetica, sans-serif",
    },
    title:{
        fontSize:"2.5rem",
        marginBottom:"10px",
    },
    subtitle:{
        fontSize:"1.1rem",
        color:"#475569",
        marginBottom:"30px",
        maxWidth:"500px",
    },
    button:{
        padding:"12px 24px",
        fontSize:"1rem",
        backgroundColor:"#2563eb",
        color:"white",
        border:"none",
        borderRadius:"6px",
        cursor:"pointer",
    },
    features:{
        padding:"60px 20px",
        backgroundColor:"#ffffff",
        textAlign:"center",
        fontFamily:"Arial, Helvetica, sans-serif",
    },
    featuresTitle:{
        fontSize:"2rem",
        marginBottom:"30px",
    },
    featuresGrid:{
        display:"flex",
        gap:"20px",
        justifyContent:"center",
        flexWrap:"wrap",
    },
    featureCard:{
        border:"1px solid #bec8d4",
        borderRadius:"8px",
        padding:"20px",
        width:"250px",
        backgroundColor:"#f9fafb",
    },
};

export default Landing;