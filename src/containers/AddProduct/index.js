import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Row, Col, FormControl, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import InputField from "../../components/InputField";
import Previews from "../../components/DragAndDrop";
import { createProduct } from "../../actions/productAction";
import { listCategories } from "../../actions/categoryAction";
import Loader from "../../components/Loader";

const AddProduct = () => {
  const [image, setImage] = useState("");
  const [name, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategorystate, setSubCategoryState] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCount] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [keywords, setKeyword] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [similar, setSimilarProduct] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [dltsimilarpdct, setDltSimilarPdct] = useState([]);
  const [seo, setSeo] = useState([]);
  // const [product, setProduct] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const { categories } = useSelector((state) => state.categoryList);

  const { loading: addProductLoading } = useSelector(
    (state) => state.createProduct
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        image,
        description,
        countInStock,
        discount,
        price,
        keywords,
        ingredient,
        category,
        subcategory,
        similar,
      })
    );
    setImage("");
    setProduct("");
    setDescription("");
    setCount("");
    setDiscount("");
    setPrice("");
    setKeyword("");
    setIngredient("");
    setSimilarProduct("");
    navigate("/productlist");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listCategories());
  }, [userInfo]);

  const settingSubCategoryState = () =>
    setSubCategory(categories.find((i) => i._id === category).subcategories);

  useEffect(() => {
    if (category) settingSubCategoryState();
  }, [category]);

  return (
    <>
      <div className="addproductwrapper">
        <Form onSubmit={handleSubmit}>
          <div className="addproductwrapper__background">
            <Row>
              <Col md={6}>
                <p className="addproductwrapper__background--title">
                  Product Information
                </p>
                <div className="mt-3">
                  <FormControl
                    type="text"
                    name="product"
                    placeholder="Product"
                    value={name}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <Row>
                    <Col md={6}>
                      <label htmlFor="">Category</label>
                      <select
                        id="category"
                        name="category"
                        // onChange={handleCategory}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          Select a Category
                        </option>
                        {categories.map((curElm, index) => {
                          return (
                            <option value={curElm._id} key={index}>
                              {curElm.name}
                            </option>
                          );
                        })}
                        {/* <option value="">Processing Item</option>
                        <option value="">Grains & Pulses</option>
                        <option value="">Indenginous Product</option>
                        <option value="">Dry Foods</option>
                        <option value="">Ketchup & Sauces</option>
                        <option value="">Organic Vegatable</option> */}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="">Sub Category</label>
                      <select
                        id="subcategory"
                        name="subcategory"
                        onChange={(e) => setSubCategoryState(e.target.value)}
                      >
                        <option selected>Select a Sub-Category</option>
                        {subcategory.map((curElm, index) => {
                          return (
                            <option value={curElm._id} key={index}>
                              {curElm.name}
                            </option>
                          );
                        })}
                        {/* <option value="saab">Bhutuk Pickle</option>
                        <option value="fiat">Mango Pickle</option>
                        <option value="audi">Lemon Pickle</option> */}
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
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <Row>
                    <Col md={4}>
                      <label htmlFor="">Stock Count</label>
                      <FormControl
                        type="text"
                        name="count"
                        placeholder=" Stock Count"
                        value={countInStock}
                        onChange={(e) => setCount(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Discount(Optional)</label>
                      <FormControl
                        type="text"
                        name="discount"
                        placeholder=" Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Price(Rs)</label>
                      <FormControl
                        type="text"
                        name="price"
                        placeholder=" Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Row>
                      <Col md={9}>
                        <label htmlFor="">SEO(Keyword)</label>
                        <FormControl
                          type="text"
                          name="keyword"
                          value={keywords}
                          onChange={(e) => setKeyword(e.target.value)}
                          // required
                        />
                      </Col>
                      <Col md={3}>
                        <button
                          className="addproductwrapper__background--addbtn"
                          onClick={(e) => {
                            e.preventDefault();

                            !seo.find((i) => i === keywords) &&
                              keywords.trim() !== "" &&
                              // !subCategories.find((i) => i === similarproduct) &&
                              setSeo([keywords, ...seo]);
                          }}
                        >
                          Add
                        </button>
                      </Col>

                      <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                        {seo &&
                          seo.map((curElm, index) => {
                            return (
                              <li
                                className="d-flex align-items-center justify-content-between"
                                key={index}
                              >
                                <p>{curElm}</p>
                                <ImCross
                                  className="crossicon"
                                  onClick={(e) =>
                                    setSeo(seo.filter((i) => i !== curElm))
                                  }
                                />
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
                <p className="addproductwrapper__background--dragdroptitle">
                  <FiAlertTriangle />
                  <span>Please choose image below 5 mb</span>
                </p>
                <div className="addproduct-dragdrop">
                  <Previews image={image} setImage={setImage} />
                </div>
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
                      <FormControl
                        type="text"
                        name="ingredient"
                        value={ingredient}
                        placeholder="ingredient used for making this product"
                        onChange={(e) => setIngredient(e.target.value)}
                        // required
                      />
                    </Col>
                    <Col md={2}>
                      <button
                        className="addproductwrapper__addbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          !subCategories.find((i) => i === ingredient) &&
                            ingredient.trim() !== "" &&
                            // !subCategories.find((i) => i === similarproduct) &&
                            setSubCategories([ingredient, ...subCategories]);
                        }}
                      >
                        Add
                      </button>
                    </Col>
                    <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
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
                      <FormControl
                        type="text"
                        name="similarproduct"
                        placeholder="Similar product"
                        value={similar}
                        onChange={(e) => setSimilarProduct(e.target.value)}
                        // required
                      />
                    </Col>
                    <Col md={2}>
                      <button
                        className="addproductwrapper__addbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          !dltsimilarpdct.find((i) => i === similar) &&
                            similar.trim() !== "" &&
                            setDltSimilarPdct([similar, ...dltsimilarpdct]);
                        }}
                      >
                        Add
                      </button>
                    </Col>
                    <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                      {dltsimilarpdct &&
                        dltsimilarpdct.map((curElm, index) => {
                          return (
                            <li
                              className="d-flex align-items-center justify-content-between"
                              key={index}
                            >
                              <p>{curElm}</p>
                              <ImCross
                                className="crossicon"
                                onClick={(e) =>
                                  setDltSimilarPdct(
                                    dltsimilarpdct.filter((i) => i !== curElm)
                                  )
                                }
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </Row>
                </Col>
                <Col md={2}></Col>
              </Row>
            </div>
            {/* {!addProductLoading ? ( */}
            <>
              <div className="categorywrapper__addcategorywrapper--buttons">
                <button className="btn-discard">Discard</button>
                <button className="btn-addcategory" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
            </>
            {/* ) : ( */}
            {/* <Loader /> */}
            {/* )} */}
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
