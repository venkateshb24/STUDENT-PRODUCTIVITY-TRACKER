import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./utils/auth";

function App() {
  const [isAuth,setIsAuth]=useState(false);

  useEffect(()=>{
    const token=getToken();
    if(token){
      setIsAuth(true);
    }
  },[]);

  return (
    <div>
      {isAuth ? <Dashboard /> : <Login onLoginSuccess={() => setIsAuth(true)} />}
    </div>
  );
}

export default App;
