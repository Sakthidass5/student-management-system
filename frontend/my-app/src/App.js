
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import StudentsListPage from "./pages/StudentsListPage";
import Dashboard from "./pages/Dashboard";
import AuditLogsPage from "./pages/AuditLogsPage";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentsImportExportPage from "./pages/StudentsImportExportPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<h2 className="p-4 text-xl font-bold">Welcome Student Management</h2>} />

        {/* Public routes */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/studentsPage" element={<ProtectedRoute><StudentsListPage /></ProtectedRoute>} />
        <Route path="/students/add" element={<ProtectedRoute><AddStudentPage /></ProtectedRoute>} />
        <Route path="/students/edit/:id" element={<ProtectedRoute><EditStudentPage /></ProtectedRoute>} />
        <Route path="/audit-logs" element={<ProtectedRoute><AuditLogsPage /></ProtectedRoute>} />
        <Route path="/StudentsImportExportPage" element={<StudentsImportExportPage />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
