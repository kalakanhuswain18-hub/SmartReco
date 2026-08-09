# 🤖 SmartReco

### AI-Powered Personalized Product Recommendation Platform

SmartReco is an AI-powered product recommendation platform that personalizes the shopping experience based on user interests and behaviour.

Instead of showing the same products to every user, SmartReco analyzes interactions such as product views, searches, wishlist activity and user interests to generate personalized product recommendations.

---

## 🚀 Live Project

> Add your deployed frontend URL here after deployment.

**Frontend:** `Coming Soon`

**Backend API:** `Coming Soon`

---

## 🎯 Problem Statement

Traditional e-commerce platforms often provide the same product discovery experience to every user.

This can make it difficult for users to discover products that are actually relevant to their interests.

### SmartReco solves this by:

- Tracking user behaviour
- Understanding user interests
- Generating personalized recommendations
- Providing AI-powered recommendation explanations
- Maintaining user-specific activity
- Connecting recommendations with the shopping workflow

---

# ✨ Key Features

## 🧠 AI-Powered Recommendations

SmartReco generates product recommendations based on user interests and behavioural signals.

The recommendation system can consider:

- Product views
- Searches
- Categories
- Wishlist activity
- Previous interactions

---

## 👤 User Authentication

Complete authentication flow with:

- User Registration
- User Login
- User Profile
- Logout

Authentication is connected to the Flask backend.

---

## 📊 Behaviour Tracking

SmartReco records user interactions such as:

- Product views
- Searches
- Wishlist interactions
- User activity

These behavioural signals help improve personalization.

---

## 🎯 Personalized Product Discovery

Users can:

- Search products
- Filter products by category
- View product details
- Discover recommended products
- Explore personalized recommendations

---

## ❤️ Wishlist

Users can add products to their wishlist and remove them whenever required.

---

## 🛒 Shopping Flow

SmartReco provides a complete prototype shopping workflow:

```text
Product Discovery
       ↓
Product Details
       ↓
Wishlist / Buy Now
       ↓
Checkout
       ↓
Place Order
       ↓
My Orders
             USER
               │
               ▼
       ┌─────────────────┐
       │ User Behaviour  │
       │                 │
       │ • Views         │
       │ • Searches      │
       │ • Wishlist      │
       │ • Categories    │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Recommendation  │
       │     Engine      │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │    ChromaDB     │
       │ Vector Storage  │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │   AI / Mesh API │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Personalized    │
       │ Recommendations │
       └────────┬────────┘
                │
                ▼
              USER
