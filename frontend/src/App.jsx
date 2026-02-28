import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Domains from './pages/Domains';
import DomainRoles from './pages/DomainRoles';
import RoleAccess from './pages/RoleAccess';
import Roadmap from './pages/Roadmap';
import JobsInternships from './pages/JobsInternships';
import AptitudeDashboard from './pages/AptitudeDashboard';
import ResumePage from './pages/ResumePage';
import InterviewIntelligence from './pages/InterviewIntelligence';
import InterviewPrepHub from './pages/InterviewPrepHub';
import AIChatAssistant from './pages/AIChatAssistant';
import GoogleCallback from './pages/GoogleCallback';

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import RoleLayout from './layouts/RoleLayout';
import ChatBotEnhanced from './components/ChatBotEnhanced';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* The following lines from the provided edit are syntactically incorrect in this context and have been omitted to maintain a functional application.
              await login(email, password);
              navigate('/domains');
              */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/callback" element={<GoogleCallback />} />

              {/* Protected Routes with MainLayout (Dashboard, Domains) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Navigate to="/domains" replace />} />
                  <Route path="/domains" element={<Domains />} />

                  <Route path="/domains/:id" element={<DomainRoles />} />
                  <Route path="/jobs-internships" element={<JobsInternships />} />
                  <Route path="/aptitude" element={<ErrorBoundary><AptitudeDashboard /></ErrorBoundary>} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/interview" element={<InterviewIntelligence />} />
                  <Route path="/interview-prep" element={<InterviewPrepHub />} />
                  <Route path="/ai-assistant" element={<AIChatAssistant />} />


                </Route>

                {/* Protected Routes with RoleLayout (Role Details) */}
                <Route element={<RoleLayout />}>
                  <Route path="/roles/:id" element={<RoleAccess />} />
                  <Route path="/roadmap/:roleId" element={<Roadmap />} />
                </Route>
              </Route>
            </Routes>

            {/* Global AI Chatbot - Available on ALL pages */}
            <ChatBotEnhanced />

          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
