import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWishlist,
  removeFromWishlist,
} from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("smartreco_user") || "{}"
      );

      if (!user.id) {
        setWishlist([]);
        return;
      }

      const data = await getWishlist(user.id);
      setWishlist(data);
    } catch (error) {
      console.error("Wishlist error:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (product) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("smartreco_user") || "{}"
      );

      if (!user.id) {
        alert("Please login first.");
        return;
      }

      await removeFromWishlist(user.id, product.id);

      setWishlist((prev) =>
        prev.filter((item) => item.id !== product.id)
      );

    } catch (error) {
      console.error("Remove wishlist error:", error);
      alert(error.message || "Failed to remove product.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading wishlist...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">My Wishlist</h2>

          <p className="text-muted">
            {wishlist.length} saved products
          </p>
        </div>

        <Link
          to="/dashboard"
          className="btn btn-outline-primary"
        >
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (

        <div className="text-center py-5">

          <h3>Your Wishlist is Empty ❤️</h3>

          <p className="text-muted">
            Save products to see them here.
          </p>

          <Link
            to="/dashboard"
            className="btn btn-primary mt-2"
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        <div className="row">

          {wishlist.map((product) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={product.id}
            >

              <div className="card shadow-sm h-100">

                <img
                  src={
                    product.image ||
                    product.thumbnail ||
                    product.images?.[0]
                  }
                  alt={product.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>{product.title}</h5>

                  <p className="text-muted">
                    {product.category}
                  </p>

                  <h5 className="text-success">
                    ₹{product.price}
                  </h5>

                  <div className="d-grid gap-2">

                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      View Product
                    </Link>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeItem(product)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;