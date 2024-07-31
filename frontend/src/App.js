import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import "./index.css";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
