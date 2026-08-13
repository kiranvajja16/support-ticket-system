import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../services/api";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);

      const response = await createTicket({
        title,
        description,
        category,
      });

      console.log("Ticket created:", response);

      setSuccess("Ticket created successfully!");

      setTitle("");
      setDescription("");
      setCategory("General");

      setTimeout(() => {
        navigate("/tickets");
      }, 1000);
    } catch (error) {
      console.error("Create ticket error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-container">
      <h1>Create Support Ticket</h1>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Ticket Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter your problem"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            placeholder="Explain your problem"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

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

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default CreateTicket;