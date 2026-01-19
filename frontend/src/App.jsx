import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import { isLoggedIn } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            isLoggedIn()?<Navigate to="/dashboard"/>:<Navigate to="/register"/>
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
  );
}

export default App;
