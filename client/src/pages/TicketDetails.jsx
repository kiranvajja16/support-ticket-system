import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTicketById,
  updateTicket,
} from "../services/api";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const fetchTicket = async () => {
    try {
      const response = await getTicketById(id);

      setTicket(response.ticket);

      setTitle(response.ticket.title);
      setDescription(response.ticket.description);
      setCategory(response.ticket.category);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await updateTicket(id, {
        title,
        description,
        category,
      });

      setTicket(response.ticket);

      setIsEditing(false);

      alert("Ticket updated successfully");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update ticket"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading ticket...</h2>;
  }

  if (error && !ticket) {
    return (
      <div>
        <h2>{error}</h2>

        <Link to="/tickets">
          Back to My Tickets
        </Link>
      </div>
    );
  }

  if (!ticket) {
    return <h2>Ticket not found</h2>;
  }

  return (
    <div>
      <h1>Ticket Details</h1>

      {error && <p>{error}</p>}

      {!isEditing ? (
        <>
          <h2>{ticket.title}</h2>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{ticket.description}</p>

          <p>
            <strong>Category:</strong>{" "}
            {ticket.category}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {ticket.status}
          </p>

          <p>
            <strong>Created By:</strong>{" "}
            {ticket.createdBy?.name || "Unknown"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {ticket.createdBy?.email || "Unknown"}
          </p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {ticket.assignedTo
              ? `${ticket.assignedTo.name} (${ticket.assignedTo.email})`
              : "Not assigned"}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(ticket.updatedAt).toLocaleString()}
          </p>

          {ticket.status === "Open" && (
            <button onClick={() => setIsEditing(true)}>
              Edit Ticket
            </button>
          )}

          <br />
          <br />

          <Link to="/tickets">
            Back to My Tickets
          </Link>
        </>
      ) : (
        <>
          <h2>Edit Ticket</h2>

          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="title">
                Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <br />

            <div>
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            <br />

            <div>
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="Technical">
                  Technical
                </option>

                <option value="Billing">
                  Billing
                </option>

                <option value="General">
                  General
                </option>
              </select>
            </div>

            <br />

            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TicketDetails;