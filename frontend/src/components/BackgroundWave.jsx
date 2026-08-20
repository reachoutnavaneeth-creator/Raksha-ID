import "./BackgroundWave.css";

export default function BackgroundWave() {
  return (
    <div className="wave-bg">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          className="wave layer1"
          d="M0,520 C250,420 500,650 720,560 C940,470 1180,320 1440,470 L1440,800 L0,800 Z"
        />

        <path
          className="wave layer2"
          d="M0,580 C300,480 650,760 960,620 C1180,520 1320,400 1440,520 L1440,800 L0,800 Z"
        />

        <path
          className="wave layer3"
          d="M0,650 C320,540 680,760 960,680 C1200,620 1360,520 1440,600 L1440,800 L0,800 Z"
        />
      </svg>

      <div className="glow"></div>
    </div>
  );
}