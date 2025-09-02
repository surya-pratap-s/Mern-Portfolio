// App.js
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AuthProvider, useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

// ✅ Lazy imports for pages & layouts
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/Admin/AdminRegister"));
const AdminChangePassword = lazy(() => import("./pages/Admin/AdminChangePassword"));
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));

const BasicDetails = lazy(() => import("./pages/AddData/BasicDetails"));
const AcademicsPage = lazy(() => import("./pages/AddData/AcademicsPage"));
const ExperiencePages = lazy(() => import("./pages/AddData/ExperiencePages"));
const ProjectsPages = lazy(() => import("./pages/AddData/ProjectsPages"));
const CertificatePage = lazy(() => import("./pages/AddData/CertificatePage"));

const Home = lazy(() => import("./pages/Home"));

// ✅ Routes Component
function AppRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminRegister />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/forget" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/admin" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>

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

// ✅ Main App Component
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
