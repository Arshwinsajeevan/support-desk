import { useEffect, useState } from "react";
import api from "../api";
import { getRole } from "../auth";

export default function Tickets() {

  const [tickets, setTickets] = useState([]);
  const role = getRole();

  const loadTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const badgeClass = (status) => {
    switch(status){
      case "Open": return "badge open";
      case "In Progress": return "badge progress";
      case "Resolved": return "badge resolved";
      case "Closed": return "badge closed";
      default: return "badge";
    }
  };

  const priorityClass = (p) => {
    switch(p){
      case "Low": return "badge low";
      case "Medium": return "badge medium";
      case "High": return "badge high";
      default: return "badge";
    }
  };

  return (
    <>

      <div className="app-container">

        <button className="btn" onClick={()=>window.location.href="/create-ticket"}>
          + Create Ticket
        </button>

        <br/><br/>

        {tickets.map(t => (
          <div key={t._id} className="card">

            <div className="ticket-header">
              <h3>{t.title}</h3>

              <span className={badgeClass(t.status)}>
                {t.status}
              </span>
            </div>

            <p>{t.description}</p>

            <p>
              Priority: &nbsp;
              <span className={priorityClass(t.priority)}>
                {t.priority}
              </span>
            </p>

            {t.assignedTo &&
              <p>Assigned To: <strong>{t.assignedTo.name}</strong></p>
            }

            <p style={{fontSize:13, color:"#666"}}>
              Created by {t.user?.name}
            </p>

          </div>
        ))}
      </div>
    </>
  );
}
