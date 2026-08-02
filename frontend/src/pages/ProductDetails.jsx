import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import {
  toggleWishlist,
  isWishlisted,
} from "../utils/wishlist";


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="container py-5">
        <h2>Product Not Found</h2>

        <Link
          to="/dashboard"
          className="btn btn-primary mt-3"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );
  const [wishlisted, setWishlisted] = useState(
  isWishlisted(product.id)
);
const handleWishlist = () => {
  if (wishlisted) {
    navigate("/wishlist");
    return;
  }

  toggleWishlist(product);
  setWishlisted(true);
};

  return (
    <>
      <div className="container py-5 mb-5">

        <div className="row g-5">

      

          <div className="col-lg-6">

            <div className="card shadow-sm p-3">

              <img
                src={selectedImage}
                alt={product.title}
                className="img-fluid rounded"
                style={{
                  height: "450px",
                  objectFit: "contain",
                }}
              />

            </div>

            <div className="row mt-3">

              {product.images?.map((img, index) => (

                <div
                  className="col-3"
                  key={index}
                >

                  <img
                    src={img}
                    alt=""
                    className="img-fluid border rounded"
                    style={{
                      cursor: "pointer",
                      height: "90px",
                      objectFit: "contain",
                    }}
                    onClick={() =>
                      setSelectedImage(img)
                    }
                  />

                </div>

              ))}

            </div>

          </div>

         

          <div className="col-lg-6">
            <h1 className="fw-bold">
  {product.title}
</h1>

<h2 className="text-success mt-3">
  ₹{product.price}
</h2>

<span className="badge bg-success fs-6 mt-2">
  {product.score}% Match
</span>

<h5 className="mt-4">
  Recommendation Score
</h5>

<div
  className="progress mb-4"
  style={{ height: "22px" }}
>
  <div
    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
    style={{
      width: `${product.score}%`,
    }}
  >
    {product.score}%
  </div>
</div>

<div className="mb-4">

  <h4 className="text-warning">

    ⭐ {product.rating}

    <span className="text-dark fs-5">
      {" "}
      ({product.reviews} Reviews)
    </span>

  </h4>

</div>

<p className="fs-5 text-secondary">

  {product.description}

</p>

<div className="alert alert-primary mt-4">

  <h4>
    🤖 AI Recommendation
  </h4>

  <ul className="mt-3">

    <li>
      ✅ {product.score}% match with your interests
    </li>

    <li>
      ✅ Popular among users with similar browsing history
    </li>

    <li>
      ✅ Highly rated in {product.category}
    </li>

    <li>
      ✅ Recommended based on AI behaviour analysis
    </li>

  </ul>

</div>

<div className="card shadow-sm mt-4">

  <div className="card-body">

    <h3 className="mb-4">
      📋 Product Information
    </h3>

    <div className="row">

      <div className="col-6">

        <h5>Category</h5>

        <p>{product.category}</p>

      </div>

      <div className="col-6">

        <h5>Price</h5>

        <p>₹{product.price}</p>

      </div>

      <div className="col-6 mt-3">

        <h5>Rating</h5>

        <p>
          ⭐ {product.rating}
        </p>

      </div>

      <div className="col-6 mt-3">

        <h5>Reviews</h5>

        <p>{product.reviews}</p>

      </div>

      <div className="col-6 mt-3">

        <h5>Recommendation</h5>

        <p>{product.score}%</p>

      </div>

      <div className="col-6 mt-3">

        <h5>Status</h5>

        <p className="text-success">
          In Stock
        </p>

      </div>

    </div>

  </div>

</div>


<div className="mt-5">

  <h3 className="fw-bold mb-4">
    Similar Products
  </h3>

  <div className="row g-4">

    {products
      .filter(
        (item) =>
          item.category === product.category &&
          item.id !== product.id
      )
      .slice(0, 4)
      .map((item) => (

        <div
          className="col-md-6"
          key={item.id}
        >

          <div className="card h-100 shadow-sm product-card">

            <img
              src={item.image}
              alt={item.title}
              className="product-image"
            />

            <div className="card-body">

              <h5 className="fw-bold">
                {item.title}
              </h5>

              <p className="text-success fs-5">
                ₹{item.price}
              </p>

              <span className="badge bg-success mb-3">
                {item.score}% Match
              </span>

              <Link
                to={`/product/${item.id}`}
                className="btn btn-outline-primary w-100"
              >
                View Product
              </Link>

            </div>

          </div>

        </div>

      ))}

  </div>

</div>
                   </div>

        </div>

        <div className="text-center mt-5">
          <Link
        to="/dashboard"
        className="btn btn-outline-secondary px-4"
      >
        ← Back to Dashboard
      </Link>
    </div>

      </div>

     
<div className="position-fixed bottom-0 start-0 w-100 bg-white border-top shadow-lg">
        <div className="container py-3">

          <div className="row">

           <div className="col-6">

  <button
    onClick={handleWishlist}
    className={`btn w-100 ${
      wishlisted
        ? "btn-success"
        : "btn-outline-danger"
    }`}
    style={{
      height: "52px",
      borderRadius: "15px",
      fontWeight: "600",
      boxShadow: "0 8px 20px rgba(0,0,0,.12)",
      transition: ".3s",
    }}
  >
    {wishlisted
      ? "❤️ Go to Wishlist"
      : "🤍 Add to Wishlist"}
  </button>

</div>

<div className="col-6">

 <button
  className="btn w-100"
  style={{
    height: "52px",
    borderRadius: "15px",
    fontWeight: "600",
    background: "linear-gradient(135deg,#0d6efd,#4f8cff)",
    color: "#fff",
    border: "none",
    boxShadow: "0 8px 20px rgba(13,110,253,.35)"
  }}
  onClick={() => navigate(`/buy/${product.id}`)}
>
  ⚡ Buy Now
</button>
</div>

          </div>

        </div>

      </div>

    </>

  );
}

export default ProductDetails;