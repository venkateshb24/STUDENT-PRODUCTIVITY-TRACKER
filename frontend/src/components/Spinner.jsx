// Spinner.jsx
// PURPOSE: Show a loading animation while data is being fetched from the API
// Used in every page while waiting for backend response

import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-wrapper">
      {/* This div is styled with CSS to spin in a circle */}
      <div className="spinner" />
    </div>
  );
}

export default Spinner;

// ─────────────────────────────────────────────
// HOW IT IS USED:
//
// Every page has a "loading" state:
//   const [loading, setLoading] = useState(true);
//
// While loading is true, show Spinner:
//   if (loading) return <Spinner />;
//
// Once data is fetched, loading becomes false → show real page
// ─────────────────────────────────────────────