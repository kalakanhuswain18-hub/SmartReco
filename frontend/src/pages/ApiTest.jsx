import { useEffect, useState } from "react";

function ApiTest() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
    useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "https://dummyjson.com/products?limit=10"
        );

        const data = await response.json();

        setProducts(data.products);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);
    if (loading) {

    return (

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >

        <h2>Loading Products...</h2>

      </div>

    );

  }

  return (

    <div className="container py-5">

      <h1 className="mb-4">
        DummyJSON Products
      </h1>

      <div className="row">

        {products.map((product) => (

          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={product.id}
          >

            <div className="card shadow-sm h-100">

              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "contain",
                }}
              />

              <div className="card-body">

                <h5>{product.title}</h5>

                <p className="text-success">
                  ₹{product.price}
                </p>

                <p className="text-muted">
                  {product.category}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>
          </div>

  );

}

export default ApiTest;