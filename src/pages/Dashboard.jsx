
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://task-manager-backend-d3rs.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const tasks = res.data;

      setStats({
        todo: tasks.filter(t => t.status === "Todo").length,
        inProgress: tasks.filter(t => t.status === "In Progress").length,
        completed: tasks.filter(t => t.status === "Completed").length,
      });
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  const chartData = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* STAT CARDS */}
      <div className="dashboard-stats">
        <div className="stat-card todo">
          <h3>Todo</h3>
          <p>{stats.todo}</p>
        </div>

        <div className="stat-card progress">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>

        <div className="stat-card completed">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="chart-card">
        <h3>Task Status Overview</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
