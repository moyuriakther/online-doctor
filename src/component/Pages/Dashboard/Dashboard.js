import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h1 className="text-2xl font-bold text-secondary">
          Welcome To Your Dashboard
        </h1>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-dashboard" className="drawer-overlay"></label>
        <ul className="menu p-4 w-48 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/review">My Reviews</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
