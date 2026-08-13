import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">

      <h1>Customer Dashboard</h1>

      <h2>Welcome, {user?.name || "Customer"} </h2>

      <p>
        Email: {user?.email || "Not available"}
      </p>

      <p>
        Role: {user?.role || "customer"}
      </p>

      <hr />

      <h2>What would you like to do?</h2>

      <button onClick={() => navigate("/create-ticket")}>
        Create Ticket
      </button>

      <button onClick={() => navigate("/tickets")}>
        My Tickets
      </button>

      <button onClick={() => navigate("/ai-chat")}>
        AI Support
      </button>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
};

export default Dashboard;