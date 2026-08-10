import React, { useEffect, useState } from "react";
import { getTickets } from "../services/api";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();

        console.log("Agent tickets:", data);

        // Handle different possible API response structures
        const ticketList = data.tickets || data.data || data || [];

        setTickets(Array.isArray(ticketList) ? ticketList : []);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const assignedTickets = tickets.filter(
    (ticket) => ticket.agent || ticket.assignedTo
  );

  const openTickets = assignedTickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "open"
  );

  const inProgressTickets = assignedTickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "in progress"
  );

  const resolvedTickets = assignedTickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "resolved"
  );

  if (loading) {
    return <h2>Loading Agent Dashboard...</h2>;
  }

  return (
    <div>
      <h1>Agent Dashboard</h1>

      <div>
        <h2>Assigned Tickets</h2>
        <p>{assignedTickets.length}</p>
      </div>

      <div>
        <h2>Open Tickets</h2>
        <p>{openTickets.length}</p>
      </div>

      <div>
        <h2>In Progress</h2>
        <p>{inProgressTickets.length}</p>
      </div>

      <div>
        <h2>Resolved</h2>
        <p>{resolvedTickets.length}</p>
      </div>

      <hr />

      <h2>My Assigned Tickets</h2>

      {assignedTickets.length === 0 ? (
        <p>No tickets assigned to you.</p>
      ) : (
        assignedTickets.map((ticket) => (
          <div key={ticket._id || ticket.id}>
            <h3>{ticket.title}</h3>

            <p>
              Customer:{" "}
              {ticket.customer?.name ||
                ticket.customerName ||
                "Unknown"}
            </p>

            <p>
              Status: {ticket.status || "Unknown"}
            </p>

            <p>
              Priority: {ticket.priority || "Normal"}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AgentDashboard;