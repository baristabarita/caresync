import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface UserAuthProps {
  children: ReactNode;
}

const UserAuth: React.FC<UserAuthProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("accessToken"); // checking if user has accessToken

  if (!isAuthenticated) {
    // Redirect to the login page, saving the location they were trying to go to
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default UserAuth;
