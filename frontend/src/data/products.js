import mouse from "../assets/images/mouse.jpg";
import keyboard from "../assets/images/keyboard.jpg";
import headphones from "../assets/images/headphones.jpg";
import laptop from "../assets/images/laptop.jpg";

import python from "../assets/images/python.jpg";
import react from "../assets/images/react.jpg";
import machinelearning from "../assets/images/machinelearning.jpg";
import datascience from "../assets/images/datascience.jpg";
const products = [
  {
    id: 1,
    title: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    score: 92,
    image: mouse,
  },
  {
    id: 2,
    title: "Gaming Keyboard",
    category: "Electronics",
    price: 1499,
    score: 88,
    image: keyboard,
  },
{
  id: 3,
  title: "Noise Cancelling Headphones",
  category: "Electronics",
  price: 2499,
  score: 91,
  image: headphones,
  zoom: "scale(1.25)"
},
  {
    id: 4,
    title: "Gaming Laptop",
    category: "Electronics",
    price: 999,
    score: 84,
    image: laptop,
  },
  {
    id: 5,
    title: "Python Course",
    category: "Education",
    price: 999,
    score: 95,
    image: python,
  },
  {
    id: 6,
    title: "React Course",
    category: "Education",
    price: 1199,
    score: 81,
    image: react,
  },
  {
    id: 7,
    title: "Machine Learning Course",
    category: "Education",
    price: 1999,
    score: 97,
    image: machinelearning,
  },
  {
    id: 8,
    title: "Data Science Course",
    category: "Education",
    price: 1799,
    score: 90,
    image: datascience,
  },
];

export default products;