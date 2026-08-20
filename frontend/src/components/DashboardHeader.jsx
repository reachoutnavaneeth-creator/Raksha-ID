import "./DashboardHeader.css";
import { FaBell, FaMapMarkerAlt } from "react-icons/fa";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header">

      <div className="header-left">
        <p className="greeting">Good Evening 👋</p>
        <h2>Dhruv Joshi</h2>

        <div className="status">
          <FaMapMarkerAlt />
          <span>GPS Active</span>
        </div>
      </div>

      <div className="header-right">
        <div className="notification">
          <FaBell />
        </div>

        <img
          src="https://ui-avatars.com/api/?name=Dhruv+Joshi&background=1565C0&color=fff"
          alt="profile"
        />
      </div>

    </div>
  );
}