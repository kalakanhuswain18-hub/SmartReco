import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, toggleWishlist } from "../utils/wishlist";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const removeItem = (product) => {
    toggleWishlist(product);
    setWishlist(getWishlist());
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">My Wishlist</h2>
          <p className="text-muted">
            {wishlist.length} saved products
          </p>
        </div>

        <Link to="/dashboard" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your Wishlist is Empty ❤️</h3>
          <p className="text-muted">
            Save products to see them here.
          </p>
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
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>{product.title}</h5>

                  <p>{product.category}</p>

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