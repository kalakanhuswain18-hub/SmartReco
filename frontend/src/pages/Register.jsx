import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Registration failed. Please try again."
        );
        return;
      }

      console.log("Registration successful:", data);

      setSuccess("Account created successfully! Redirecting to login...");

      // Go to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error("Registration error:", err);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

          <div className="mb-10">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                🤖
              </div>

              <h1 className="text-3xl font-bold">
                SmartReco
              </h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-5">
              Shop smarter with
              <span className="text-blue-200">
                {" "}AI recommendations.
              </span>
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed">
              Create your account and get personalized product
              recommendations based on your interests and activity.
            </p>

          </div>

          {/* FEATURES */}
          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                ✨
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Personalized Recommendations
                </h3>

                <p className="text-blue-100 text-sm">
                  AI finds products that match your interests.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                ❤️
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Smart Wishlist
                </h3>

                <p className="text-blue-100 text-sm">
                  Save your favorite products for later.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                🛒
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Easy Shopping
                </h3>

                <p className="text-blue-100 text-sm">
                  Discover and buy products easily.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">

          {/* MOBILE LOGO */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">

            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              🤖
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              SmartReco
            </h1>

          </div>

          <div className="max-w-md mx-auto">

            <div className="mb-8">

              <h1 className="text-4xl font-bold text-slate-900 mb-3">
                Create Account
              </h1>

              <p className="text-slate-500">
                Join SmartReco and start discovering products
                made for you.
              </p>

            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleRegister}>

              {/* FULL NAME */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-slate-300 px-4 py-3.5 rounded-xl outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              {/* EMAIL */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 px-4 py-3.5 rounded-xl outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 px-4 py-3.5 rounded-xl outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-semibold text-lg text-white transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            {/* LOGIN */}
            <p className="text-center text-slate-500 mt-7">
              Already have an account?{" "}

              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Login
              </button>

            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;