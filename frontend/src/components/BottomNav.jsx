import "./BottomNav.css";
import {
  FaHome,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function BottomNav() {
  return (
    <div className="bottom-nav">

      <div className="nav-item active">
        <FaHome />
        <span>Dashboard</span>
      </div>

      <div className="nav-item">
        <FaMapMarkerAlt />
        <span>Location</span>
      </div>

      <div className="nav-item">
        <FaShieldAlt />
        <span>Safety Tips</span>
      </div>

      <div className="nav-item">
        <FaUserCircle />
        <span>Profile</span>
      </div>

    </div>
  );
}