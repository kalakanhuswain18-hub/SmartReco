import mouse from "../assets/images/mouse.jpg";
import keyboard from "../assets/images/keyboard.jpg";
import headphones from "../assets/images/headphones.jpg";

import laptop1 from "../assets/images/laptop1.jpg";
import laptop2 from "../assets/images/laptop2.jpg";
import laptop4 from "../assets/images/laptop4.jpg";

import python from "../assets/images/python.jpg";
import react from "../assets/images/react.jpg";
import machinelearning from "../assets/images/machinelearning.jpg";
import datascience from "../assets/images/datascience.jpg";

const products = [
  {
    id: 1,
    title: "Wireless Mouse",
    description:
      "Perfect wireless mouse with ergonomic design and long battery life. Ideal for office work, gaming and productivity.",
    category: "Electronics",
    price: 799,
    rating: 4.8,
    reviews: 1250,
    score: 92,
    image: mouse,
    images: [mouse],
  },

  {
    id: 2,
    title: "Gaming Keyboard",
    description:
      "Mechanical RGB gaming keyboard featuring responsive keys, customizable lighting and durable construction.",
    category: "Electronics",
    price: 1499,
    rating: 4.5,
    reviews: 2000,
    score: 88,
    image: keyboard,
    images: [keyboard],
  },

  {
    id: 3,
    title: "Noise Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation and immersive sound quality.",
    category: "Electronics",
    price: 2499,
    rating: 4.1,
    reviews: 1000,
    score: 91,
    image: headphones,
    images: [headphones],
  },

  {
    id: 4,
    title: "Gaming Laptop",
    description:
      "High-performance gaming laptop powered by the latest processor and dedicated graphics card. Perfect for gaming, programming and content creation.",
    category: "Electronics",
    price: 64999,
    rating: 4.7,
    reviews: 4000,
    score: 96,

    image: laptop1,

    images: [
      laptop1,
      laptop2,
      laptop4,
    ],
  },

  {
    id: 5,
    title: "Python Course",
    description:
      "Learn Python from beginner to advanced with projects, automation and web development.",
    category: "Education",
    price: 999,
    rating: 4.3,
    reviews: 2800,
    score: 95,
    image: python,
    images: [python],
  },

  {
    id: 6,
    title: "React Course",
    description:
      "Master React.js with components, hooks, routing and real-world projects.",
    category: "Education",
    price: 1199,
    rating: 4.6,
    reviews: 1500,
    score: 81,
    image: react,
    images: [react],
  },

  {
    id: 7,
    title: "Machine Learning Course",
    description:
      "Comprehensive machine learning course covering supervised learning, deep learning and AI projects.",
    category: "Education",
    price: 1999,
    rating: 4.5,
    reviews: 23000,
    score: 97,
    image: machinelearning,
    images: [machinelearning],
  },

  {
    id: 8,
    title: "Data Science Course",
    description:
      "Become a Data Scientist by learning statistics, SQL, machine learning and visualization.",
    category: "Education",
    price: 1799,
    rating: 4.5,
    reviews: 12050,
    score: 90,
    image: datascience,
    images: [datascience],
  },
];

export default products;