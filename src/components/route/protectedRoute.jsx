import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isValidUser = users.some(
    (user) =>
      user.email === currentUser?.email &&
      user.password === currentUser?.password
  );

  return isValidUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
