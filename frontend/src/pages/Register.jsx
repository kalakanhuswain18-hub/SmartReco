function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white shadow-lg rounded-xl p-10 w-[450px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;