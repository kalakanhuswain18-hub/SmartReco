export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const isWishlisted = (id) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === id);
};

export const toggleWishlist = (product) => {
  let wishlist = getWishlist();

  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== product.id);
  } else {
    wishlist.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  return wishlist;
};