import React from "react";
import { Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import {  BiPlus } from "react-icons/bi";
import CategoryList from "../../components/CategoryList";
import { categoryData } from "../../components/CategoryList";
import { ImCross } from "react-icons/im";
import PaginationComp from "../../components/PaginationComp";

const subcategoryItem = [
  { item: "Paicho Pickle" },
  { item: "Mango Pickle" },
  { item: "Lemon Pickle" },
  { item: "Bhutuk Pickle" },
];

const Category = () => {
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <div className="categorywrapper">
            <p className="categorywrapper__title">Categories</p>
            <div className="categorywrapper__addcategorywrapper">
              <Row>
                <Col md={4}>
                  <div className="categorywrapper__addcategorywrapper--col">
                    <p className="categorywrapper__addcategorywrapper--addcategory">
                      Add Categories
                    </p>
                    <div className="categorywrapper__addcategorywrapper--categoryname">
                      <label htmlFor="name">Name</label> <br />
                      <input type="text" placeholder="Category Name" />
                    </div>
                    <div className="categorywrapper__addcategorywrapper--categoryname">
                      <label htmlFor="name">Sub category</label> <br />
                      <input type="text" placeholder="Sub category" />
                      <BiPlus className="plusIcon" />
                    </div>
                    <ul className="categorywrapper__addcategorywrapper--unorderlist">
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
                    <div className="categorywrapper__addcategorywrapper--buttons">
                      <button className="btn-discard">Discard</button>
                      <button className="btn-addcategory">Add Categorys</button>
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <div className="categorywrapper__addcategorywrapper--col">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="categorywrapper__addcategorywrapper--categorylist">
                        Categories List
                      </p>
                         
                    </div>
                    <Row className="catetgorylist-heading">
                      <Col md={2}>
                        <span>SN</span>
                      </Col>
                      <Col md={3}>
                        <span>Category</span>
                      </Col>
                      <Col md={3}>
                        <span>Sub Category</span>
                      </Col>
                      <Col md={2}>
                        <span>Product</span>
                      </Col>
                      <Col md={2}>
                        <span>Action</span>
                      </Col>
                    </Row>
                    {categoryData.map((data, index) => {
                      return <CategoryList key={index} {...data} />;
                    })}
                  </div>
                  <div className="mt-5">
                  <PaginationComp/>

                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Category;
