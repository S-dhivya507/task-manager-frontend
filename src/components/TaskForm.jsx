import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, status });
    setTitle("");
    setStatus("Todo");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: "8px", width: "60%", marginRight: "10px" }}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px", marginRight: "10px" }}>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" style={{ padding: "8px 12px" }}>
        {editingTask ? "Update" : "Add"}
      </button>
      {editingTask && (
        <button type="button" onClick={onCancel} style={{ padding: "8px 12px", marginLeft: "5px" }}>
          Cancel
        </button>
      )}
    </form>
  );
}
