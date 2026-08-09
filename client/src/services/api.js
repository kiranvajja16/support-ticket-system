import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5001/api",
    headers:{
        "Content-Type":"application/json",
    },
});

export const registerUser = (userData)=>{
    return api.post("/auth/register",userData);
};

export const loginUser = (userData)=>{
    return api.post("/auth/login",userData);
};

export default api;