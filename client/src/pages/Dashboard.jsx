import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Support Ticket Dashboard</h1>

      <p>Welcome, {user?.name || user?.email || "User"}!</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
