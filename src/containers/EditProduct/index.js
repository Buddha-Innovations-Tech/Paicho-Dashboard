import { FiAlertTriangle } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, FormControl, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import EditDragAndDrop from "../../components/EditDragAndDrop";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Previews from "../../components/DragAndDrop";
import {
  createProduct,
  listProductDetails,
  updateProduct,
  listProducts,
  listProductsALL,
} from "../../actions/productAction";
import { listCategories } from "../../actions/categoryAction";

import Loader from "../../components/Loader";
import axios from "axios";
import { Helmet } from "react-helmet";

const EditProduct = () => {
  const [imagePath, setImagePath] = useState([]);
  const [editcategory, setEditCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategorystate, setSubCategoryState] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [dltsimilarpdct, setDltSimilarPdct] = useState([]);
  const [seo, setSeo] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [imgarray, setImgArray] = useState([]);
  const [countErr, setCountErr] = useState(false);
  const [discountErr, setDiscountErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [productErr,setProductErr]=useState(false);
  const [imageErr,setImageErr]=useState(false);
  const [catId, setCatId] = useState("");
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "category") {
      setCatId(value);
    } else {
      setUpdateProducts({ ...updateProducts, [name]: value });
    }
  };

  const [updateProducts, setUpdateProducts] = useState({
    name: "",
    category: "",
    subcategories: "",
    image: [],
    description: "",
    countInStock: "",
    discount: "",
    price: "",
    keyword: [],
    ingredient: [],
    similarproduct: [],
  });
  const {
    name,
    category,
    subcategories,
    image,
    description,
    countInStock,
    discount,
    price,
    keyword,
    ingredient,
    similarproduct,
  } = updateProducts;
  // const handleImage = (value) => {
  //   image.push(value[0]);
  //   setUpdateProducts({
  //     ...updateProducts,
  //     image: image,
  //   });
  // };
  const { userInfo } = useSelector((state) => state.userLogin);
  const { categories } = useSelector((state) => state.categoryList);
  const { loading, product } = useSelector((state) => state.productDetails);

  const { loading: productUpdateLoading } = useSelector(
    (state) => state.productUpdate
  );

  const { products } = useSelector((state) => state.productALLList);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);
  
  useEffect(() => {
    setUpdateProducts({ ...product });
    setImagePath(product?.image);
    setDltSimilarPdct(product.similar && product.similar);
    setSubCategories(product.ingredient && product.ingredient.map((i) => i));
    setSeo(product.seokeyword && product.seokeyword.map((i) => i));
    product.category && setCatId(product.category._id);
  }, [product]);

  let { id } = useParams();
  const dispatch = useDispatch();
  const validate = () => {
    if (name===""){
      setProductErr(true);
    }
    if (Number(countInStock) < 1) {
      setCountErr(true);
    }
    if (Number(discount) < 1) {
      setDiscountErr(true);
    }
    if (Number(price) < 1) {
      setPriceErr(true);
    }
    if(imagePath.length<1){
      setImageErr(true);
    }
    if (countInStock < 1 || discount < 1 || price < 1 || name==="" || Number(discount)<1 || Number(countInStock)<1 || Number(price)<1||imagePath.length===0) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listProductsALL());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = validate();
    if (check === true) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (checked && product.removeStatus === false) {
        await axios.put(`/api/products/archive/${product._id}/`, {}, config);
      } else if (checked && product.removeStatus === true) {
        await axios.put(
          `/api/products/unarchive/${product._id}/abc`,
          {},
          config
        );
      } else {
        dispatch(
          updateProduct({
            ...updateProducts,
            image: imagePath,
            ingredient: subCategories,
            similar: dltsimilarpdct,
          })
        );
      }
      navigate("/productlist");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listCategories());
  }, [userInfo]);
  const findCategory = (id) =>
    categories && categories.find((i) => i._id.toString() === id.toString());
  useEffect(() => {
    if (category) {
      const updateCategory = findCategory(catId);
      setUpdateProducts({
        ...updateProducts,
        category: categories && updateCategory,
      });
      updateCategory && setSubCategory(updateCategory.subcategories);
    }
  }, [catId]);

  return (
    <>
      <Helmet>Paicho-Edit Product</Helmet>
          <div className="addproductwrapper">
            <Form onSubmit={handleSubmit}>
              <div className="addproductwrapper__background">
                <Row>
                  <Col md={6}>
                    <p className="addproductwrapper__background--title">
                      Edit Product Information
                    </p>
                    <div className="mt-3">
                      <FormControl
                        type="text"
                        name="name"
                        placeholder="Product"
                        value={name || ""}
                        // onChange={(e) => setProduct(e.target.value)}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {productErr && name.length < 1 && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              Product is required.
                            </p>
                          )}
                    <div className="mt-3">
                      <Row>
                        <Col md={6}>
                          <label htmlFor="">Category</label>
                          <select
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                          >
                            {category && (
                              <option selected value={category._id}>
                                {category.name}
                              </option>
                            )}
                            {categories.map((curElm, index) => {
                              return (
                                <option value={curElm._id} key={index}>
                                  {curElm.name}
                                </option>
                              );
                            })}
                          </select>
                        </Col>
                        <Col md={6}>
                          <label htmlFor="">Sub Category</label>
                          <select
                            id="subcategory"
                            name="subcategories"
                            onChange={handleInputChange}
                          >
                            <option selected>{product?.subcategories}</option>
                            {subcategory.map((curElm, index) => {
                              return (
                                <option value={curElm.name} key={index}>
                                  {curElm.name}
                                </option>
                              );
                            })}
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
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <Row>
                        <Col md={4}>
                          <label htmlFor="">Stock Count</label>
                          <FormControl
                            type="text"
                            name="countInStock"
                            placeholder=" Stock Count"
                            value={countInStock}
                            onChange={handleInputChange}
                            required
                          />
                          {countErr && countInStock < 1 && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              Count cannot be negative & empty.
                            </p>
                          )}
                        </Col>
                        <Col md={4}>
                          <label htmlFor="">Discount(Optional)</label>
                          <FormControl
                            type="text"
                            name="discount"
                            placeholder=" Discount"
                            value={discount}
                            onChange={handleInputChange}
                            required
                          />
                          {discountErr && discount < 1 && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              Discount cannot be negative & empty.
                            </p>
                          )}
                        </Col>
                        <Col md={4}>
                          <label htmlFor="">Price(Rs)</label>
                          <FormControl
                            type="text"
                            name="price"
                            placeholder=" Price"
                            value={price}
                            onChange={handleInputChange}
                            required
                          />
                          {priceErr && price < 1 && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              Price cannot be negative & empty.
                            </p>
                          )}
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Row>
                          <Col md={9}>
                            <label htmlFor="">SEO(Keyword)</label>
                            <FormControl
                              type="text"
                              name="keyword"
                              value={keyword}
                              onChange={handleInputChange}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <button
                              className="addproductwrapper__background--addbtn"
                              onClick={(e) => {
                                e.preventDefault();
                                keyword !== "" && setSeo([keyword, ...seo]);
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
                    <div className="addproduct-dragdrop mb-3">
                      <EditDragAndDrop
                        imgarray={imagePath}
                        setImgArray={setImagePath}
                      />
                    </div>
                    {imageErr && imagePath.length ===0 && <p style={{color:"red",fontSize:"15px",marginTop:"20px"}}>Image is required.</p>}

                    <div className="d-flex  align-items-center mt-4">
                      {imagePath?.length>0 &&
                        imagePath?.map((curElm) => {
                          return (
                            <div
                              style={{ position: "relative", margin: "0 20px" }}
                            >
                              <img
                                src={`${curElm}`}
                                alt="card"
                                name="image"
                                className="img-fluid"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                }}
                              />
                              <ImCross
                                style={{
                                  position: "absolute",
                                  fontSize: "12px",
                                  color: "red",
                                }}
                                className="crossicon"
                                onClick={() =>
                                  setImagePath(
                                    imagePath.filter((i) => i !== curElm)
                                  )
                                }
                              />
                            </div>
                          );
                        })}
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
                            onChange={handleInputChange}
                            // required
                          />
                        </Col>
                        <Col md={2}>
                          <button
                            className="addproductwrapper__addbtn"
                            onClick={(e) => {
                              e.preventDefault();
                              ingredient !== "" &&
                                setSubCategories([
                                  ingredient,
                                  ...subCategories,
                                ]);
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
                                        subCategories.filter(
                                          (i) => i !== curElm
                                        )
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
                            value={similarproduct}
                            onChange={handleInputChange}
                            // required
                          />
                        </Col>
                        <Col md={2}>
                          {/* <button
                        className="addproductwrapper__addbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          similarproduct !== "" &&
                            setDltSimilarPdct([
                              similarproduct,
                              ...dltsimilarpdct,
                            ]);
                        }}
                      >
                        Add
                      </button> */}
                        </Col>
                        <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3 overflowaddproduct">
                          {products &&
                            products.map((curElm, index) => {
                              return (
                                <li
                                  className="d-flex align-items-center justify-content-between"
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // !dltsimilarpdct.find((i) => i === similar) &&
                                    //   similar.trim() !== "" &&
                                    setDltSimilarPdct([
                                      curElm,
                                      ...dltsimilarpdct,
                                    ]);
                                  }}
                                >
                                  <p>{curElm.name}</p>
                                </li>
                              );
                            })}
                        </ul>
                        <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
                          {dltsimilarpdct &&
                            dltsimilarpdct.map((curElm, index) => {
                              return (
                                <li
                                  className="d-flex align-items-center justify-content-between"
                                  key={index}
                                >
                                  <p>{curElm.name}</p>

                                  <ImCross
                                    className="crossicon"
                                    onClick={(e) =>
                                      setDltSimilarPdct(
                                        dltsimilarpdct.filter(
                                          (i) => i !== curElm
                                        )
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

                {product.removeStatus === false ? (
                  <>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={checked}
                        id="flexCheckDefault"
                        onChange={(e) => {
                          setChecked(e.target.checked);
                        }}
                      />
                      <label
                        class="form-check-label"
                        for="flexCheckDefault"
                        checked={checked}
                      >
                        Archive this product
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={checked}
                      id="flexCheckDefault"
                      onChange={(e) => {
                        // {console.log(e.target.checked)}
                        setChecked(e.target.checked);
                      }}
                      // {console.log(checking)}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Unarchive this product
                    </label>
                  </>
                )}

                {!productUpdateLoading ? (
                  <>
                    <div className="categorywrapper__addcategorywrapper--buttons">
                      <Link to="/productlist" className="btn-discard">
                        Discard
                      </Link>
                      <button
                        className="btn-addcategory"
                        onClick={handleSubmit}
                      >
                        Update Product
                      </button>
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </Form>
          </div>
    </>
  );
};

export default EditProduct;
