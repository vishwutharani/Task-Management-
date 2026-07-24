import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/EmployeeLogin.css";

function EmployeeLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const login = async () => {
        try {
            const response = await API.post("/auth/login", { email, password });
            if (response.data.user.role === "employee") {
                localStorage.setItem("token", response.data.token);
                if (rememberMe) localStorage.setItem("employeeEmail", email);
                navigate("/employee");
            }
        } catch (error) {
            alert("Invalid Employee Login");
        }
    };

    return (
        <div className="employee-login-container">
            <div className="employee-login-box">
                <h1>Task Manager</h1>
                <h2>Employee Login</h2>
                <p>Access your assigned tasks</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        )}
                    </span>
                </div>
                <div className="options-row">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                </div>
                <button className="login-btn" onClick={login}>Login</button>
                <div className="footer-links">
                    <a href="/employee-register" className="register-link">Create an account</a>
                    <a href="/admin-login" className="switch-login">Admin Login</a>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;