import React from 'react';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you're looking for does not exist.</p>
                <a href="/" className="not-found-link">Go to Home</a>
            </div>
        </div>
    );
}

export default NotFoundPage;
