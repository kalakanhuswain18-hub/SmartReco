const BASE_URL = "http://127.0.0.1:5000";

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
export async function addToWishlist(userId, productId) {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      product_id: productId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add to wishlist");
  }

  return data;
}


export async function getWishlist(userId) {
  const response = await fetch(`${BASE_URL}/wishlist/${userId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }

  return data;
}


export async function removeFromWishlist(userId, productId) {
  const response = await fetch(
    `${BASE_URL}/wishlist/${userId}/${productId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove from wishlist");
  }

  return data;
}
export async function addEvent(userId, productId, eventType) {
  const response = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      product_id: productId,
      event_type: eventType,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save event");
  }

  return data;
}