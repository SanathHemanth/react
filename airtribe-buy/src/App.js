import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Laptop", price: 800, description: "High-performance laptop" },
  { id: 2, name: "Smartphone", price: 500, description: "Latest smartphone model" },
  { id: 3, name: "Headphones", price: 100, description: "Noise-canceling headphones" }
];

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome to AirtribeBuy</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>${product.price}</p>
              <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ id }) {
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border p-1 w-16" />
      <Button onClick={addToCart}>Add to Cart</Button>
      <Button onClick={() => navigate("/")} className="ml-2">Back</Button>
    </div>
  );
}

function Cart() {
  const navigate = useNavigate();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const placeOrder = () => {
    alert("Order successfully placed.");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">My Cart</h1>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map((item, index) => (
          <div key={index} className="border p-2 mt-2">
            <p>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</p>
          </div>
        ))
      )}
      {cart.length > 0 && <Button onClick={placeOrder} className="mt-4">Buy Now</Button>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex justify-between">
        <Link to="/" className="text-blue-500">Home</Link>
        <Link to="/cart" className="text-blue-500">My Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={({ match }) => <ProductDetails id={match.params.id} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;