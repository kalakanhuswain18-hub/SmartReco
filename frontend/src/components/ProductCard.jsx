import "./ProductCard.css";
function ProductCard({ product }) {
  return (
    <div className="card product-card shadow-sm">

<img
    src={product.image}
    alt={product.title}
    className="card-img-top product-image"
    style={{
        transform: product.zoom || "scale(1)",
        transition: "0.3s"
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

        <button className="btn btn-primary w-100 view-btn">
    View Product
</button>

      </div>

    </div>
  );
}

export default ProductCard;