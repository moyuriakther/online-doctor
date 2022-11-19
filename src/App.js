import "./App.css";
import Navbar from "./component/Pages/Shared/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./component/Pages/Home/Home";
import About from "./component/Pages/About/About";
import NotFound from "./component/Pages/NotFound/NotFound";
import Login from "./component/Pages/Login/Login";
import Register from "./component/Pages/Login/Register";
import Appoinment from "./component/Pages/Appoinment/Appoinment";
import RequireAuth from "./component/Pages/Login/RequireAuth";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appoinment />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
