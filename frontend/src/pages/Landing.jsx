import heroImage from "../assets/ai-shopping.svg";
function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">

        <h1 className="text-3xl font-bold text-blue-600">
          SmartReco
        </h1>

        <div className="space-x-4">
          <button className="px-5 py-2 rounded-lg text-blue-600 border border-blue-600">
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white">
            Register
          </button>
        </div>

      </nav>

     <section className="max-w-7xl mx-auto px-8 py-20">

  <div className="grid md:grid-cols-2 gap-16 items-center">

    <div  className="space-y-8">

     <h1 className="text-6xl font-bold leading-tight text-slate-800">
        AI Powered Recommendation Platform
      </h1>

      <p className="text-xl leading-9 text-slate-600">
        Discover products tailored to your interests using intelligent
        recommendation and user behaviour analysis.
      </p>

     <button
    onClick={() => alert("Login page coming soon")}
    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white text-lg font-medium"
>
    Get Started
</button>

    </div>

   <div className="flex justify-center">

      <img
        src={heroImage}
        alt="AI Recommendation"
        className="w-[520px]"
      />

</div>

  </div>

</section>
<section className="max-w-7xl mx-auto px-8 py-24">

  <h2 className="text-4xl font-bold text-center text-slate-800 mb-14">
    Why Choose SmartReco?
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

      <h3 className="text-2xl font-semibold mb-4">
        AI Recommendation
      </h3>

      <p className="text-slate-600 leading-7">
        Recommend products intelligently based on browsing history and user interests.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

      <h3 className="text-2xl font-semibold mb-4">
        Behaviour Tracking
      </h3>

      <p className="text-slate-600 leading-7">
        Monitor user interactions like clicks, views and time spent to improve recommendations.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300">

      <h3 className="text-2xl font-semibold mb-4">
        Personalized Experience
      </h3>

      <p className="text-slate-600 leading-7">
        Every user receives unique product suggestions tailored to their activity.
      </p>

    </div>

  </div>

</section>
<footer className="bg-slate-900 text-white py-8">

  <div className="max-w-7xl mx-auto text-center">

    <h2 className="text-2xl font-bold">
      SmartReco
    </h2>

    <p className="mt-3 text-slate-400">
      AI Powered Recommendation Platform
    </p>

    <p className="mt-6 text-sm text-slate-500">
      © 2026 SmartReco. All rights reserved.
    </p>

  </div>

</footer>

    </div>
  );
}

export default Landing;