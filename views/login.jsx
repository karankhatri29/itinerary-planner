import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="container py-5 bg-light">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3 className="mb-0">Login to Your Account</h3>
                        </div>
                        <div className="card-body p-4">
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <div className="text-center mb-3">
                                    <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
                                </div>
                            </form>
                            <div className="social-login">
                                <div className="divider d-flex align-items-center mb-3">
                                    <span className="mx-2 text-muted">Or login with</span>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-outline-primary w-100">
                                            <i className="bi bi-facebook me-2"></i>Facebook
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-outline-danger w-100">
                                            <i className="bi bi-google me-2"></i>Google
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-white text-center py-3">
                            <p className="mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;