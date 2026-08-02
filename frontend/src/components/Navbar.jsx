import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-2" to="/">
          SmartReco
        </Link>

        <button
  className="navbar-toggler"
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
  className="btn btn-outline-primary w-lg-auto"
>
  Login
</Link>

          <Link
  to="/register"
  className="btn btn-primary w-lg-auto"
>
  Register
</Link>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;