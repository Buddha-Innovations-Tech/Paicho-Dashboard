import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../AddProduct";
import Category from "../Category";
import Home from "../Home";
import Order from "../Order";
import ProductList from "../ProductList";
import Transaction from "../Transaction";
import Customer from "../Customer";
import Carousel from "../Carousel";
import Report from "../Report";
import Register from "../Register";
import Login from "../Login";
import EditCategory from "../EditCategory";
import UpdateRegisterAcc from "../UpdateRegisterAcc";

const App = () => {
  return (
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/editcategory" element={<EditCategory />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/productlist" element={<ProductList />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/transaction" element={<Transaction />} />
          <Route exact path="/customer" element={<Customer />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/carousel" element={<Carousel />} />
          <Route exact path="/updateregisteracc" element={<UpdateRegisterAcc />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
