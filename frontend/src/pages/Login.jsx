import { useState } from "react";
import api from "../api";
import { saveAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      saveAuth(res.data.token, res.data.role);
      window.location.href = "/tickets";
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2>Login to SupportDesk Pro</h2>

        {error && <p style={{color:"red"}}>{error}</p>}

        <form onSubmit={login}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />

          <br/><br/>

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />

          <br/><br/>

          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
