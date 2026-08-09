# 🛍️ SmartReco — AI Shopping Recommendation Platform

<p align="center">

### 🤖 Shop Smarter. Personalized by AI.

SmartReco is an AI-powered shopping recommendation platform that understands user behaviour and provides personalized product recommendations based on searches, product views, wishlist interactions, and other behavioural signals.

</p>

---

## 🚀 Overview

Traditional shopping platforms mainly depend on product categories, popularity, or manual filtering.

**SmartReco takes a different approach.**

It observes how users interact with products and uses AI-powered personalization to understand their interests and recommend relevant products.

### 🔥 Core Idea

```text
User Behaviour
      ↓
Behaviour Events
      ↓
Interest Analysis
      ↓
AI-Based Interest Detection
      ↓
Vector Similarity Search
      ↓
Relevant Products
      ↓
Personalized AI Explanation
      ↓
Recommendation
```

The goal is to make product discovery more **personalized, intelligent, and user-centric**.

---

# ✨ Key Features

## 🔐 Authentication

- User Registration
- User Login
- Secure password hashing
- User-specific data
- Logout functionality

Passwords are hashed before being stored in the database instead of storing them as plain text.

---

## 🛒 Smart Product Discovery

- Product catalogue
- Product search
- Category filtering
- Product details
- Product images
- Product pricing
- Recommendation match score

---

## 🧠 AI-Powered Recommendations

SmartReco analyzes recent user behaviour to understand what the user is interested in.

Behavioural signals include:

- Product views
- Product searches
- Wishlist interactions
- Other tracked user events

Different actions can have different importance.

For example:

```text
Product View       → Lower Interest Signal
Search             → Stronger Interest Signal
Wishlist           → Strong Interest Signal
```

These behavioural signals help the system understand the user's preferences.

---

# 🤖 How SmartReco's AI Recommendation Works

The recommendation pipeline consists of multiple stages.

### 1️⃣ Behaviour Collection

The system records user activities as events.

Example:

```text
User searches → "headphones"
User views    → "Wireless Headphones"
User wishlist → "Bluetooth Headphones"
```

---

### 2️⃣ Behaviour Analysis

Recent user activity is analyzed to identify the user's primary product interest.

The system considers behavioural context such as:

```text
Searches
Views
Wishlist interactions
Product categories
Recent activity
```

---

### 3️⃣ AI Interest Detection

The behavioural context is processed using **Mesh AI** to identify the user's main interest.

Example:

```text
User Behaviour
      ↓
Search: headphones
View: wireless headphones
Wishlist: bluetooth headphones
      ↓
AI Analysis
      ↓
Main Interest: Electronics
```

---

### 4️⃣ Vector Similarity Search

Once the user's interest is identified, SmartReco uses **ChromaDB** for similarity-based product retrieval.

```text
User Interest
      ↓
ChromaDB
      ↓
Relevant Product Embeddings
      ↓
Top Matching Products
```

This allows the system to retrieve products that are semantically related to the user's interests.

---

### 5️⃣ Personalized AI Explanation

The retrieved products are then processed by the AI to generate a short personalized explanation.

Example:

> "This product matches your recent interest in wireless audio devices."

The explanation is generated using the retrieved product context.

---

### 6️⃣ Recommendation Storage

Generated recommendations can be stored for the user, allowing the platform to maintain recommendation history and support personalized experiences.

---

# 🧩 System Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │    Flask Backend    │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │  Database   │       │  Behaviour  │       │ Recommendation│
      │  / Models   │       │   Events    │       │    Engine    │
      └─────────────┘       └─────────────┘       └──────┬──────┘
                                                         │
                                  ┌──────────────────────┼──────────────────┐
                                  │                      │                  │
                                  ▼                      ▼                  ▼
                           ┌────────────┐         ┌────────────┐     ┌────────────┐
                           │  Mesh AI   │         │  ChromaDB  │     │ Recommendation│
                           │            │         │            │     │   Storage    │
                           └────────────┘         └────────────┘     └────────────┘
```

---

# 🏗️ Project Structure

```text
SmartReco/
│
├── backend/
│   │
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── .gitignore
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── events.py
│   │   ├── recommendations.py
│   │   ├── wishlist.py
│   │   └── orders.py
│   │
│   └── services/
│       ├── chroma_service.py
│       └── mesh_service.py
│
├── frontend/
│   │
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProductCard.jsx
│       │   └── ProductCard.css
│       │
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── Wishlist.jsx
│       │   ├── Orders.jsx
│       │   └── Profile.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       └── assets/
│
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

- ⚛️ React
- ⚡ Vite
- 🎨 Bootstrap / CSS
- 🔗 React Router
- 🌐 Fetch API

## Backend

- 🐍 Python
- 🚀 Flask
- 🗄️ SQLAlchemy
- 🔐 Werkzeug Password Hashing
- 🌐 REST APIs

## AI & Recommendation

- 🤖 Mesh AI
- 🧠 ChromaDB
- 🔎 Vector Similarity Search
- 📊 Behaviour-based Personalization

## Database

- Relational database using SQLAlchemy models
- User data
- Product data
- Behaviour events
- Recommendations
- Wishlist
- Orders

---

# 📊 Behaviour-Based Personalization

One of SmartReco's important components is its behavioural scoring system.

Different user actions represent different levels of intent.

Example:

