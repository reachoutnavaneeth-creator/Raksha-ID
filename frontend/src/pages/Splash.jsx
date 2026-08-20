import logo from "../assets/logo.png";
import "./Splash.css";

import BackgroundWave from "../components/BackgroundWave";
import SplashCard from "../components/SplashCard";
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundWave />

      <div className="splash">
        <div className="dots dots-top"></div>
        <div className="dots dots-bottom"></div>

        <SplashCard>
          <img
            src={logo}
            className="logo"
            alt="RakshaID Logo"
          />

          <h1>RakshaID</h1>

          <div className="divider">
            <span></span>
            <div className="shield">+</div>
            <span></span>
          </div>

          <p className="tagline">
            Secure Emergency
            <br />
            Digital Identity
          </p>

          <hr />

          <div className="button-group">
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
            >
              Existing User
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              New User
            </Button>
          </div>
        </SplashCard>
      </div>
    </>
  );
}

export default Splash;