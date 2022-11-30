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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./component/Pages/Dashboard/Dashboard";
import MyAppointment from "./component/Pages/Dashboard/MyAppointment";
import MyReview from "./component/Pages/Dashboard/MyReview";
import MyHistory from "./component/Pages/Dashboard/MyHistory";
import AllUsers from "./component/Pages/Dashboard/AllUsers";

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
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointment />}></Route>
          <Route path="review" element={<MyReview />}></Route>
          <Route path="history" element={<MyHistory />}></Route>
          <Route path="users" element={<AllUsers />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
