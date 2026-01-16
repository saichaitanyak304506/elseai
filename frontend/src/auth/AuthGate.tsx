import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthGate = () => {
  const userId = localStorage.getItem("user_id");

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={userId ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={userId ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Protected routes */}
      <Route
        path="/*"
        element={userId ? <App /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AuthGate;
