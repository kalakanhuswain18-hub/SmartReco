import { useNavigate } from "react-router-dom";
import "../App.css";


function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("smartreco_user") || "{}");

  const username = user.username || "SmartReco User";
  const email = user.email || "Not available";

  return (
    <div className="profile-page">

      <div className="profile-topbar">
        <div
          className="profile-logo"
          onClick={() => navigate("/dashboard")}
        >
          🤖 <span>SmartReco</span>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Shopping
        </button>
      </div>

      <div className="profile-container">

        <aside className="profile-sidebar">

          <div className="user-card">
            <div className="user-avatar">👤</div>

            <div>
              <p>Hello,</p>
              <h3>{username}</h3>
            </div>
          </div>

          <div className="sidebar-section">

           

            <button onClick={() => navigate("/orders")}>
              📦
              <span>My Orders</span>
            </button>

            <button onClick={() => navigate("/wishlist")}>
              ❤️
              <span>Wishlist</span>
            </button>

            

       

          </div>

          <div className="sidebar-bottom">

            <button
              className="logout-profile"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              🚪
              <span>Logout</span>
            </button>

          </div>

        </aside>


        <main className="profile-content">

          <div className="profile-heading">
            <h1>My Profile</h1>
            <p>Manage your SmartReco account information</p>
          </div>


          <section className="profile-card">

            <div className="card-title">
              <div>
                <h2>Personal Information</h2>
                <p>Your basic account information</p>
              </div>

              <button className="edit-btn">
                Edit
              </button>
            </div>

            <div className="profile-grid">

              <div className="info-box">
                <label>Full Name</label>
                <div className="info-value">
                  {username}
                </div>
              </div>

              <div className="info-box">
                <label>Username</label>
                <div className="info-value">
                  {username}
                </div>
              </div>

              <div className="info-box">
                <label>Email Address</label>
                <div className="info-value">
                  {email}
                </div>
              </div>

              <div className="info-box">
                <label>Mobile Number</label>
                <div className="info-value">
                  Not added
                </div>
              </div>

            </div>

          </section>


  
          <section className="profile-card">

            <div className="card-title">
              <div>
                <h2>Account Information</h2>
                <p>Information about your SmartReco account</p>
              </div>
            </div>

            <div className="profile-grid">

              <div className="info-box">
                <label>User ID</label>
                <div className="info-value">
                  {user.id || "Not available"}
                </div>
              </div>

              <div className="info-box">
                <label>Account Status</label>
                <div className="status-active">
                  ● Active
                </div>
              </div>

              <div className="info-box">
                <label>Login Method</label>
                <div className="info-value">
                  Email & Password
                </div>
              </div>

              <div className="info-box">
                <label>Member</label>
                <div className="info-value">
                  SmartReco User
                </div>
              </div>

            </div>

          </section>


        
          <section className="profile-card">

            <h2>Quick Actions</h2>

            <div className="quick-actions">

              <button onClick={() => navigate("/orders")}>
                📦
                <span>
                  <strong>My Orders</strong>
                  <small>View your orders</small>
                </span>
              </button>

              <button onClick={() => navigate("/wishlist")}>
                ❤️
                <span>
                  <strong>Wishlist</strong>
                  <small>View saved products</small>
                </span>
              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Profile;
