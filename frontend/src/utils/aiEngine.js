import { getBehavior } from "./behavior";

export const getAIReason = (product) => {
  const behavior = getBehavior();

  const reasons = [];

  if (behavior.categories[product.category]) {
    reasons.push(
      `You frequently explore ${product.category} products.`
    );
  }

  if (
    behavior.wishlist.some((item) => item.id === product.id)
  ) {
    reasons.push(
      "This product is already in your wishlist."
    );
  }

  if (
    behavior.viewed.some((item) => item.id === product.id)
  ) {
    reasons.push(
      "You viewed this product recently."
    );
  }

  if (product.score >= 90) {
    reasons.push(
      "AI predicts a very high match based on your behavior."
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      "Recommended based on trending user interests."
    );
  }

  return reasons;
};