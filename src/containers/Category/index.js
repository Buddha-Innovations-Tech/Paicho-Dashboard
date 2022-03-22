import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// import { categoryData } from "../../components/CategoryList";
import PaginationComp from "../../components/PaginationComp";
import CategoryList from "../../components/CategoryList";
import { listCategories } from "../../actions/categoryAction";

const subcategoryItem = [
  { item: "Paicho Pickle" },
  { item: "Mango Pickle" },
  { item: "Lemon Pickle" },
  { item: "Bhutuk Pickle" },
];

const Category = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryList);
  // console.log(categories);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  return (
    <>
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

                  <button className="btn-addcategory">Add Category</button>
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
                {categories &&
                  categories.map((data, index) => {
                    return <CategoryList key={index} index={index} {...data} />;
                  })}
              </div>
              <div className="mt-5">
                <PaginationComp />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Category;
