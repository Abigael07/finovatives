import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Context
import { CartProvider } from './context/CartContext';

// Pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import InstructorCourseUpload from './pages/InstructorCourseUpload';
import CoursesListPage from './pages/CoursesListPage';
import EditCoursePage from './pages/EditCoursePage';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Messages from './pages/Messages';
import Home from './pages/Home';
import FinancialHelp from './pages/FinancialHelp';
import AdminMessages from './pages/AdminMessages';
import CourseDetails from './pages/CourseDetails';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import UploadedCourses from './pages/UploadedCourses';
import AuthPage from './pages/AuthPage';
import HelpCenter from './pages/HelpCenter';
import SchedulePage from './pages/SchedulePage';
import Inbox from './pages/Inbox';
import BusinessDataAnalyticsCourse from './pages/BusinessDataAnalyticsCourse';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload-course" element={<InstructorCourseUpload />} />
        <Route path="/courses" element={<CoursesListPage />} />
        <Route path="/edit-course/:id" element={<EditCoursePage />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/help" element={<FinancialHelp />} />
        <Route path="/instructor/messages" element={<AdminMessages />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/uploaded-courses" element={<UploadedCourses />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/financial-help" element={<FinancialHelp />} />
        <Route path="/support" element={<HelpCenter />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/messages" element={<Inbox />} />
        <Route path="/course/business-data-analytics" element={<BusinessDataAnalyticsCourse />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
