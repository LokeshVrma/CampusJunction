import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   // Fetch user info from backend on mount if a valid session exists
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
                    withCredentials: true, // Send the cookie to authenticate
                });
                setUser(response.data); // Set the user context with the response data
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // If it's a 401 error, it means the user is not authenticated
                    console.log('User is not authenticated');
                    setUser(null); // No user logged in
                } else {
                    console.error('Error fetching user info:', error);
                }
            } finally {
                setLoading(false); // Whether there's an error or not, stop loading
            }
        };

        // Only fetch user data if not already set
        if (!user) {
            fetchUser();
        } else {
            setLoading(false); // If user is already set, stop loading
        }
    }, [user]);

    // Logout function to clear session on the backend and update the frontend state
    const logout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, {}, {
                withCredentials: true, // Send cookies to backend
            });
            setUser(null); // Clear user state after successful logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};
