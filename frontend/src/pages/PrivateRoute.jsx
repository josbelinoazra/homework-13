import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            navigate("/");
        }
    }, [navigate]);

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <h1>Not Authenticated</h1>
    );
};

export default PrivateRoute;