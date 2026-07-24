import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeRegister from "./pages/EmployeeRegister"; // NEW
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin-login" />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/employee-register" element={<EmployeeRegister />} /> {/* NEW */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/employee" element={<EmployeeDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;