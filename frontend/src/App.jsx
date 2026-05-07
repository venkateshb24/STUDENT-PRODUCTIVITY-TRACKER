import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Dsa from "./pages/Dsa";
import Planner from "./pages/Planner";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      {/* Toaster sits here once, works everywhere in the app */}
      <Toaster position="top-right" />
      
      <Routes>
        {/* Public routes - anyone can access */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - only logged in users */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/dsa" element={
          <ProtectedRoute><Dsa /></ProtectedRoute>
        } />
        <Route path="/planner" element={
          <ProtectedRoute><Planner /></ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute><Leaderboard /></ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute><Quiz /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;