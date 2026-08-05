import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import BuyNow from "./pages/BuyNow";
import ApiTest from "./pages/ApiTest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/buy/:id" element={<BuyNow />} />
      <Route path="/api-test" element={<ApiTest />} />
    </Routes>
  );
}

export default App;