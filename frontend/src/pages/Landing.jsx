import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/ai-shopping.svg";

function Landing() {
  return (
    <div className="bg-light">

      <Navbar />

      <section className="container py-5">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <h1 className="display-4 fw-bold mb-4">
              AI Powered Recommendation Platform
            </h1>

            <p className="lead text-secondary mb-4">
              Discover products tailored to your interests using intelligent
              recommendation and user behaviour analysis.
            </p>

            <Link
              to="/login"
              className="btn btn-primary btn-lg px-4"
            >
              Get Started
            </Link>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src={heroImage}
              alt="AI Recommendation"
              className="img-fluid"
              style={{ maxHeight: "500px" }}
            />

          </div>

        </div>

      </section>

      

      <section className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Why Choose SmartReco?
        </h2>

        <div className="row g-4">

          <div className="col-md-4">

           <div className="card feature-card shadow h-100 border-0">

              <div className="card-body">

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

            <div className="card feature-card shadow h-100 border-0">

              <div className="card-body">

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

           <div className="card feature-card shadow h-100 border-0">

              <div className="card-body">

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

     

      <footer className="bg-dark text-white py-4 mt-5">

        <div className="container text-center">

          <h3 className="fw-bold">
            SmartReco
          </h3>

          <p className="text-light">
            AI Powered Recommendation Platform
          </p>

          <small className="text-secondary">
            © 2026 SmartReco. All Rights Reserved.
          </small>

        </div>

      </footer>

    </div>
  );
}

export default Landing;