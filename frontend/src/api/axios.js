import axios from "axios";
import { getToken } from "../utils/auth";
import { logout } from "../utils/auth";

const api=axios.create({
    baseURL:"http://localhost:3000",
});

api.interceptors.request.use((config)=>{
    const token=getToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res)=>res,
    (err)=>{
        if(err.response?.status===401){
            logout();
            window.location.href="/";
        }
        return Promise.reject(err);
    }
)

export default api;