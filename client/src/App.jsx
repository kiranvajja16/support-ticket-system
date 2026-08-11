import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import ADashboard from "./pages/ADashboard.jsx";
import AgDashboard from "./pages/AgDashboard.jsx";

import AIChat from "./pages/AIChat.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import Tickets from "./pages/Tickets.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/agent-dashboard" element={<AgDashboard />} />


        <Route path="/admin-dashboard" element={<ADashboard />} />

        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />


        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;