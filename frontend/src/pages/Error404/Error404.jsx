import React from 'react';
import './Error404.css';

const Error404 = () => {
    return (
        <div className="error404-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/" className="error404-home-link">Go to Home</a>
        </div>
    );
};

export default Error404;
