const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
    try {

    const response = await fetch(
      `${BASE_URL}/products?limit=100`
    );

    const data = await response.json();

    return data.products;

  } catch (error) {

    console.error("Error fetching products:", error);

    return [];

  }

}
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}