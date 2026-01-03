import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");        // email input
  const [password, setPassword] = useState("");  // password input
  const [error, setError] = useState("");        // error messages
  const [loading, setLoading] = useState(false); // loading state

  const { login } = useContext(AuthContext);     // auth context
  const navigate = useNavigate();                // for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("https://task-manager-backend-d3rs.onrender.com/auth/login", { email, password });
      login(res.data.token);                      // save JWT in context + localStorage
      navigate("/tasks");                         // redirect to Tasks page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", cursor: "pointer" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px", fontSize: "12px", color: "gray" }}>
        Use any email & password. First login will auto-create the user.
      </p>
    </div>
  );
}
