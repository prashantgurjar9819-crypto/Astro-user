import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/login";
import EditProfile from "./pages/EditProfile";
import Otp from "./features/Otp";
import Chat from "./pages/Chat";
 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    
      <Route path="/otp" element={<Otp />} />
      <Route path="/editprofile" element={<EditProfile />} />
        {/* Chat Screen */}
        <Route path="/chat" element={<Chat />} />
     
    </Routes>
  );
}

export default App;