import "./App.css";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Brands from "./Pages/Brands";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="products" element={<Products />} />
        <Route path="brands" element={<Brands />} />
      </Routes>
    </div>
  );
}

export default App;
