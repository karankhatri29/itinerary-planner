import React, { useState, useEffect } from "react";
import "./password.css"; // Importing CSS


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [credentials, setCredentials] = useState([]);

    // Load credentials from JSON file
    useEffect(() => {
        fetch("../public/data/credentials.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load credentials.");
                }
                return response.json();
            })
            .then((data) => setCredentials(data))
            .catch((error) => console.error("Error loading credentials:", error));
    }, []);

    // Auto-fill email if user selected "Remember Me"
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberMe");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the entered email and password match the credentials
        const user = credentials.find((cred) => cred.email === email && cred.password === password);

        if (user) {
            setErrorMessage("");
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(user));

            if (rememberMe) {
                localStorage.setItem("rememberMe", email);
            } else {
                localStorage.removeItem("rememberMe");
            }

            alert("Login successful!");
            // window.location.href = "/index"; // Redirect after login
        } else {
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h3 className="login-title">Login to Your Account</h3>
                {errorMessage && <div className="alert">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <div className="links">
                    <a href="/forgot-password">Forgot password?</a>
                    <p>Don't have an account? <a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
