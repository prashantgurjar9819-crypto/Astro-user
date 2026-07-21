import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/call" element={<Call />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/liveastro" element={<LiveAstro />} />
      <Route path="/live-astro" element={<LiveAstro />} />
      <Route path="/astro-history" element={<AstroHistory />} />
      <Route path="/booking-history" element={<BookingHistory />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/help-support" element={<HelpSupport />} />
    </Routes>
  );
}

export default App;