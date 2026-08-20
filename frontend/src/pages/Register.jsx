import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Register() {
  return (
    <div className="register-page">

      <div className="register-card">

        <img src={logo} alt="RakshaID" className="register-logo" />

        <h1>Create Account</h1>

        <p>
          Register for RakshaID
        </p>

        <form>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
          />

          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter Mobile Number"
          />

          <label>Email (Optional)</label>
          <input
            type="email"
            placeholder="Enter Email"
          />

          <label>Emergency Contact</label>
          <input
            type="text"
            placeholder="Emergency Contact Number"
          />

          <label>Relation</label>

          <select>

            <option>Father</option>
            <option>Mother</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Friend</option>
            <option>Spouse</option>

          </select>

          <label>Address</label>

          <textarea
            rows="3"
            placeholder="Enter Address"
          ></textarea>

          <button className="register-btn">
            Register
          </button>

        </form>

        <div className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}