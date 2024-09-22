import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// Protected Route component
const ProtectedRoute = ({ element }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <p>Loading...</p>; // Optional: You can add a loading spinner here
    }

    return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
