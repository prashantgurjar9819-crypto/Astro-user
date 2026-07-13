import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/login";
import EditProfile from "./pages/EditProfile";
import Otp from "./features/Otp";
import Chat from "./pages/Chat";
import Call from "./pages/call";
import Profile from "./pages/Profile";
import AstroHistory from "./pages/AstroHistory";
import LiveAstro from "./pages/LiveAstro";

function App() {
  return (
    <Routes>
      <Route path="/liveastro" element={<LiveAstro />} />
      <Route path="/astro-history" element={<AstroHistory />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/call" element={<Call />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}




export default App;