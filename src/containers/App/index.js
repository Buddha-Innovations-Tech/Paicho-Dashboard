import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React from "react";

import UpdateRegisterAcc from "../UpdateRegisterAcc";
import EditCategory from "../EditCategory";
import EditProduct from "../EditProduct";
import ProductList from "../ProductList";
import Transaction from "../Transaction";
import AddProduct from "../AddProduct";
import Dashboard from "../Dashboard";
import Category from "../Category";
import Customer from "../Customer";
import Carousel from "../Carousel";
import Register from "../Register";
import Report from "../Report";
import Login from "../Login";
import Order from "../Order";
import Home from "../Home";

const App = () => {
  // axios.defaults.baseURL = "https://evening-ravine-71797.herokuapp.com/";
  axios.defaults.baseURL = "http://localhost:5000/";
  return (
    <div>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />}>
            <Route
              path="/updateregisteracc/:id"
              element={<UpdateRegisterAcc />}
            />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="category" element={<Category />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/report" element={<Report />} />
            <Route path="order" element={<Order />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
