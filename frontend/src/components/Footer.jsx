function Footer(){
    return(
        <footer style={styles.footer}>
            <p>© 2026 StudyTracker</p>
            <p>Build by Venkatesh</p>
        </footer>
    );
}

const styles={
    footer:{
        padding:"20px",
        textAlign:"center",
        backgroundColor:"#1e293b",
        color:"white",
        marginTop:"40px",
        borderRadius:"8px",
    },
};

export default Footer;