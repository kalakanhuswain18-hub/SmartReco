import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  isWishlisted,
  toggleWishlist,
} from "../utils/wishlist";
function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(
  isWishlisted(product.id)
);
  const [animate, setAnimate] = useState(false);

 const handleWishlist = () => {
  toggleWishlist(product);

  setWishlisted(isWishlisted(product.id));

  setAnimate(true);

  setTimeout(() => {
    setAnimate(false);
  }, 700);
};

  return (
    <div className="card product-card shadow-sm position-relative">


      <span
        onClick={handleWishlist}
        className={`wishlist-heart
        ${wishlisted ? "active" : ""}
        ${animate ? "heart-pop" : ""}`}
      >
        ♥
      </span>

      <img
        src={product.image}
        alt={product.title}
        className="card-img-top product-image"
        style={{
          transform: product.zoom || "scale(1)",
          transition: "0.3s",
        }}
      />

      <div className="card-body">

        <h5 className="product-title">
          {product.title}
        </h5>

        <p className="text-muted">
          {product.category}
        </p>

        <div className="mb-2">
          <span className="badge bg-success">
            {product.score}% Match
          </span>
        </div>

        <h6 className="text-success">
          ₹{product.price}
        </h6>

        <Link
          to={`/product/${product.id}`}
          className="btn btn-primary w-100"
        >
          View Product
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;