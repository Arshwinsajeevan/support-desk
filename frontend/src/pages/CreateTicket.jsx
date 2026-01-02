import { useState } from "react";
import api from "../api";

export default function CreateTicket() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/tickets", { title, description, priority });
    window.location.href="/tickets";
  };

  return (
    <>

      <div className="app-container">
        <div className="card">

          <h2>Create Ticket</h2>

          <form onSubmit={submit}>
            <label>Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} />

            <br/><br/>

            <label>Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={e=>setDescription(e.target.value)}
            />

            <br/><br/>

            <label>Priority</label>
            <select value={priority} onChange={e=>setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <br/><br/>

            <button className="btn" type="submit">Submit</button>
          </form>

        </div>
      </div>
    </>
  );
}
