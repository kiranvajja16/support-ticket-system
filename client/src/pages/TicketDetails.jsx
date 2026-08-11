import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Ticket Details</h1>

      <p>Ticket ID: {id}</p>

      <p>Ticket details will be displayed here.</p>
    </div>
  );
};

export default TicketDetails;