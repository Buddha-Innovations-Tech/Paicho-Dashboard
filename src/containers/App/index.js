import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../AddProduct";
import Category from "../Category";
import Home from "../Home";
import Order from "../Order";
import ProductList from "../ProductList";
import Transaction from "../Transaction";
import Customer from "../Customer";

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/productlist" element={<ProductList />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/transaction" element={<Transaction />} />
          <Route exact path="/customer" element={<Customer />} />

        </Routes>
      </main>
    </div>
  );
};

export default App;
