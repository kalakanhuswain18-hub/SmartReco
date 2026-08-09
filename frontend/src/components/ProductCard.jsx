import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../services/api";

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("smartreco_user") || "{}"
        );

        if (!user.id) {
          return;
        }

        const wishlist = await getWishlist(user.id);

        const exists = wishlist.some(
          (item) => item.id === product.id
        );

        setWishlisted(exists);
      } catch (error) {
        console.error("Failed to check wishlist:", error);
      }
    };

    checkWishlist();
  }, [product.id]);

  const handleWishlist = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("smartreco_user") || "{}"
      );

      if (!user.id) {
        alert("Please login first.");
        return;
      }

      if (loading) {
        return;
      }

      setLoading(true);

      if (wishlisted) {
        await removeFromWishlist(user.id, product.id);

        setWishlisted(false);
      }

      else {
        await addToWishlist(user.id, product.id);

        setWishlisted(true);
      }

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 700);

    } catch (error) {
      console.error("Wishlist error:", error);

      alert(
        error.message || "Something went wrong with wishlist."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card product-card shadow-sm position-relative">

      <span
        onClick={handleWishlist}
        className={`wishlist-heart
          ${wishlisted ? "active" : ""}
          ${animate ? "heart-pop" : ""}`}
        style={{
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
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

        {/* Price */}
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