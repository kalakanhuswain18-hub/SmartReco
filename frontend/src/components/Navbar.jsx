import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-600">
          SmartReco
        </h1>

        <div className="flex gap-8">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Logout
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;