import "../App.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
function formatCategory(category) {

  return category
    .split("-")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

}
function Dashboard() {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [profileOpen, setProfileOpen] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
const [recentActivity, setRecentActivity] = useState([]);
const [aiRecommendation, setAiRecommendation] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const saveSearchEvent = async (query) => {
  if (!user?.id || !query.trim()) return;

  try {
    await fetch("http://127.0.0.1:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        event_type: "search",
        search_query: query.trim(),
      }),
    });
  } catch (error) {
    console.error("Search event error:", error);
  }
};
  useEffect(() => {

  async function loadDashboardData() {

    try {

      const data = await getProducts();

      const mappedProducts = data.map((item) => ({
        id: item.id,
        title: item.name,
        image: item.image,
        images: item.image ? [item.image] : [],
        price: item.price,
        description: item.description,
        category: item.category,
        rating: item.rating || 4.5,
        reviews: Math.floor(Math.random() * 500) + 100,
        score:0,
      }));

      setProducts(mappedProducts);
      setTimeout(() => {
  setLoading(false);
}, 1000);

     const userData = JSON.parse(
  localStorage.getItem("smartreco_user") || "null"
);
      if (userData?.id) {

        const insightResponse = await fetch(
          `http://127.0.0.1:5000/insights/${userData.id}`
        );

        if (insightResponse.ok) {

const insightData = await insightResponse.json();

setAiInsights(insightData);

const favoriteCategory = insightData.favorite_category;
const categoryScores = insightData.category_scores || {};

const personalizedProducts = mappedProducts.map((product) => {
  let score = 40;

  if (categoryScores[product.category] !== undefined) {
    score = Number(categoryScores[product.category]);
  }

  if (favoriteCategory && product.category === favoriteCategory) {
    score += 15;
  }

  score = Math.min(99, Math.max(1, Math.round(score)));

  return {
    ...product,
    score,
  };
});

setProducts(personalizedProducts);

}


        const eventResponse = await fetch(
          `http://127.0.0.1:5000/events/${userData.id}`
        );

        if (eventResponse.ok) {

          const eventData = await eventResponse.json();

          setRecentActivity(eventData.slice(0, 5));
        }
const recommendationResponse = await fetch(
  `http://127.0.0.1:5000/recommend/agent/${userData.id}`
);

if (recommendationResponse.ok) {
  const recommendationData = await recommendationResponse.json();
  setAiRecommendation(recommendationData);
}
      }

    } catch (error) {

      console.error(
        "Dashboard loading error:",
        error
      );

    } finally {

      setLoading(false);

    }
  }

  loadDashboardData();

}, []);
const filteredProducts = products.filter((product) => {
  const searchText = search.toLowerCase().trim();

  const matchSearch =
    searchText === "" ||
    product.title?.toLowerCase().includes(searchText) ||
    product.category?.toLowerCase().includes(searchText) ||
    product.description?.toLowerCase().includes(searchText);

  const matchCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchSearch && matchCategory;
});

if (loading) {
  return (
    <div className="container text-center py-5">
      <h3>Loading Products...</h3>
    </div>
  );
}
 return (
  <div className="container mt-4">

<nav className="smart-navbar">

  <div className="smart-logo">
    🤖 <span>SmartReco</span>
  </div>

  <div className="smart-search">
    🔍
   <input
  type="text"
  placeholder="Search products, brands and more..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      saveSearchEvent(search);
    }
  }}
/>
  </div>

  <div className="smart-nav-right">

    <div className="profile-wrapper">

      <button
        className="profile-btn"
        onClick={() => setProfileOpen(!profileOpen)}
      >
        👤 {user?.username || "Account"} ▾
      </button>

      {profileOpen && (
        <div className="profile-dropdown">

          <h5>Your Account</h5>

          <a href="/profile">
            👤 <span>My Profile</span>
          </a>

          <a href="/orders">
            📦 <span>My Orders</span>
          </a>

          <a href="/wishlist">
            ❤️ <span>Wishlist</span>
          </a>



          <hr />

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            🚪 <span>Logout</span>
          </button>

        </div>
      )}

    </div>
   
    <button className="cart-btn" onClick={() => window.location.href = "/wishlist"}>
      🛒 Cart
    </button>

  </div>

</nav>


<div className="category-bar">

  <button
    className={selectedCategory === "All" ? "category active" : "category"}
    onClick={() => setSelectedCategory("All")}
  >
    🏠 <span>For You</span>
  </button>

  {[
    ...new Set(products.map(product => product.category))
  ].map((category) => (

    <button
      key={category}
      className={
        selectedCategory === category
          ? "category active"
          : "category"
      }
      onClick={() => setSelectedCategory(category)}
    >
      🛍️ <span>{formatCategory(category)}</span>
    </button>

  ))}

