import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import { isLoggedIn } from "./utils/auth";
import Landing from "./pages/Landing";

function App() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={
              isLoggedIn()?<Navigate to="/dashboard"/>:<Landing/>
            }
          />

          <Route path="/register" element={<Register />}/>

          <Route 
            path="/login"
            element={isLoggedIn()?<Navigate to="/dashboard"/>:<Login />}
          />

          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
