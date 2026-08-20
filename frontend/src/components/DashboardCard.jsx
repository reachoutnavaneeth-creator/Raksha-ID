import "./DashboardCard.css";

export default function DashboardCard({
  title,
  subtitle,
  icon,
}) {
  return (
    <div className="dashboard-card">

      <div className="dashboard-card-icon">
        {icon}
      </div>

      <div className="dashboard-card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

    </div>
  );
}