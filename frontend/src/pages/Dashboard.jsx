import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Dashboard() {
  const [search, setSearch] = useState("");
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);
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

      </div>
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