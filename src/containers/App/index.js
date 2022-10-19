import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UpdateRegisterAcc from '../UpdateRegisterAcc';
import EditCategory from '../EditCategory';
import EditProduct from '../EditProduct';
import ProductList from '../ProductList';
import Transaction from '../Transaction';
import AddProduct from '../AddProduct';
import Dashboard from '../Dashboard';
import Category from '../Category';
import Customer from '../Customer';
import Carousel from '../Carousel';
import Register from '../Register';
import Report from '../Report';
import Login from '../Login';
import Order from '../Order';
import Home from '../Home';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import { Helmet } from 'react-helmet';

const App = () => {
  axios.defaults.baseURL = 'https://backend.paicho.com/';
  // axios.defaults.baseURL = "http://localhost:5000/";
  return (
    <div>
      <Helmet>
        <title>Paicho Dashboard</title>
      </Helmet>
      <Row>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>

        <Col md={3}>
          {' '}
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <main style={{ overflowX: 'hidden' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/updateregisteracc/:id'
                element={<UpdateRegisterAcc />}
              />
              <Route path='/editcategory/:id' element={<EditCategory />} />

              <Route path='/editproduct/:id' element={<EditProduct />} />
              <Route path='/productlist' element={<ProductList />} />
              <Route
                path='/productlist/:pageNumber'
                element={<ProductList />}
              />
              <Route path='/transaction' element={<Transaction />} />
              <Route
                path='/transaction/:pageNumber'
                element={<Transaction />}
              />
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/category' element={<Category />} />
              <Route path='/category/:pageNumber' element={<Category />} />
              <Route path='/customer' element={<Customer />} />
              <Route path='/customer/:pageNumber' element={<Customer />} />
              <Route path='/register' element={<Register />} />
              <Route path='/register/:pageNumber' element={<Register />} />
              <Route path='/carousel' element={<Carousel />} />
              <Route path='/report' element={<Report />} />
              <Route path='/order' element={<Order />} />
              <Route path='/order/:pageNumber' element={<Order />} />
            </Routes>
          </main>
        </Col>
      </Row>
    </div>
  );
};

export default App;