| Behaviour | Example | Relative Signal |
|---|---|---|
| View | User views a product | Low |
| Search | User searches for a product | Medium |
| Wishlist | User saves a product | High |

This helps SmartReco distinguish between a user who **casually viewed** a product and a user who is showing **strong purchase interest**.

---

# 🎯 Example User Journey

Imagine a new user enters SmartReco.

### Step 1 — Login

```text
User logs in
      ↓
Dashboard
```

### Step 2 — Search

```text
Search: "headphones"
```

### Step 3 — Product Interaction

```text
View Wireless Headphones
        ↓
Add to Wishlist
```

### Step 4 — Behaviour Tracking

SmartReco records these interactions.

```text
Search
View
Wishlist
```

### Step 5 — AI Analysis

```text
Behaviour
   ↓
AI
   ↓
Interest: Electronics / Audio
```

### Step 6 — Recommendation

```text
ChromaDB
   ↓
Relevant Products
   ↓
AI Personalization
   ↓
Recommended For You
```

This creates a recommendation experience that adapts to the user's behaviour.

---

# ❤️ Wishlist System

SmartReco provides a persistent wishlist system.

Users can:

- Add products to wishlist
- Remove products from wishlist
- View saved products
- Maintain wishlist per user

The wishlist is connected to the backend and database instead of relying only on browser-side storage.

---

# 📦 Order Management

Users can:

- Purchase products through the application flow
- View their orders
- Track order information
- Access order history

Orders are associated with the corresponding user and product.

---

# 👤 User Profile

SmartReco provides a user profile section where users can access their account information and personalized activity.

---

# 📈 Recent Activity

SmartReco tracks recent user activity to make the personalization process transparent.

Users can see activity such as:

```text
Product Viewed
Product Searched
Wishlist Interaction
```

This activity contributes to the recommendation pipeline.

---

# 🔒 Security

SmartReco follows basic security practices including:

- Password hashing
- Environment variables for sensitive configuration
- Backend validation
- User-specific database records
- API-based communication between frontend and backend

> Sensitive credentials such as API keys should never be committed to the repository.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/kalakanhuswain18-hub/SmartReco.git
cd SmartReco
```

---

## 2. Backend Setup

```bash
cd backend
```

Create and activate a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables in `.env`.

Example:

```env
OPENAI_API_KEY=your_api_key
```

> Never commit your `.env` file to GitHub.

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

---

## 4. Run the Application

```bash
npm run dev
```

If the project is configured to start both services together, the frontend and backend can be launched through the configured development command.

---

# 🧪 Demo Flow

For a hackathon/demo presentation, the recommended flow is:

```text
Landing Page
     ↓
Register / Login
     ↓
Dashboard
     ↓
Search Product
     ↓
View Product
     ↓
Add to Wishlist
     ↓
Recent Activity
     ↓
AI Recommendation
     ↓
View Personalized Products
     ↓
Buy Product
     ↓
Orders
```

---

# 💡 What Makes SmartReco Different?

Traditional recommendation systems often rely heavily on:

```text
Popular Products
      +
Category
      +
Purchase History
```

SmartReco focuses on **behavioural context**:

```text
Search
  +
View
  +
Wishlist
  +
Recent Activity
  +
AI Understanding
  +
Vector Similarity
```

This allows recommendations to become more personalized as the user interacts with the platform.

---

# 🧠 Key Technical Highlights

### Behavioural Intelligence

The system doesn't only ask:

> "What products exist?"

It asks:

> "What is this user currently interested in?"

---

### AI + Vector Search

SmartReco combines:

```text
AI reasoning
      +
Vector similarity
      +
Real product catalogue
```

instead of relying on a single recommendation technique.

---

### Personalized Explanations

The system can provide a reason behind recommendations instead of only displaying product names.

This improves transparency and user experience.

---

# 🔮 Future Improvements

SmartReco can be extended with:

- 💳 Real payment gateway integration
- 📊 Advanced recommendation analytics
- 👨‍💼 Admin dashboard
- 📈 More advanced ranking models
- 🧊 Improved cold-start recommendations
- 🔔 Personalized notifications
- 🧠 User embeddings and long-term preference modelling
- ☁️ Cloud deployment
- 📱 Mobile application
- 🛒 Real-time inventory integration

---

# 🏆 Hackathon Value Proposition

SmartReco demonstrates how AI can be integrated into a real-world e-commerce experience rather than being used only as a standalone chatbot.

The system connects:

```text
Real User Behaviour
        +
Backend APIs
        +
Database
        +
AI
        +
Vector Search
        +
Personalized UX
```

to create an intelligent shopping experience.

---

# 👥 Team

**Project:** SmartReco  
**Category:** AI / Machine Learning / E-Commerce  
**Type:** AI-Powered Shopping Recommendation Platform

---

# 📌 Project Status

🚀 **Core prototype completed**

The current system includes:

- Authentication
- Product discovery
- Behaviour tracking
- AI-powered recommendation pipeline
- Vector similarity search
- Wishlist
- Orders
- User profile
- Recent activity
- Personalized recommendations

---

# ⭐ If you Like SmartReco

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

---

## 🔗 Repository

**GitHub:**  
https://github.com/kalakanhuswain18-hub/SmartReco

---

### Made with ❤️ + 🤖 AI

**SmartReco — Shop Smarter. Personalized by AI.**
