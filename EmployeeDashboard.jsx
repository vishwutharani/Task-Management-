import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function EmployeeDashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        setLoading(true);
        try {
            // ✅ Updated to new employee endpoint
            const res = await API.get("/employee/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            // ✅ Updated to new employee endpoint
            await API.put(`/employee/tasks/${id}`, { status });
            getTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const stats = {
        total: tasks.length,
        notStarted: tasks.filter(t => t.status === "Not Started").length,
        pending: tasks.filter(t => t.status === "Pending").length,
        completed: tasks.filter(t => t.status === "Completed").length,
    };

    const filteredTasks = useMemo(() => {
        if (!searchTerm) return tasks;
        const term = searchTerm.toLowerCase();
        return tasks.filter(t => t.title.toLowerCase().includes(term));
    }, [tasks, searchTerm]);

    const totalPages = Math.ceil(filteredTasks.length / pageSize);
    const paginatedTasks = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTasks.slice(start, start + pageSize);
    }, [filteredTasks, currentPage, pageSize]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const user = { name: "Employee" };

    return (
        <div className="dashboard">
            <Navbar user={user} />
            <div className="dashboard-content">
                <div className="welcome-header">
                    <h1>👋 Welcome, Employee</h1>
                    <p>Here are your assigned tasks.</p>
                </div>

                <div className="stats-search-row">
                    <div className="stats-grid">
                        <div className="stat-card total">
                            <span className="stat-icon">📋</span>
                            <div>
                                <h3>Total</h3>
                                <p>{stats.total}</p>
                            </div>
                        </div>
                        <div className="stat-card not-started">
                            <span className="stat-icon">⏳</span>
                            <div>
                                <h3>Not Started</h3>
                                <p>{stats.notStarted}</p>
                            </div>
                        </div>
                        <div className="stat-card pending">
                            <span className="stat-icon">🔄</span>
                            <div>
                                <h3>Pending</h3>
                                <p>{stats.pending}</p>
                            </div>
                        </div>
                        <div className="stat-card completed">
                            <span className="stat-icon">✅</span>
                            <div>
                                <h3>Completed</h3>
                                <p>{stats.completed}</p>
                            </div>
                        </div>
                    </div>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="🔍 Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="table-container">
                    <div className="table-header">
                        <h3>📋 My Tasks</h3>
                        <span className="task-count">{filteredTasks.length} tasks</span>
                    </div>
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTasks.map(task => (
                                <tr key={task._id}>
                                    <td><strong>{task.title}</strong></td>
                                    <td>
                                        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${task.status.replace(/\s/g, "").toLowerCase()}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={task.status}
                                            onChange={(e) => updateStatus(task._id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option>Not Started</option>
                                            <option>Pending</option>
                                            <option>Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {filteredTasks.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="empty-state">
                                        {searchTerm ? "No tasks match your search." : "No tasks assigned yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                ◀ Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next ▶
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;