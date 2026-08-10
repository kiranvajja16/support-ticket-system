import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



export const loginUser = async ({ email, password }) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};


export const registerUser = async (name, email, password, role = "user") => {
  const response = await API.post("/auth/register", {
    name,
    email,
    password,
    role,
  });

  return response.data;
};



export const getTickets = async () => {
  const response = await API.get("/tickets");

  return response.data;
};


export const createTicket = async (ticketData) => {
  const response = await API.post("/tickets", ticketData);

  return response.data;
};


export const getTicketById = async (id) => {
  const response = await API.get(`/tickets/${id}`);

  return response.data;
};


export const askAI = async (message) => {
  const response = await API.post("/ai/chat", {
    message,
  });

  return response.data;
};


export default API;