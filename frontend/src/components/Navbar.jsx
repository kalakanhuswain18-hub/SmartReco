import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .smartreco-navbar {
          background: white;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.10);
          position: relative;
          z-index: 1000;
        }

        .smartreco-brand {
          transition: all 0.3s ease;
        }

        .smartreco-brand:hover {
          transform: translateY(-1px);
        }

        .nav-login-btn,
        .nav-register-btn {
          border-radius: 10px !important;
          padding: 9px 20px !important;
          font-weight: 600 !important;
          transition: all 0.25s ease !important;
        }

        .nav-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(13, 110, 253, 0.18);
        }

        .nav-register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 18px rgba(13, 110, 253, 0.35);
        }

        .nav-login-btn:active,
        .nav-register-btn:active {
          transform: translateY(0);
        }

        .smartreco-toggler {
          border: none !important;
          font-size: 25px;
          padding: 5px 10px;
        }

        .smartreco-toggler:focus {
          box-shadow: none !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg smartreco-navbar">
        <div className="container">

          <Link
            className="navbar-brand fw-bold fs-2 smartreco-brand"
            to="/"
          >
            SmartReco
          </Link>

          <button
            className="navbar-toggler smartreco-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div
            className={`${
              menuOpen ? "d-block" : "d-none"
            } d-lg-flex w-100`}
          >
            <div className="ms-lg-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

              <Link
                to="/login"
                className="btn btn-outline-primary nav-login-btn w-lg-auto"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary nav-register-btn w-lg-auto"
              >
                Register
              </Link>

            </div>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;