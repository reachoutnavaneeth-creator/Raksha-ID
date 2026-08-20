import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

export default function Login() {
  
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>
        <p className="subtitle">
          Login to your RakshaID account
        </p>

        <label>Mobile Number</label>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button size="large" className="send-otp-btn"
          onClick={() => {
          if (mobile.length === 10) {
            navigate("/otp");
          } else {
            alert("Enter a valid 10 digit mobile number");
          }
          }}
        >
        Send OTP
          </button>

        <div className="divider">
          OR
        </div>

        <Link to="/register" className="register-link">
          Create New Account
        </Link>

      </div>
    </div>
  );
}