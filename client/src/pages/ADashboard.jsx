import { useEffect, useState } from "react";
import { getTickets } from "../services/api";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();

      console.log("Tickets:", data);

      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <h3>Total Tickets</h3>
        <p>{tickets.length}</p>
      </div>

      <div>
        <h3>Open Tickets</h3>
        <p>{openTickets}</p>
      </div>

      <div>
        <h3>In Progress</h3>
        <p>{inProgressTickets}</p>
      </div>

      <div>
        <h3>Resolved</h3>
        <p>{resolvedTickets}</p>
      </div>

      <div>
        <h3>Closed</h3>
        <p>{closedTickets}</p>
      </div>

      <h2>Recent Tickets</h2>

      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <h3>{ticket.title}</h3>

          <p>
            Customer: {ticket.createdBy?.name || "Unknown"}
          </p>

          <p>
            Agent: {ticket.assignedTo?.name || "Not Assigned"}
          </p>

          <p>Status: {ticket.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;