import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  
useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      accountOpen &&
      !event.target.closest(".account-wrapper")
    ) {
      setAccountOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [accountOpen]);
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("smartreco_user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("smartreco_user");

    setAccountOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

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

        .account-wrapper {
          position: relative;
        }

        .account-btn {
          border: 1px solid #0d6efd;
          background: white;
          color: #0d6efd;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .account-btn:hover {
          background: #0d6efd;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(13, 110, 253, 0.20);
        }

        .account-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          padding: 10px;
          z-index: 2000;
        }

        .account-header {
          padding: 10px 12px;
          border-bottom: 1px solid #eee;
          margin-bottom: 6px;
        }

        .account-header strong {
          display: block;
          color: #111827;
          font-size: 15px;
        }

        .account-header span {
          display: block;
          color: #6b7280;
          font-size: 13px;
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .account-dropdown a,
        .account-dropdown button {
          display: block;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          text-align: left;
          text-decoration: none;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .account-dropdown a:hover,
        .account-dropdown button:hover {
          background: #f3f6ff;
          color: #0d6efd;
        }

        .logout-item {
          color: #dc3545 !important;
        }

        .logout-item:hover {
          background: #fff1f2 !important;
          color: #dc3545 !important;
        }

        .smartreco-toggler {
          border: none !important;
          font-size: 25px;
          padding: 5px 10px;
        }

        .smartreco-toggler:focus {
          box-shadow: none !important;
        }

        @media (max-width: 991px) {
          .account-wrapper {
            width: 100%;
          }

          .account-btn {
            width: 100%;
            text-align: left;
          }

          .account-dropdown {
            position: static;
            width: 100%;
            margin-top: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.10);
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg smartreco-navbar">
        <div className="container">

          {/* Logo */}
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

              {/* NOT LOGGED IN */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary nav-login-btn w-lg-auto"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-primary nav-register-btn w-lg-auto"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                /* LOGGED IN */
                <div className="account-wrapper">

                  <button
                    className="account-btn"
                    onClick={() => setAccountOpen(!accountOpen)}
                  >
                    👤 {user.username || "Account"} ▾
                  </button>

                  {accountOpen && (
                    <div className="account-dropdown">

                      {/* User Info */}
                      <div className="account-header">
                        <strong>
                          {user.username || "SmartReco User"}
                        </strong>

                        <span>
                          {user.email || "Account"}
                        </span>
                      </div>

                      {/* Profile */}
                      <Link
                        to="/profile"
                        onClick={() => {
                          setAccountOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        👤 &nbsp; My Profile
                      </Link>

                      {/* Orders */}
                      <Link
                        to="/orders"
                        onClick={() => {
                          setAccountOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        📦 &nbsp; My Orders
                      </Link>

                      {/* Wishlist */}
                      <Link
                        to="/wishlist"
                        onClick={() => {
                          setAccountOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        ❤️ &nbsp; Wishlist
                      </Link>

                      <hr />

                      {/* Logout */}
                      <button
                        className="logout-item"
                        onClick={handleLogout}
                      >
                        🚪 &nbsp; Logout
                      </button>

                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;