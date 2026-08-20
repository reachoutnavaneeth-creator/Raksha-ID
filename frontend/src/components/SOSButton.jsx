import "./SOSButton.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function SOSButton() {
  return (
    <div className="sos-section">

      <div className="pulse-ring"></div>
      <div className="pulse-ring delay"></div>

      <button className="sos-button">
        <FaExclamationTriangle className="sos-icon" />
        <span>SOS</span>
      </button>

      <h2>Emergency SOS</h2>

      <p>
        Press immediately during an emergency.
      </p>

    </div>
  );
}