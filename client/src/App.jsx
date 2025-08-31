import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider, useAuth } from './context/AuthContext';

import ProtectedRoute from "./components/ProtectedRoute"
import Loading from "./components/Loading";
import AdminLayout from "./components/AdminLayout";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminChangePassword from "./pages/Admin/AdminChangePassword";
import AdminHome from "./pages/Admin/AdminHome";
import BasicDetails from "./pages/AddData/BasicDetails";
import AcademicsPage from "./pages/AddData/AcademicsPage";
import ExperiencePages from "./pages/AddData/ExperiencePages";
import ProjectsPages from "./pages/AddData/ProjectsPages";
import Home from "./pages/Home";
import CertificatePage from "./pages/AddData/CertificatePage";

function AppRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminRegister />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/forget" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/admin" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="change-password" element={<AdminChangePassword />} />

          <Route path="basic-details" element={<BasicDetails />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="experience" element={<ExperiencePages />} />
          <Route path="projects" element={<ProjectsPages />} />
          <Route path="certificate" element={<CertificatePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}



export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
