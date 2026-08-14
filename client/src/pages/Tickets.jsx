import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {getMyTickets} from "../services/api";

const Tickets =()=>{
  const [tickets,setTickets] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    const fetchTickets=async()=>{
      try{
        const response= await getMyTickets();
        console.log("My tickets:",response);

        setTickets(response.tickets || []);
      }
      catch(err){
        console.error("Error fetching tickets:",err);
        setError(
          error.response?.data?.message ||
          "Failed to fetch tickets"
        );
      } finally{
        setLoading(false);
      }
    };
    fetchTickets();
  },[]);

  if(loading){
    return <div>Loading tickets...</div>;
  }
  if(error){
    return <div>Error: {error}</div>;
  }  return (
    <div>
      <h1>My Tickets</h1>

      {tickets.length === 0 ? (
        <p>You haven't created any tickets yet.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id}>
            <h2>{ticket.title}</h2>

            <p>
              <strong>Category:</strong>{" "}
              {ticket.category}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {ticket.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(ticket.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>Assigned Agent:</strong>{" "}
              {ticket.assignedTo
                ? ticket.assignedTo.name
                : "Not assigned"}
            </p>

            <Link to={`/tickets/${ticket._id}`}>
              View Details
            </Link>

            <hr />
          </div>
        ))
      )}

      <Link to="/dashboard">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Tickets;