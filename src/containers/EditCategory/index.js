import { useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import PaginationComp from "../../components/PaginationComp";
import CategoryList from "../../components/CategoryList";

import {
  listCategories,
  listCategoryDetails,
  updateCategory,
} from "../../actions/categoryAction";
import Loader from "../../components/Loader";

const EditCategory = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo);
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const [test, setTest] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const { category } = useSelector((state) => state.categoryDetails);
  const { categories } = useSelector((state) => state.categoryList);

  const { success: updateSuccess, loading: categoryUpdateLoading } =
    useSelector((state) => state.categoryUpdate);
  // const { success: categorySuccess } = useSelector(
  //   (state) => state.categoryUpdate
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: categoryName,
      subcategories: subCategories.map((i) => {
        return { name: i };
      }),
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (checked) {
      await axios.put(`/api/categories/archive/${id}`, category, config);
    } else {
      dispatch(updateCategory(data, id));
    }

    navigate("/category");
    setCategoryName("");
    setTest("");
  };

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSubCategories(
        category.subcategories && category.subcategories.map((i) => i.name)
      );
    }
  }, [category]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(listCategories());
    }
  }, [updateSuccess]);

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
                      name="name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
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
                    />
                    <BiPlus
                      className="plusIcon"
                      onClick={(e) => {
                        !subCategories.find((i) => i === test) &&
                          test.trim() !== "" &&
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

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={checked}
                      id="flexCheckDefault"
                      onChange={(e) => {
                        console.log(e.target.checked);
                        setChecked(e.target.checked);
                      }}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Archive this category
                    </label>
                  </div>

                  {!categoryUpdateLoading ? (
                    <>
                      <div className="categorywrapper__addcategorywrapper--buttons">
                        <button className="btn-discard">Discard</button>
                        <button className="btn-addcategory">
                          Update Category
                        </button>
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </Form>
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
                  return (
                    <CategoryList
                      key={index}
                      index={index}
                      {...data}
                      test={test}
                    />
                  );
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
