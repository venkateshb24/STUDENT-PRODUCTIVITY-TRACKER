// Footer.jsx
// PURPOSE: Simple footer shown at the bottom of pages
// This is a "presentational component" — no logic, just displays text

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 PaceUp</p>
      <p>Built by Venkatesh</p>
    </footer>
  );
}

// Styles written as a JavaScript object
// Instead of a CSS file, styles are kept here (called "inline styles")
const styles = {
  footer: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#1e293b",  // dark blue-grey
    color: "white",
    marginTop: "40px",
    borderRadius: "8px",
  },
};

export default Footer;

// ─────────────────────────────────────────────
// WHY USE INLINE STYLES HERE?
// This is a very simple component with no hover effects needed.
// Inline styles are fine for simple, static UI like a footer.
// For complex styling (hover, animations), use a .css file instead.
// ─────────────────────────────────────────────