import { Routes, Route } from "react-router-dom";
import Login from "./features/login";
import Editprofile from "./pages/Editprofile";

function Home() {
  return <h1></h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editprofile" element={<Editprofile />} />
    </Routes>
  );
}


export default App;