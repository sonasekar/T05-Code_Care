import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import RoleSelection from './components/Auth/RoleSelection';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import StudentDashboard from './components/Student/Dashboard';
import TeamDetails from './components/Student/TeamDetails';
import AbstractSubmission from './components/Student/AbstractSubmission';
import PatentUpload from './components/Student/PatentUpload';
import ExpoPreparation from './components/Student/ExpoPreparation';
import EventRegistration from './components/Student/EventRegistration';

import AdminDashboard from './components/Admin/Dashboard';
import AbstractReview from './components/Admin/AbstractReview';
import PatentReview from './components/Admin/PatentReview';

import CompanyDashboard from './components/Company/Dashboard';
import InvestorDashboard from './components/Investor/Dashboard';
import LandownerDashboard from './components/Landowner/Dashboard';
import ResultsDashboard from './components/Results/Dashboard';



import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import ProtectedRoute from './components/Shared/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div
          className="app-container"
          style={{
            backgroundImage: "url('/OIG1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh"
          }}
        >
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
             


              {/* Protected Student Routes */}
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/team" element={<TeamDetails />} />
                <Route path="/student/abstract" element={<AbstractSubmission />} />
                <Route path="/student/patent" element={<PatentUpload />} />
                <Route path="/student/expo-preparation" element={<ExpoPreparation />} />
                <Route path="/student/event-registration" element={<EventRegistration />} />
              
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/abstract-review" element={<AbstractReview />} />
                <Route path="/admin/patent-review" element={<PatentReview />} />
              </Route>

              {/* Protected Company Routes */}
              <Route element={<ProtectedRoute allowedRoles={['company']} />}>
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
              </Route>

              {/* Protected Investor Routes */}
              <Route element={<ProtectedRoute allowedRoles={['investor']} />}>
                <Route path="/investor/dashboard" element={<InvestorDashboard />} />
              </Route>
              {/* Protected Landowner Routes */}
              <Route element={<ProtectedRoute allowedRoles={['landowner']} />}>
                <Route path="/landowner/dashboard" element={<LandownerDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['results']} />}>
                <Route path="/results/dashboard" element={<ResultsDashboard />} />
              </Route>



            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;