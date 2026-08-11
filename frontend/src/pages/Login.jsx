  import { useState } from "react";
  import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

  function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();

      setError("");

      if (!email || !password) {
        setError("Please enter email and password.");
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Invalid email or password.");
          return;
        }

        localStorage.setItem("smartreco_user", JSON.stringify(data.user));

        console.log("Login successful:", data);

      navigate("/dashboard", { replace: true });

      } catch (err) {
        console.error("Login error:", err);
        setError(
          "Unable to connect to server. Please make sure backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

            <div className="mb-10">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  🤖
                </div>

                <h1 className="text-3xl font-bold">
                  SmartReco
                </h1>
              </div>

              <h2 className="text-4xl font-bold leading-tight mb-5">
                Smart shopping,
                <br />
                personalized for you.
              </h2>

              <p className="text-blue-100 text-lg leading-relaxed">
                Discover products selected by AI based on your interests,
                searches and shopping activity.
              </p>

            </div>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    AI Recommendations
                  </h3>

                  <p className="text-sm text-blue-100">
                    Products matched to your interests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Personalized Shopping
                  </h3>

                  <p className="text-sm text-blue-100">
                    A shopping experience made for you
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Smart Discovery
                  </h3>

                  <p className="text-sm text-blue-100">
                    Find products you are likely to love
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center">

            <div className="flex md:hidden items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>

              <span className="text-2xl font-bold text-gray-900">
                SmartReco
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back 👋
              </h2>

              <p className="text-gray-500">
                Login to continue your smart shopping journey.
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mb-3">

                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-5 text-white font-semibold py-3.5 rounded-xl shadow-lg transition duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200 hover:-translate-y-0.5"
                }`}
              >
                {loading ? "Logging in..." : "Login →"}
              </button>

            </form>

            <p className="text-center text-gray-500 mt-7">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Create account
              </button>
            </p>

          </div>

        </div>
      </div>
    );
  }

  export default Login;