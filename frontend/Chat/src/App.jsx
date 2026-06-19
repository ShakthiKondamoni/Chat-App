import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

import HomePage from "./Pages/HomePage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import CallPage from "./Pages/CallPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-200 text-base-content" data-theme="night">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/call/:id"
            element={
              <ProtectedRoute>
                <CallPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
};

export default App;