import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
// import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");

//   const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/"); // unauthorized → redirect login
      else setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  // Update task
  const updateTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${editingTask.id}`, task);
      setTasks(tasks.map((t) => (t.id === editingTask.id ? res.data : t)));
      setEditingTask(null);
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
       

       <button
  onClick={() => navigate("/dashboard")}
  style={{
    padding: "8px 16px",
    marginBottom: "15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Go to Dashboard
</button>



      <h2>Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm
        onSubmit={editingTask ? updateTask : addTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{task.title}</strong> - <em>{task.status}</em>
              </div>
              <div>
                <button onClick={() => setEditingTask(task)} style={{ marginRight: "5px" }}>
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
