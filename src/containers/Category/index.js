import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

// import { categoryData } from "../../components/CategoryList";
import PaginationComp from "../../components/PaginationComp";
import CategoryList from "../../components/CategoryList";
import { listCategories, createCategory } from "../../actions/categoryAction";

// const subcategoryItem = [
//   { item: "Paicho Pickle" },
//   { item: "Mango Pickle" },
//   { item: "Lemon Pickle" },
//   { item: "Bhutuk Pickle" },
// ];

const Category = () => {
  const [name, setName] = useState("");
  const [test, setTest] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryList);
  const { success } = useSelector((state) => state.createCategory);
  // const { categories } = useSelector((state) => state.listCategories)
  const [subCategories, setSubCategories] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, test));
  };
  // console.log(categories);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listCategories());
  }, [success]);
  return (
    <>
      <div className="categorywrapper">
        <p className="categorywrapper__title">Categories</p>
        <div className="categorywrapper__addcategorywrapper">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <div className="categorywrapper__addcategorywrapper--col">
                  <p className="categorywrapper__addcategorywrapper--addcategory">
                    Add Categories
                  </p>
                  <div className="categorywrapper__addcategorywrapper--categoryname">
                    <label htmlFor="name">Name</label> <br />
                    <input
                      type="text"
                      placeholder="Category Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="categorywrapper__addcategorywrapper--categoryname">
                    <label htmlFor="name">Sub category</label> <br />
                    <input
                      type="text"
                      placeholder="Sub category"
                      name="test"
                      value={test}
                      onChange={(e) => setTest(e.target.value)}
                    />
                    <BiPlus
                      className="plusIcon"
                      onClick={(e) => {
                        test !== "" &&
                          // subCategories.find((i) => i !== "") &&
                          setSubCategories([test, ...subCategories]);
                      }}
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
                            <ImCross
                              className="crossicon"
                              onClick={(e) =>
                                setSubCategories(
                                  subCategories.filter((i) => i !== curElm)
                                )
                              }
                            />
                          </li>
                        );
                      })}
                  </ul>
                  <div className="categorywrapper__addcategorywrapper--buttons">
                    <button className="btn-discard">Discard</button>

                    <button className="btn-addcategory" onClick={handleSubmit}>
                      Add Category
                    </button>
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
                      return (
                        <CategoryList key={index} index={index} {...data} />
                      );
                    })}
                </div>
                <div className="mt-5">
                  <PaginationComp />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Category;
