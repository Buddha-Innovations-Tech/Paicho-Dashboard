import React from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import InputField from "../../components/InputField";
import { ImCross } from "react-icons/im";
import {FiAlertTriangle} from "react-icons/fi";
import Previews from "../../components/DragAndDrop";
const subcategoryItem = [
  {
    item: "Fresh Organic Mango",
  },
  {
    item: "Fresh Organic Mango",
  },
  {
    item: "Fresh Organic Mango",
  },
];
const ingredientItem = [
    {
      item: "Fresh Organic Mango",
    },
    {
      item: "Fresh Organic Mango",
    },
    {
      item: "Fresh Organic Mango",
    },
    {
        item: "Fresh Organic Mango",
      },
      {
        item: "Fresh Organic Mango",
      },
  ];
  const addProductItem=[
      {
          item:"Garlic Achar",
      },
      {
        item:"Mix Achar",
    },
    {
        item:"Mango Achar",
    },
    {
        item:"Garlic Achar",
    },
    {
        item:"Mix Achar",
    },
    ]

const AddProduct = () => {
  return (
    <>
      <Row>
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <div className="addproductwrapper">
            <div className="addproductwrapper__background">
              <Row>                 
                <Col md={6}>
                  <p className="addproductwrapper__background--title">
                    Product Information
                  </p>
                  <div className="mt-3">
                    <InputField name="Name" placeholder="Product Name" />
                  </div>
                  <div className="mt-3">
                    <Row>
                      <Col md={6}>
                        <label htmlFor="">Category</label>
                        <select id="category" name="category">
                          <option value="volvo" selected>
                            Select a Category
                          </option>
                          <option value="volvo">Paicho Pickle</option>
                          <option value="saab">Processing Item</option>
                          <option value="fiat">Grains & Pulses</option>
                          <option value="audi">Indenginous Product</option>
                          <option value="audi">Dry Foods</option>
                          <option value="audi">Ketchup & Sauces</option>
                          <option value="audi">Organic Vegatable</option>
                        </select>
                      </Col>
                      <Col md={6}>
                        <label htmlFor="">Sub Category</label>
                        <select id="subcategory" name="subcategory">
                          <option value="volvo" selected>
                            Select a Sub-Category
                          </option>
                          <option value="volvo">Lemon Pickle</option>
                          <option value="saab">Bhutuk Pickle</option>
                          <option value="fiat">Mango Pickle</option>
                          <option value="audi">Lemon Pickle</option>
                        </select>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Description"
                    />
                  </div>
                  <div className="mt-3">
                    <Row>
                      <Col md={4}>
                        <InputField name="Stock Count" placeholder="16" />
                      </Col>
                      <Col md={4}>
                        <InputField
                          name="Discount(Optional)"
                          placeholder="Discount"
                        />
                      </Col>
                      <Col md={4}>
                        <InputField name="Price(Rs)" placeholder="Price here" />
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <Row>
                        <Col md={9}>
                          <InputField name="SEO Keyword" />
                        </Col>
                        <Col md={3}>
                          <button className="addproductwrapper__background--addbtn">
                            Add
                          </button>
                        </Col>

                        <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                          {subcategoryItem.map((curElm, index) => {
                            return (
                              <li
                                className="d-flex align-items-center justify-content-between"
                                key={index}
                              >
                                <p>{curElm.item}</p>
                                <ImCross className="crossicon" />
                              </li>
                            );
                          })}
                        </ul>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <p className="addproductwrapper__background--title">
                    Media Information
                  </p>
                  <p className="addproductwrapper__background--dragdroptitle"><FiAlertTriangle/><span>Please choose image below 5 mb</span></p>
                  <Previews/>
                </Col>
              </Row>
              <div>
                <p className="addproductwrapper__ingredientused">
                  Ingredient used in product
                </p>
                <Row>
                  <Col md={10}>
                    <Row>
                      <Col md={10}>
                        <InputField
                          name="Add Ingredient"
                          placeholder="ingredient used for making this product"
                        />
                      </Col>
                      <Col md={2}>
                        <button className="addproductwrapper__addbtn">
                          Add
                        </button>
                      </Col>
                      <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                          {ingredientItem.map((curElm, index) => {
                            return (
                              <li
                                className="d-flex align-items-center justify-content-between"
                                key={index}
                              >
                                <p>{curElm.item}</p>
                                <ImCross className="crossicon" />
                              </li>
                            );
                          })}
                        </ul>
                    </Row>
                   
                  </Col>
                  <Col md={2}></Col>
                </Row>
              </div>
              <div>
                <p className="addproductwrapper__ingredientused">
                Add Similar Products
                </p>
                <Row>
                  <Col md={10}>
                    <Row>
                      <Col md={10}>
                        <InputField
                          name="Add Product "
                          placeholder="Similar Product"
                        />
                      </Col>
                      <Col md={2}>
                        <button className="addproductwrapper__addbtn">
                          Add
                        </button>
                      </Col>
                      <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                          {addProductItem.map((curElm, index) => {
                            return (
                              <li
                                className="d-flex align-items-center justify-content-between"
                                key={index}
                              >
                                <p>{curElm.item}</p>
                                <ImCross className="crossicon" />
                              </li>
                            );
                          })}
                        </ul>
                    </Row>
                   
                  </Col>
                  <Col md={2}></Col>
                </Row>
              </div>
              <div className="categorywrapper__addcategorywrapper--buttons">
                      <button className="btn-discard">Discard</button>
                      <button className="btn-addcategory">Add Product</button>
                    </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;
