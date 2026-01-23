import api from "./axios";

export const fetchLog=()=>{
    return api.get("/productivity");
};

export const saveLog=(data)=>{
    return api.post("/productivity/today",data);
};