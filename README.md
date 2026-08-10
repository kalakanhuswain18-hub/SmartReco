# 🛍️ SmartReco — AI Shopping Recommendation Platform


<p align="center">


[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-green)](https://flask.palletsprojects.com/)
[![ChromaDB](https://img.shields.io/badge/Vector%20DB-ChromaDB-orange)](https://www.trychroma.com/)


</p>


**SmartReco** is an AI-powered e-commerce platform that dynamically analyzes user behavioral signals (searches, product views, wishlist additions) to deliver personalized product recommendations with clear AI explanations using vector similarity search.



## ⚡ How It Works

```text
User Behavior (View / Search / Wishlist)
       ↓
Behavioral Scoring (View = Low | Search = Medium | Wishlist = High Intent)
       ↓
AI Interest Detection (Mesh AI)
       ↓
Vector Similarity Search (ChromaDB)
       ↓
Personalized Recommendation + AI Explanation

```


## ✨ Key Features

* **Behavior-Based Personalization:** Weights distinct user actions to differentiate casual browsing from high purchase intent.
* **AI Interest Detection:** Uses **Mesh AI** to convert recent behavioral events into actionable interest contexts.
* **Vector Similarity Search:** Powered by **ChromaDB** for real-time semantic product matching.
* **Transparent Explanations:** Generates personalized reasoning explaining *why* a product was recommended.
* **Core E-Commerce Suite:** Full authentication (hashed passwords), search & filtering, persistent wishlist, order history, and activity tracking.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React, Vite, Bootstrap / CSS, React Router |
| **Backend** | Python, Flask, SQLAlchemy, Werkzeug |
| **AI & Vector DB** | Mesh AI, ChromaDB, Embeddings |
| **Database** | Relational Database via SQLAlchemy |

---

## 📁 Repository Structure

```text
SmartReco/
├── backend/            # Flask REST API, Models, Routes, & AI Services
│   ├── routes/         # Auth, Products, Events, Recommendations, Wishlist, Orders
│   └── services/       # ChromaDB & Mesh AI integrations
└── frontend/           # React + Vite Application
    └── src/            # Components, Pages, & API Services

```

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/kalakanhuswain18-hub/SmartReco.git
cd SmartReco

```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Activate venv:
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

pip install -r requirements.txt

```

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_api_key_here

```

Start the Flask server:

```bash
python app.py

```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev

```

---

## 🧪 Demo Flow

`Landing Page` ➔ `Login/Register` ➔ `Search Product` ➔ `View Details & Add to Wishlist` ➔ `View AI Recommendations` ➔ `Checkout / Place Order`

---

## 🔗 Links

* **GitHub Repository:** [kalakanhuswain18-hub/SmartReco](https://github.com/kalakanhuswain18-hub/SmartReco)

