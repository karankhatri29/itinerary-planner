import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ statusCode = 500, message = 'Something went wrong', description = 'We encountered an unexpected error while processing your request.' }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow text-center">
                            <div className="card-body p-5">
                                <div className="error-icon mb-4">
                                    <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '5rem' }}></i>
                                </div>
                                <h1 className="mb-3">{statusCode}</h1>
                                <h2 className="mb-4">{message}</h2>
                                <p className="lead mb-4">{description}</p>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <a href="/" className="btn btn-primary">Go to Home</a>
                                    <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;