</div>
<h2 className="mb-4">
  Product Recommendations
</h2>

{search.trim() === "" && (
  <div className="row mb-5">

    <div className="col-lg-8">
      <div className="card shadow-sm">
        <div className="card-body">

         {aiRecommendation?.message && (
  <div className="alert alert-info mt-3">
    <strong>🤖 SmartReco AI:</strong>
    <p className="mb-0 mt-2">
      {aiRecommendation.message}
    </p>
  </div>
)}

          {!aiInsights ? (

            <p className="text-muted">
              Analyzing your activity...
            </p>

          ) : aiInsights.total_events === 0 ? (

            <p className="text-muted">
              Start browsing products to get personalized
              recommendations.
            </p>

          ) : (

            <>
              <p className="mb-2">

                AI detected your strongest interest in{" "}

                <strong>
                  {aiInsights.favorite_category
                    ? formatCategory(aiInsights.favorite_category)
                    : "Unknown"}
                </strong>{" "}

                products based on your activity.

              </p>

              <div
                className="progress mb-3"
                style={{ height: "20px" }}
              >

                <div
                  className="progress-bar bg-success"
                  style={{
                    width: `${aiInsights.interest_score}%`
                  }}
                >
                  {aiInsights.interest_score}%
                </div>

              </div>

              <small className="text-muted">
                Based on {aiInsights.total_events} user activities
              </small>

            </>

          )}

        </div>
      </div>
    </div>


    <div className="col-lg-4">
      <div className="card shadow-sm">
        <div className="card-body">

          <h5 className="fw-bold">
            📈 AI Stats
          </h5>

          <p>
            Products : {products.length}
          </p>

          <p>
            Categories :{" "}
            {new Set(
              products.map(product => product.category)
            ).size}
          </p>

          <p>
            User Activities :{" "}
            {aiInsights?.total_events || 0}
          </p>

          <p>
            Top Interest :{" "}
            {aiInsights?.favorite_category
              ? formatCategory(aiInsights.favorite_category)
              : "Not enough data"}
          </p>

        </div>
      </div>
    </div>

  </div>
)}
{search.trim() === "" && aiRecommendation?.products?.length > 0 && (
  <div className="card shadow-sm mb-5">
    <div className="card-body">

      <h4 className="fw-bold mb-4">
        🤖 AI Recommended Products
      </h4>

      <div className="row g-4">
        {aiRecommendation.products.slice(0, 5).map((product) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6"
            key={product.id}
          >
            <div className="card h-100 shadow-sm">

              <img
                src={product.image}
                className="product-image"
                alt={product.name}
              />

              <div className="card-body">
                <h5>{product.name}</h5>

                <p className="text-muted">
                  {formatCategory(product.category)}
                </p>

                <p className="fw-bold">
                  ${product.price}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)}
{search.trim() === "" && (
  <div className="card shadow-sm mb-5">

    <div className="card-body">

      <h4 className="fw-bold mb-4">
        🕒 Recent Activity
      </h4>

      {recentActivity.length === 0 ? (
     
        <p className="text-muted">
          No recent activity yet.
        </p>

      ) : (

        <ul className="list-group">

          {recentActivity.map((activity) => (

            <li
              className="list-group-item"
              key={activity.id}
            >

              {activity.event_type === "view" ||
              activity.event_type === "viewed" ? (
                <>👀 Viewed </>
              ) : activity.event_type === "search" ||
                activity.event_type === "searched" ? (
                <>🔍 Searched </>
              ) : activity.event_type === "wishlist" ||
                activity.event_type === "wishlisted" ? (
                <>❤️ Wishlisted </>
              ) : (
                <>📌 {activity.event_type} </>
              )}

              <strong>
                {activity.product_name ||
                  activity.search_query ||
                  "Product"}
              </strong>

            </li>

          ))}

        </ul>

      )}

    </div>

  </div>
)}
<h3 className="mb-4 fw-bold">
  {search.trim() === ""
    ? "All Products"
    : `Search Results (${filteredProducts.length})`}
</h3>
{filteredProducts.length === 0 && (
  <div className="text-center py-5">
    <h4>No products found</h4>
    <p className="text-muted">
      Try searching with another keyword.
    </p>
  </div>
)}
<div className="row">

  {filteredProducts.map((product) => (

    <div
      className="col-lg-3 col-md-4 col-sm-6 mb-4"
      key={product.id}
    >
      <ProductCard product={product} />
    </div>

  ))}

</div>
    </div>
  );
}

export default Dashboard;