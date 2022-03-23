import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";

// import { categoryData } from "../../components/CategoryList";
import PaginationComp from "../../components/PaginationComp";
import CategoryList from "../../components/CategoryList";

import {
  listCategoryDetails,
  updateCategory,
} from "../../actions/categoryAction";

// const subcategoryItem = [
//   { item: "Paicho Pickle" },
//   { item: "Mango Pickle" },
//   { item: "Lemon Pickle" },
//   { item: "Bhutuk Pickle" },
// ];

const EditCategory = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo);

  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const [test, setTest] = useState("");
  const [state, setState] = useState({
    name: "",
  });
  const { name } = state;
  const { category } = useSelector((state) => state.categoryDetails);

  const { categories } = useSelector((state) => state.categoryList);
  const [subCategories, setSubCategories] = useState([]);

  // const subcat = category.subcategories;
  // console.log(subcat);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(state));
    // state("");
    // navigate("/register");
  };

  useEffect(() => {
    if (category) {
      setState({ ...category });
      setSubCategories(
        category.subcategories && category.subcategories.map((i) => i.name)
      );
    }
  }, [category]);

  useEffect(() => {
    dispatch(listCategoryDetails(id));
  }, [id]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <>
      <div className="categorywrapper">
        <p className="categorywrapper__title">Categories</p>
        <div className="categorywrapper__addcategorywrapper">
          <Row>
            <Col md={4}>
              <div className="categorywrapper__addcategorywrapper--col">
                <p className="categorywrapper__addcategorywrapper--addcategory">
                  Edit Categories
                </p>
                <Form onSubmit={handleSubmit}>
                  <div className="categorywrapper__addcategorywrapper--categoryname">
                    <label htmlFor="name">Name</label> <br />
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="categorywrapper__addcategorywrapper--categoryname">
                    <label htmlFor="name">Sub category</label> <br />
                    <input
                      type="text"
                      placeholder="Sub Category"
                      value={test}
                      onChange={(e) => setTest(e.target.value)}
                      required
                    />
                    <BiPlus
                      className="plusIcon"
                      onClick={(e) =>
                        setSubCategories([test, ...subCategories])
                      }
                    />
                  </div>
                  <ul className="categorywrapper__addcategorywrapper--unorderlist">
                    {subCategories &&
                      subCategories.map((curElm, index) => {
                        return (
                          <li
                            className="d-flex align-items-center justify-content-between"
                            key={index}
                          >
                            <p>{curElm}</p>
                            <ImCross className="crossicon" />
                          </li>
                        );
                      })}
                  </ul>
                </Form>

                <div className="categorywrapper__addcategorywrapper--buttons">
                  <button className="btn-discard">Discard</button>
                  <button className="btn-addcategory">Update Category</button>
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
                {categories.map((data, index) => {
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

export default EditCategory;
