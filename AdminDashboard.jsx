import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function AdminDashboard() {
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // Assignment form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [employeeId, setEmployeeId] = useState("");
    const [assigning, setAssigning] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // ✅ FIXED endpoints
            const [empRes, taskRes] = await Promise.all([
                API.get("/admin/employees"),    // was /users/employees
                API.get("/tasks/all"),          // was /tasks
            ]);
            setEmployees(empRes.data);
            setTasks(taskRes.data.tasks || taskRes.data); // taskRes.data is an object with {tasks, totalPages, ...}
        } catch (err) {
            console.error("Error loading data:", err);
            alert("Failed to load data. Check console.");
        } finally {
            setLoading(false);
        }
    };

    // Stats
    const stats = {
        total: tasks.length,
        notStarted: tasks.filter(t => t.status === "Not Started").length,
        pending: tasks.filter(t => t.status === "Pending").length,
        completed: tasks.filter(t => t.status === "Completed").length,
    };

    // Filter tasks
    const filteredTasks = useMemo(() => {
        if (!searchTerm) return tasks;
        const term = searchTerm.toLowerCase();
        return tasks.filter(
            t =>
                t.title.toLowerCase().includes(term) ||
                t.description?.toLowerCase().includes(term) ||
                t.assignedTo?.name?.toLowerCase().includes(term)
        );
    }, [tasks, searchTerm]);

    // Paginate
    const totalPages = Math.ceil(filteredTasks.length / pageSize);
    const paginatedTasks = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTasks.slice(start, start + pageSize);
    }, [filteredTasks, currentPage, pageSize]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // ✅ Assign task - corrected endpoint
    const handleAssign = async (e) => {
        e.preventDefault();
        if (!employeeId) return alert("Select an employee");
        setAssigning(true);
        try {
            await API.post("/tasks/assign", {
                title,
                description,
                priority,
                assignedTo: employeeId,   // backend expects "assignedTo"
            });
            alert("✅ Task assigned");
            setTitle("");
            setDescription("");
            setPriority("Medium");
            setEmployeeId("");
            loadData();
        } catch (err) {
            alert("❌ Failed to assign");
            console.error(err);
        } finally {
            setAssigning(false);
        }
    };

    // Update status
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/tasks/${id}`, { status });
            loadData();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Delete task – if backend has delete route (optional)
    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            await API.delete(`/tasks/${id}`);
            loadData();
        } catch (err) {
            alert("❌ Delete failed");
        }
    };

    const user = { name: "Admin" };

    return (
        <div className="dashboard">
            <Navbar user={user} />
            <div className="dashboard-content">
                <div className="welcome-header">
                    <h1>👋 Welcome back, Admin</h1>
                    <p>Here's what's happening with your tasks today.</p>
                </div>

                <div className="stats-search-row">
                    <div className="stats-grid">
                        <div className="stat-card total">
                            <span className="stat-icon">📊</span>
                            <div>
                                <h3>Total Tasks</h3>
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

                {/* Assign Task Form */}
                <div className="assign-card">
                    <div className="assign-header">
                        <h3>📌 Assign New Task</h3>
                        <span className="assign-subtitle">Fill in the details below</span>
                    </div>
                    <form onSubmit={handleAssign} className="assign-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Task Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Design homepage"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Assign to</label>
                                <select
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    required
                                >
                                    <option value="">Select employee</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.name} ({emp.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    placeholder="Detailed description of the task..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="assign-btn" disabled={assigning}>
                                {assigning ? "Assigning..." : "Assign Task"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Task Table */}
                <div className="table-container">
                    <div className="table-header">
                        <h3>📋 All Tasks</h3>
                        <span className="task-count">{filteredTasks.length} tasks</span>
                    </div>
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTasks.map(task => (
                                <tr key={task._id}>
                                    <td><strong>{task.title}</strong></td>
                                    <td>{task.description || "—"}</td>
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
                                    <td>{task.assignedTo?.name || "Unassigned"}</td>
                                    <td className="actions-cell">
                                        <select
                                            value={task.status}
                                            onChange={(e) => updateStatus(task._id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option>Not Started</option>
                                            <option>Pending</option>
                                            <option>Completed</option>
                                        </select>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteTask(task._id)}
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTasks.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="empty-state">
                                        {searchTerm ? "No tasks match your search." : "No tasks yet. Create one above!"}
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

export default AdminDashboard;