import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginRequiredModal from "./component/LoginRequiredModal";
import Home from "./pages/Home";
import Login from "./features/login";
import EditProfile from "./pages/EditProfile";
import Otp from "./features/Otp";
import Chat from "./pages/Chat";
import Call from "./pages/call";
import Profile from "./pages/Profile";
import AstroHistory from "./pages/AstroHistory";
import BookingHistory from "./pages/BookingHistory";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import LiveAstro from "./pages/LiveAstro";

function ProtectedRoute({ children, featureName }) {
  const { isLoggedIn, triggerLoginModal, justLoggedOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && !justLoggedOut) {
      triggerLoginModal(featureName, location.pathname);
    }
  }, [isLoggedIn, justLoggedOut, triggerLoginModal, featureName, location.pathname]);

  if (!isLoggedIn) {
    const redirectPath = justLoggedOut ? "/login" : "/home";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

function InitialRedirect() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InitialRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute featureName="Profile">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute featureName="Edit Profile">
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-history"
          element={
            <ProtectedRoute featureName="Booking History">
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/astro-history"
          element={
            <ProtectedRoute featureName="Astro History">
              <AstroHistory />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/call" element={<Call />} />
        <Route path="/liveastro" element={<LiveAstro />} />
        <Route path="/live-astro" element={<LiveAstro />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help-support" element={<HelpSupport />} />
      </Routes>
      <LoginRequiredModal />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;