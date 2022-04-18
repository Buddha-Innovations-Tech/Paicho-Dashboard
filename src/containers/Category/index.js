import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../components/PaginationComp";
import PaginationComp from "../../components/PaginationComp";
import CategoryList from "../../components/CategoryList";
import { listCategories, createCategory } from "../../actions/categoryAction";
import Loader from "../../components/Loader";

const Category = () => {
  const [name, setName] = useState("");
  const [test, setTest] = useState("");
  const [checked, setChecked] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const { categories, pages, page, loading } = useSelector(
    (state) => state.categoryList
  );
  const { success } = useSelector((state) => state.createCategory);
  const { success: categoryUpdateSuccess, loading: categoryUpdateLoading } =
    useSelector((state) => state.categoryUpdate);
  const [subCategories, setSubCategories] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
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
    dispatch(createCategory(data));
    setName("");
    setSubCategories([]);
  };
  // console.log(categories);
  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    if (categoryUpdateSuccess) {
      dispatch(listCategories());
    }
  }, [categoryUpdateSuccess]);
  // useEffect(() => {
  //   if (categoryUpdateLoading) {
  //     dispatch(listCategories());
  //   }
  // }, [categoryUpdateLoading]);

  useEffect(() => {
    dispatch(listCategories());
  }, [success]);
  useEffect(() => {
    dispatch(listCategories(pageNumber));
  }, [pageNumber]);
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
                <Form onSubmit={handleSubmit}>
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
                        !subCategories.find((i) => i === test) &&
                          test.trim() !== "" &&
                          setSubCategories([test, ...subCategories]);
                        setTest("");
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

                  {!loading ? (
                    <>
                      <div className="categorywrapper__addcategorywrapper--buttons">
                        <button className="btn-discard">Discard</button>

                        <button
                          className="btn-addcategory"
                          onClick={handleSubmit}
                        >
                          Add Category
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
                {categories &&
                  categories.map((data, index) => {
                    return <CategoryList key={index} index={index} {...data} />;
                  })}
              </div>
              {!loading ? (
                <div className="mt-5">
                  <Paginate
                    pages={pages}
                    page={page}
                    list="category"
                    history={history}
                  />
                </div>
              ) : (
                <Loader />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Category;
