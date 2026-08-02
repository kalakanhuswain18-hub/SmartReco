export const getBehavior = () => {
  return JSON.parse(localStorage.getItem("behavior")) || {
    viewed: [],
    searched: [],
    wishlist: [],
    categories: {},
  };
};

export const saveBehavior = (behavior) => {
  localStorage.setItem("behavior", JSON.stringify(behavior));
};

export const addViewedProduct = (product) => {
  const behavior = getBehavior();

  behavior.viewed = [
    product,
    ...behavior.viewed.filter((p) => p.id !== product.id),
  ].slice(0, 10);

  behavior.categories[product.category] =
    (behavior.categories[product.category] || 0) + 1;

  saveBehavior(behavior);
};

export const addSearch = (text) => {
  if (!text.trim()) return;

  const behavior = getBehavior();

  behavior.searched = [
    text,
    ...behavior.searched.filter((s) => s !== text),
  ].slice(0, 10);

  saveBehavior(behavior);
};

export const addWishlist = (product) => {
  const behavior = getBehavior();

  behavior.wishlist = [
    product,
    ...behavior.wishlist.filter((p) => p.id !== product.id),
  ];

  behavior.categories[product.category] =
    (behavior.categories[product.category] || 0) + 2;

  saveBehavior(behavior);
};