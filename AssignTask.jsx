import { useState } from "react";
import API from "../api/axios";

function AssignTask({ employees, refresh }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [employee, setEmployee] = useState("");
    const [loading, setLoading] = useState(false);

    const assignTask = async () => {
        if (!employee) {
            alert("Please select an employee");
            return;
        }
        setLoading(true);
        try {
            await API.post("/tasks", {
                title,
                description,
                priority,
                employeeId: employee
            });
            alert("✅ Task assigned successfully!");
            setTitle("");
            setDescription("");
            setPriority("Medium");
            setEmployee("");
            refresh();
        } catch (error) {
            alert("❌ Failed to assign task");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assign-card">
            <h3>📌 Assign New Task</h3>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
            />
            <div className="select-group">
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp._id} value={emp._id}>{emp.name}</option>
                    ))}
                </select>
            </div>
            <button className="assign-btn" onClick={assignTask} disabled={loading}>
                {loading ? "Assigning..." : "Assign Task"}
            </button>
        </div>
    );
}

export default AssignTask;