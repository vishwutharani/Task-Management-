function TaskTable({ tasks }) {
    return (
        <div className="table-container">
            <h3>📋 All Tasks</h3>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
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
                            <td>{task.employeeId?.name || "Unassigned"}</td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;