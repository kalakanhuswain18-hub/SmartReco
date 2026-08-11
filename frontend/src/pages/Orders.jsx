import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("smartreco_user") || "{}"
      );

      if (!user.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/orders/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);

    } catch (error) {
      console.error("Orders error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div style={{
        textAlign: "center",
        padding: "100px",
        fontSize: "24px"
      }}>
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-header">

        <div
          className="orders-logo"
          onClick={() => navigate("/dashboard")}
        >
          🤖 <span>SmartReco</span>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </button>

      </div>

      <main className="orders-container">

        <div className="orders-title">
          <h1>My Orders</h1>
          <p>View and manage your SmartReco orders</p>
        </div>

        {orders.length === 0 ? (

          <div className="empty-orders">

            <div>📦</div>

            <h2>No orders yet</h2>

            <p>
              Start shopping and your orders will appear here.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-top">

                  <div>

                    <strong>
                      Order #{order.order_number}
                    </strong>

                    <p>
                      Ordered on {formatDate(order.created_at)}
                    </p>

                  </div>

                  <span
                    className={
                      order.status === "Delivered"
                        ? "order-status delivered"
                        : "order-status processing"
                    }
                  >
                    ● {order.status}
                  </span>

                </div>

                <div className="order-product">

                  <div className="order-product-image">

                    {order.image ? (
                      <img
                        src={order.image}
                        alt={order.product}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                      />
                    ) : (
                      "📦"
                    )}

                  </div>

                  <div className="order-product-info">

                    <h3>{order.product}</h3>

                    <p className="order-price">
                      ₹{Number(order.price).toLocaleString("en-IN")}
                    </p>

                    <p className="order-message">
                      Thank you for shopping with SmartReco.
                    </p>

                  </div>

                </div>

                <div className="order-actions">

                  <button
                    onClick={() =>
                      navigate(`/product/${order.product_id}`)
                    }
                  >
                    View Product
                  </button>

                  <button
                    className="buy-again"
                    onClick={() =>
                      navigate(`/product/${order.product_id}`)
                    }
                  >
                    Buy Again
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Orders;