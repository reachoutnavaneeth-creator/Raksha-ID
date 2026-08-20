import "./Dashboard.css";

import DashboardHeader from "../components/DashboardHeader";
import SOSButton from "../components/SOSButton";
import DashboardCard from "../components/DashboardCard";
import BottomNav from "../components/BottomNav";

import {
  FaUser,
  FaHeartbeat,
  FaHistory,
  FaCog,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-page">

        <DashboardHeader />

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <h2>Welcome back!</h2>
          <p>Stay safe, help is just a tap away.</p>
        </div>

        <SOSButton />

        <DashboardCard
          title="Emergency Contacts"
          subtitle="View and manage contacts"
          icon={<FaUser />}
        />

        <DashboardCard
          title="Medical Records"
          subtitle="View health information"
          icon={<FaHeartbeat />}
        />

        <DashboardCard
          title="SOS History"
          subtitle="Past emergency alerts"
          icon={<FaHistory />}
        />

        <DashboardCard
          title="Settings"
          subtitle="Manage app preferences"
          icon={<FaCog />}
        />

      </div>

      <BottomNav />
    </>
  );
}