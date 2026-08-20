import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OTP.css";

export default function OTP() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    const handleVerify = () => {

        if (otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }

        // Temporary frontend verification
        navigate("/dashboard");
    };

    return (

        <div className="otp-page">

            <div className="otp-card">

                <h1>OTP Verification</h1>

                <p>
                    Enter the 6-digit OTP sent to your mobile number.
                </p>

                <input
                    type="text"
                    maxLength="6"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    className="verify-btn"
                    onClick={handleVerify}
                >
                    Verify OTP
                </button>

            </div>

        </div>

    );

}