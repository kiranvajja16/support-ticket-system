import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/api";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();

        console.log("Agent tickets:", data);

        const ticketList = data.tickets || [];

        setTickets(
          Array.isArray(ticketList) ? ticketList : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch tickets:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load tickets"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Backend already returns only tickets
  // assigned to this agent.
  const assignedTickets = tickets;

  const openTickets = assignedTickets.filter(
    (ticket) =>
      ticket.status?.toLowerCase() === "open"
  );

  const inProgressTickets = assignedTickets.filter(
    (ticket) =>
      ticket.status?.toLowerCase() === "in progress"
  );

  const resolvedTickets = assignedTickets.filter(
    (ticket) =>
      ticket.status?.toLowerCase() === "resolved"
  );

  if (loading) {
    return <h2>Loading Agent Dashboard...</h2>;
  }

  if (error) {
    return (
      <div>
        <h1>Agent Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Agent Dashboard</h1>

      {/* Statistics */}

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
          <div key={ticket._id}>

            <h3>{ticket.title}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {ticket.createdBy?.name ||
                "Unknown"}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {ticket.category}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {ticket.status}
            </p>

            <p>
              <strong>Assigned To:</strong>{" "}
              {ticket.assignedTo?.name ||
                "You"}
            </p>

            <Link
              to={`/tickets/${ticket._id}`}
            >
              View Ticket
            </Link>

            <hr />

          </div>
        ))
      )}
    </div>
  );
};

export default AgentDashboard;