import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/ai-shopping.png";
function Landing() {
    const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = localStorage.getItem("smartreco_user");

    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="smartreco-landing">

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(13, 110, 253, 0.25);
          }
          50% {
            box-shadow: 0 12px 40px rgba(13, 110, 253, 0.5);
          }
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }

        .smartreco-landing {
          min-height: 100vh;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fbff 0%, #ffffff 55%, #f2f7ff 100%);
        }

        .hero-section {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
        }

        .hero-content {
          animation: fadeUp 0.8s ease-out;
        }

        .hero-title {
          font-size: clamp(42px, 5vw, 68px);
          line-height: 1.08;
          letter-spacing: -2px;
          background: linear-gradient(90deg, #111827, #1769e0, #111827);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 4s linear infinite;
        }

        @keyframes gradientMove {
          to {
            background-position: 200% center;
          }
        }

        .hero-description {
          font-size: 19px;
          line-height: 1.8;
          max-width: 650px;
        }

        .hero-image {
          animation: float 4s ease-in-out infinite;
          filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.12));
          transition: transform 0.4s ease;
        }

        .hero-image:hover {
          transform: scale(1.04);
        }

        .get-started-btn {
          border: none;
          transition: all 0.3s ease;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        .get-started-btn:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 15px 35px rgba(13, 110, 253, 0.4) !important;
        }

        .get-started-btn:active {
          transform: translateY(-1px) scale(0.98);
        }

        .feature-section {
          position: relative;
          padding-bottom: 80px;
        }

        .feature-title {
          animation: fadeUp 0.8s ease-out;
        }

        .feature-card {
          border-radius: 20px !important;
          transition: all 0.35s ease;
          animation: fadeUp 0.8s ease-out;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.9);
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd, #6f42c1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12) !important;
        }

        .feature-icon {
          font-size: 42px;
          display: inline-block;
          margin-bottom: 15px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.2) rotate(-5deg);
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          pointer-events: none;
          opacity: 0.35;
          animation: orbFloat 6s ease-in-out infinite;
        }

        .orb-one {
          width: 100px;
          height: 100px;
          background: #9ec5fe;
          top: 80px;
          left: -40px;
        }

        .orb-two {
          width: 140px;
          height: 140px;
          background: #c5b3ff;
          right: -60px;
          bottom: 50px;
          animation-delay: 1s;
        }

        .smartreco-footer {
          background: linear-gradient(135deg, #111827, #172554);
        }

        @media (max-width: 991px) {
          .hero-section {
            min-height: auto;
            padding-top: 50px;
            padding-bottom: 60px;
          }

          .hero-title {
            letter-spacing: -1;
            width: auto;

          }

          .hero-image {
  animation: float 4s ease-in-out infinite;
  transition: transform 0.4s ease;
  mix-blend-mode: multiply;

  
}
        }
      `}</style>

      <Navbar />

      <section className="hero-section container">

        <div className="floating-orb orb-one"></div>
        <div className="floating-orb orb-two"></div>

        <div className="row align-items-center g-5 w-100">

          <div className="col-lg-7 hero-content">

            <div
              className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-4"
              style={{
                borderRadius: "30px",
                fontSize: "14px"
              }}
            >
              🤖 AI-Powered Personalization
            </div>

            <h1 className="fw-bold mb-4 hero-title">
              AI Shopping
              <br />
              Recommendation
              <br />
              Platform
            </h1>

            <p className="text-secondary mb-4 hero-description">
              Discover products tailored to your interests using intelligent recommendations and user behaviour analysis.
            </p>

           <button
  onClick={handleGetStarted}
  className="btn btn-primary btn-lg px-5 py-3 get-started-btn"
  style={{
    borderRadius: "14px",
    fontWeight: "600"
  }}
>
  Get Started
  <span className="ms-2">→</span>
</button>

          </div>

          <div className="col-lg-5 text-center">

    <img
  src={heroImage}
  alt="AI Recommendation"
  className="img-fluid hero-image"
  style={{
    maxHeight: "540px",
    width: "100%",
    borderRadius: "10%",
  }}
/>

          </div>

        </div>
      </section>

      <section className="container feature-section">

        <div className="text-center feature-title mb-5">

          <span
            className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3"
            style={{ borderRadius: "30px" }}
          >
            Why SmartReco?
          </span>

          <h2 className="fw-bold">
            Intelligence Behind Every Recommendation
          </h2>

          <p className="text-secondary">
            SmartReco understands your behaviour and personalizes your experience.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="card feature-card shadow h-100 border-0">

              <div className="card-body p-4">

                <span className="feature-icon">🤖</span>

                <h4 className="fw-bold">
                  AI Recommendation
                </h4>

                <p className="text-secondary mt-3">
                  Recommend products intelligently based on user interests,
                  browsing history and behaviour.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="card feature-card shadow h-100 border-0"
              style={{ animationDelay: "0.15s" }}
            >

              <div className="card-body p-4">

                <span className="feature-icon">📊</span>

                <h4 className="fw-bold">
                  Behaviour Tracking
                </h4>

                <p className="text-secondary mt-3">
                  Track clicks, searches, views and time spent for better
                  recommendations.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="card feature-card shadow h-100 border-0"
              style={{ animationDelay: "0.3s" }}
            >

              <div className="card-body p-4">

                <span className="feature-icon">🎯</span>

                <h4 className="fw-bold">
                  Personalized Experience
                </h4>

                <p className="text-secondary mt-3">
                  Every user receives personalized recommendations generated
                  using AI.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <footer className="smartreco-footer text-white py-5 mt-5">

        <div className="container text-center">

          <h3 className="fw-bold">
            🤖 SmartReco
          </h3>

          <p className="text-light mt-2">
            AI Powered Recommendation Platform
          </p>

          <div className="my-4">
            <span className="mx-2">AI</span>
            <span className="mx-2">•</span>
            <span className="mx-2">Behavior</span>
            <span className="mx-2">•</span>
            <span className="mx-2">Personalization</span>
          </div>

          <small className="text-secondary">
            © 2026 SmartReco. All Rights Reserved.
          </small>

        </div>

      </footer>

    </div>
  );
}

export default Landing;