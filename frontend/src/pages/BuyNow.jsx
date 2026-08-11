import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
const BASE_URL = import.meta.env.VITE_API_URL;

function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);
if (loading) {
  return (
    <div className="container py-5 text-center">
      <h3>Loading Product...</h3>
    </div>
  );
}
  if (!product) {
    return (
      <div className="container py-5 text-center">
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

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-5">
        🛍 Secure Checkout
      </h2>

      <div className="row g-5">

        <div className="col-lg-7">

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "20px" }}
          >

            <div className="card-body p-4">

              <h4 className="mb-4">
                📦 Delivery Address
              </h4>

              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Full Address"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="City"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Pincode"
                  />
                </div>

              </div>

              <hr className="my-4" />

              <h4 className="mb-3">
                💳 Payment Method
              </h4>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                <label className="form-check-label">
                  UPI
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                />
                <label className="form-check-label">
                  Credit / Debit Card
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                />
                <label className="form-check-label">
                  Cash on Delivery
                </label>
              </div>

            </div>

          </div>

        </div>


        <div className="col-lg-5">

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "20px" }}
          >

            <div className="card-body p-4">

              <h4 className="mb-4">
                🛒 Order Summary
              </h4>

              <img
                src={product.image}
                className="img-fluid rounded mb-3"
                style={{
                  height: "220px",
                  objectFit: "contain",
                  width: "100%"
                }}
                alt={product.title}
              />

              <h5>{product.title}</h5>

              <p className="text-muted">
                {product.category}
              </p>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Price</span>
                <strong>₹{product.price}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Delivery</span>
                <span className="text-success">
                  FREE
                </span>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Platform Fee</span>
                <span>₹0</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <h4>Total</h4>

                <h4 className="text-success">
                  ₹{product.price}
                </h4>

              </div>

              <div
                className="alert alert-info mt-4"
                style={{ borderRadius: "15px" }}
              >

                <h6>
                  🤖 AI Insights
                </h6>

                <small>

                  Best value based on your interests.

                  <br />

                  Estimated Delivery :
                  Tomorrow

                  <br />

                  AI Confidence :
                  96%

                </small>

              </div>
<button
  className="btn btn-primary w-100 mt-3"
  style={{
    height: "55px",
    borderRadius: "15px",
    fontWeight: "600"
  }}
  onClick={async () => {

    const user = JSON.parse(
      localStorage.getItem("smartreco_user") || "{}"
    );

    if (!user.id) {
      alert("Please login first.");
      return;
    }

    try {

      const response = await fetch(
        `${BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: user.id,
            product_id: product.id
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      alert("Order placed successfully! 🎉");

      navigate("/orders");

    } catch (error) {

      console.error("Order error:", error);

      alert(
        error.message || "Something went wrong."
      );
    }
  }}
>
  ⚡ Place Order
</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BuyNow;