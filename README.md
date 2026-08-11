
# 🛍️ SmartReco — AI-Powered Shopping Recommendation Platform

<p align="center">

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-green)
![Python](https://img.shields.io/badge/Language-Python-yellow)
![ChromaDB](https://img.shields.io/badge/Vector%20DB-ChromaDB-orange)
![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy-red)
![Status](https://img.shields.io/badge/Status-Active-success)

</p>

<p align="center">
  <b>Smart shopping. Personalized discovery. AI-powered recommendations.</b>
</p>

---

## 📌 About SmartReco

**SmartReco** is an AI-powered e-commerce recommendation platform that analyzes user behavior such as:

- 👀 Product views
- 🔍 Search activity
- ❤️ Wishlist actions
- 🛒 Shopping activity

and uses these behavioral signals to understand the user's interests and provide personalized product recommendations.

Instead of showing the same products to every user, SmartReco attempts to understand **what the user is interested in** and recommends products accordingly.

---

## 🚀 Key Features

### 🤖 AI-Powered Recommendations

SmartReco analyzes user activity and generates personalized recommendations based on behavioral signals and product similarity.

### 🧠 Behavioral Personalization

Different user actions represent different levels of intent:

```text
Product View       → Low Intent
Search             → Medium Intent
Wishlist           → High Intent
Purchase           → Strong Intent
````

### 🔎 Smart Product Search

Users can search products using:

* Product name
* Category
* Description

### 🏷️ Category Filtering

Products can be filtered by different product categories.

### ❤️ Wishlist

Users can add products to their wishlist and remove them when needed.

### 🛒 Checkout & Orders

Users can:

1. View a product
2. Click Buy Now
3. Enter checkout information
4. Place an order
5. View order history

### 📊 User Activity Tracking

SmartReco records user activities such as:

* Product views
* Searches
* Wishlist actions

### 💡 AI Insights

The dashboard provides insights such as:

* Total user activities
* Favorite category
* Interest score
* Personalized product recommendations

### 🔐 Authentication

SmartReco provides:

* User registration
* User login
* Password hashing
* User-specific activity
* User-specific wishlist
* User-specific orders

---

## 🧠 How SmartReco Works

```text
                 ┌─────────────────────┐
                 │       User          │
                 └──────────┬──────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │    User Interactions    │
              │                         │
              │ View / Search / Wishlist│
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ Behavioral Analysis     │
              │                         │
              │ Intent & Interests      │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │     AI Interest         │
              │      Detection          │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │      ChromaDB           │
              │ Vector Similarity Search│
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ Personalized Products   │
              │ + AI Explanation        │
              └─────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer             | Technologies                         |
| ----------------- | ------------------------------------ |
| Frontend          | React, Vite                          |
| UI                | Bootstrap, CSS                       |
| Routing           | React Router                         |
| Backend           | Python, Flask                        |
| ORM               | SQLAlchemy                           |
| Database          | Relational Database                  |
| Authentication    | Werkzeug Password Hashing            |
| Vector Database   | ChromaDB                             |
| AI                | Mesh AI / AI Recommendation Services |
| API Communication | REST API                             |
| Deployment        | Vercel + Render                      |

---

## 📁 Project Structure

```text
SmartReco/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── requirements.txt
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── recommendations.py
│   │   ├── events.py
│   │   ├── wishlist.py
│   │   └── orders.py
│   │
│   └── services/
│       ├── chroma_service.py
│       └── ...
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vercel.json
│   │
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── App.css
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kalakanhuswain18-hub/SmartReco.git
cd SmartReco
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 3. Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
OPENAI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```

> Never commit real API keys to GitHub.

---

### 4. Start the Backend

```bash
python app.py
```

Backend:

```text
http://127.0.0.1:5000
```

Test:

```text
http://127.0.0.1:5000/
```

Expected response:

```json
{
  "project": "SmartReco",
  "status": "Running",
  "message": "Welcome to SmartReco API"
}
```

---

### 5. Import Demo Products

After starting the backend:

#### Windows PowerShell

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:5000/products/import" -Method POST
```

Then verify:

```text
http://127.0.0.1:5000/products
```

---

### 6. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

---

### 7. Frontend Environment Variable

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:5000
```

Do not add `/products` or `/auth/login` to the base URL.

---

### 8. Start the Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🧪 Demo Flow

```text
Landing Page
      ↓
Register / Login
      ↓
Dashboard
      ↓
Search Products
      ↓
Filter by Category
      ↓
View Product Details
      ↓
Add to Wishlist
      ↓
Generate User Activity
      ↓
AI Insights
      ↓
AI Recommendations
      ↓
Buy Now
      ↓
Place Order
      ↓
View Orders
```

---

## 📊 AI Recommendation Flow

```text
User searches for a product
            ↓
User views products
            ↓
User adds products to wishlist
            ↓
Behavior is recorded
            ↓
User interests are detected
            ↓
AI analyzes the user's interests
            ↓
Vector similarity search
            ↓
Personalized recommendations
            ↓
AI explanation
```

---

## 🎯 Behavioral Signals

| Activity     | Intent |
| ------------ | ------ |
| Product View | Low    |
| Search       | Medium |
| Wishlist     | High   |
| Purchase     | Strong |

---

## 🗄️ API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Products

```http
GET /products
GET /products/<id>
POST /products
PUT /products/<id>
DELETE /products/<id>
GET /products/search?q=<query>
GET /products/category/<category>
POST /products/import
POST /products/sync
GET /products/trending
```

### Wishlist

```http
POST /wishlist
GET /wishlist/<user_id>
DELETE /wishlist/<user_id>/<product_id>
```

### Orders

```http
POST /orders
GET /orders/<user_id>
```

### Events

```http
POST /events
```

---

## 🧠 AI & Vector Search

SmartReco integrates AI-powered interest analysis with vector similarity search.

ChromaDB is used to store and retrieve product representations for semantic similarity search.

This allows the platform to find products that are semantically related to user interests rather than relying only on exact keyword matching.

---

## 🔒 Security

SmartReco implements:

* Password hashing using Werkzeug
* Environment variables for sensitive configuration
* CORS configuration
* User-specific data handling
* REST API communication

> Never commit `.env` files or real API keys to GitHub.

---

## 🌍 Deployment

```text
Frontend
React + Vite
      ↓
Vercel
      ↓
REST API
      ↓
Render
      ↓
Flask Backend
      ↓
Database + ChromaDB + AI
```

### Production Frontend

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Production Backend

```env
FRONTEND_URL=https://your-frontend-url.vercel.app
OPENAI_API_KEY=your_api_key_here
```

Replace the example URLs with your actual deployment URLs.

---

## 🧩 Troubleshooting

### Products are not appearing

Start the backend and import products:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:5000/products/import" -Method POST
```

Then check:

```text
http://127.0.0.1:5000/products
```

### CORS Error

Check:

```env
FRONTEND_URL=http://localhost:5173
```

For production:

```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Cannot Connect to Backend

Check:

```env
VITE_API_URL=http://127.0.0.1:5000
```

For production:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🏆 Why SmartReco?

Traditional e-commerce platforms often show the same popular products to every user.

SmartReco focuses on:

```text
User Behavior
      +
AI Interest Detection
      +
Semantic Product Similarity
      +
Personalized Explanation
      =
Smarter Shopping Experience
```

The goal is to make product discovery **personalized, explainable, and behavior-aware**.

---

## 🔮 Future Improvements

* Real-time recommendation updates
* Advanced user embeddings
* Better purchase-intent prediction
* Collaborative filtering
* A/B testing for recommendation strategies
* More advanced AI-generated explanations
* Real payment gateway integration
* Admin dashboard
* Recommendation performance analytics
* Scalable cloud database infrastructure

---

## 👨‍💻 Project

**SmartReco**

AI-Powered Shopping Recommendation Platform

### GitHub Repository

[https://github.com/kalakanhuswain18-hub/SmartReco](https://github.com/kalakanhuswain18-hub/SmartReco)

---

## 📄 License

This project was created for educational, hackathon, and demonstration purposes.

```
```
