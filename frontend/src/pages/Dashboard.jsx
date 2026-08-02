import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { getBehavior } from "../utils/behavior";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
const filteredProducts = products.filter((product) => {

  const matchSearch =
    product.title.toLowerCase().includes(search.toLowerCase());

  const matchCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchSearch && matchCategory;

});
const behavior = getBehavior();

const favoriteCategory =
  Object.keys(behavior.categories).length > 0
    ? Object.keys(behavior.categories).reduce((a, b) =>
        behavior.categories[a] > behavior.categories[b] ? a : b
      )
    : "Education";

const totalActivity =
  behavior.viewed.length +
  behavior.searched.length +
  behavior.wishlist.length;

const aiScore = Math.min(100, 60 + totalActivity * 5);
  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Product Recommendations
      </h2>

      <div className="mb-4">
        
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="d-flex gap-2 mt-4 mb-4 flex-wrap">

  <button
    className={`btn ${
      selectedCategory === "All"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setSelectedCategory("All")}
  >
    All
  </button>

  <button
    className={`btn ${
      selectedCategory === "Electronics"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setSelectedCategory("Electronics")}
  >
    Electronics
  </button>

  <button
    className={`btn ${
      selectedCategory === "Education"
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setSelectedCategory("Education")}
  >
    Education
  </button>

</div>
      </div>
      {search.trim() === "" && (
      <div className="mb-5">

  <h3 className="fw-bold mb-4">
    🤖 Recommended For You
  </h3>

  <div className="row g-4">

    {products
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((product) => (

        <div
          className="col-md-4"
          key={product.id}
        >

          <div className="card shadow-sm h-100">

            <img
              src={product.image}
              className="product-image"
              alt={product.title}
            />

            <div className="card-body">

              <h5>{product.title}</h5>

              <p className="text-success">
                {product.score}% Match
              </p>

            </div>

          </div>

        </div>

      ))}

  </div>

</div>
)}
{search.trim() === "" && (
<div className="row mb-5">

  <div className="col-lg-8">

    <div className="card shadow-sm">

      <div className="card-body">

        <h4 className="fw-bold">
          🤖 AI Insights
        </h4>

        <p className="mb-2">
          AI detected your strongest interest in
<strong> {favoriteCategory} </strong>
products based on your searches, viewed items, and wishlist activity.
        </p>

        <div
          className="progress mb-3"
          style={{ height: "20px" }}
        >
          <div
            className="progress-bar bg-success"
            style={{ width: `${aiScore}%` }}
          >
            87%
          </div>
        </div>

        <small className="text-muted">
          Updated a few moments ago
        </small>

      </div>

    </div>

  </div>

  <div className="col-lg-4">

    <div className="card shadow-sm">

      <div className="card-body">

        <h5 className="fw-bold">
          📈 Stats
        </h5>

        <p>Products : {products.length}</p>

        <p>Categories : 2</p>

        <p>Top Match : 97%</p>

      </div>

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

    <ul className="list-group">

      <li className="list-group-item">
        Viewed <strong>Python Course</strong>
      </li>

      <li className="list-group-item">
        Searched <strong>Gaming Laptop</strong>
      </li>

      <li className="list-group-item">
        Viewed <strong>React Course</strong>
      </li>

      <li className="list-group-item">
        Viewed <strong>Wireless Mouse</strong>
      </li>

    </ul>

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