import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, FormControl, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import Previews from "../../components/DragAndDrop";
import {
  createProduct,
  listProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { listCategories } from "../../actions/categoryAction";

import Loader from "../../components/Loader";
import axios from "axios";

const EditProduct = () => {
  // const [name, setProduct] = useState("");
  const [editcategory, setEditCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategorystate, setSubCategoryState] = useState("");
  // const [description, setDescription] = useState("");
  // const [count, setCount] = useState("");
  // const [discount, setDiscount] = useState("");
  // const [price, setPrice] = useState("");

  // const [keyword, setKeyword] = useState("");
  // const [ingredient, setIngredient] = useState("");
  // const [similarproduct, setSimilarProduct] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [dltsimilarpdct, setDltSimilarPdct] = useState([]);
  const [seo, setSeo] = useState([]);
  // const [images, setImage] = useState("");
  // const [product, setProduct] = useState("");
  const [checked, setChecked] = useState(false);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "category") {
      setCatId(value);
    } else {
      setUpdateProducts({ ...updateProducts, [name]: value });
    }
  };
  const handleImage = (value) => {
    setUpdateProducts({ ...updateProducts, ["image"]: value });
  };
  const [catId, setCatId] = useState("");
  const [updateProducts, setUpdateProducts] = useState({
    name: "",
    category: "",
    description: "",
    countInStock: "",
    discount: "",
    // count: "",
    price: "",
    keyword: "",
    ingredient: "",
    similarproduct: "",
    image: "",
  });
  const {
    name,
    category,
    description,
    countInStock,
    discount,
    price,
    keyword,
    ingredient,
    similarproduct,
    image,
  } = updateProducts;

  const { userInfo } = useSelector((state) => state.userLogin);
  const { categories } = useSelector((state) => state.categoryList);
  const { loading, product } = useSelector((state) => state.productDetails);

  const { loading: productUpdateLoading } = useSelector(
    (state) => state.productUpdate
  );

  useEffect(() => {
    setUpdateProducts({ ...product });
    setDltSimilarPdct(product.similar && product.similar.map((i) => i.name));
    setSubCategories(product.ingredient && product.ingredient.map((i) => i));
    setSeo(product.seokeyword && product.seokeyword.map((i) => i));
    product.category && setCatId(product.category._id);
  }, [product]);

  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (checked) {
      await axios.put(`/api/products/archive/${product._id}`, {}, config);
    } else {
      dispatch(updateProduct(updateProducts));
    }
    // {
    //   !checked && axios.put(`/api/products/archive/:id`);
    // }
    navigate("/productlist");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listCategories());
  }, [userInfo]);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);
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
  // const setImage = (im) => {
  //   setUpdateProducts
  // };
  // if (loading) {
  //   return <p>loading...</p>;
  // }

  return (
    <>
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
                  />
                </div>
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
                        name="subcategory"
                        onChange={handleInputChange}
                      >
                        <option selected>Select a Sub-Category</option>
                        {subcategory.map((curElm, index) => {
                          return (
                            <option value={curElm._id} key={index}>
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
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Discount(Optional)</label>
                      <FormControl
                        type="text"
                        name="discount"
                        placeholder=" Discount"
                        value={discount}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Price(Rs)</label>
                      <FormControl
                        type="text"
                        name="price"
                        placeholder=" Price"
                        value={price}
                        onChange={handleInputChange}
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
                          value={keyword}
                          onChange={handleInputChange}
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
                <div className="addproduct-dragdrop">
                  <Previews image={image} setImage={handleImage} />
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
                        value={similarproduct}
                        onChange={handleInputChange}
                        // required
                      />
                    </Col>
                    <Col md={2}>
                      <button
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
              <label
                class="form-check-label"
                for="flexCheckDefault"
                checked={checked}
              >
                Archive this product
              </label>
            </div>
            {!productUpdateLoading ? (
              <>
                <div className="categorywrapper__addcategorywrapper--buttons">
                  <button className="btn-discard">Discard</button>
                  <button className="btn-addcategory" onClick={handleSubmit}>
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

// import { FiAlertTriangle } from "react-icons/fi";
// import { useNavigate, useParams } from "react-router-dom";
// import { Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import React, { useEffect } from "react";
// import { ImCross } from "react-icons/im";

// import InputField from "../../components/InputField";
// import Previews from "../../components/DragAndDrop";

// import { listProductDetails } from "../../actions/productAction";

// const subcategoryItem = [
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
// ];
// const ingredientItem = [
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
//   {
//     item: "Fresh Organic Mango",
//   },
// ];
// const addProductItem = [
//   {
//     item: "Garlic Achar",
//   },
//   {
//     item: "Mix Achar",
//   },
//   {
//     item: "Mango Achar",
//   },
//   {
//     item: "Garlic Achar",
//   },
//   {
//     item: "Mix Achar",
//   },
// ];

// const EditProduct = () => {
//   const { userInfo } = useSelector((state) => state.userLogin);
//   //   console.log(userInfo);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let { id } = useParams();

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     }
//   }, [userInfo]);

//   useEffect(() => {
//     dispatch(listProductDetails(id));
//   }, []);

//   return (
//     <>
//       <div className="addproductwrapper">
//         <div className="addproductwrapper__background">
//           <Row>
//             <Col md={6}>
//               <p className="addproductwrapper__background--title">
//                 Edit Product Information
//               </p>
//               <div className="mt-3">
//                 <InputField name="Name" placeholder="Product Name" />
//               </div>
//               <div className="mt-3">
//                 <Row>
//                   <Col md={6}>
//                     <label htmlFor="">Category</label>
//                     <select id="category" name="category">
//                       <option value="volvo" selected>
//                         Select a Category
//                       </option>
//                       <option value="volvo">Paicho Pickle</option>
//                       <option value="saab">Processing Item</option>
//                       <option value="fiat">Grains & Pulses</option>
//                       <option value="audi">Indenginous Product</option>
//                       <option value="audi">Dry Foods</option>
//                       <option value="audi">Ketchup & Sauces</option>
//                       <option value="audi">Organic Vegatable</option>
//                     </select>
//                   </Col>
//                   <Col md={6}>
//                     <label htmlFor="">Sub Category</label>
//                     <select id="subcategory" name="subcategory">
//                       <option value="volvo" selected>
//                         Select a Sub-Category
//                       </option>
//                       <option value="volvo">Lemon Pickle</option>
//                       <option value="saab">Bhutuk Pickle</option>
//                       <option value="fiat">Mango Pickle</option>
//                       <option value="audi">Lemon Pickle</option>
//                     </select>
//                   </Col>
//                 </Row>
//               </div>
//               <div className="mt-3">
//                 <label htmlFor="">Description</label>
//                 <textarea
//                   className="form-control"
//                   rows="5"
//                   placeholder="Description"
//                 />
//               </div>
//               <div className="mt-3">
//                 <Row>
//                   <Col md={4}>
//                     <InputField name="Stock Count" placeholder="16" />
//                   </Col>
//                   <Col md={4}>
//                     <InputField
//                       name="Discount(Optional)"
//                       placeholder="Discount"
//                     />
//                   </Col>
//                   <Col md={4}>
//                     <InputField name="Price(Rs)" placeholder="Price here" />
//                   </Col>
//                 </Row>
//                 <div className="mt-4">
//                   <Row>
//                     <Col md={9}>
//                       <InputField name="SEO Keyword" />
//                     </Col>
//                     <Col md={3}>
//                       <button className="addproductwrapper__background--addbtn">
//                         Add
//                       </button>
//                     </Col>

//                     <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
//                       {subcategoryItem.map((curElm, index) => {
//                         return (
//                           <li
//                             className="d-flex align-items-center justify-content-between"
//                             key={index}
//                           >
//                             <p>{curElm.item}</p>
//                             <ImCross className="crossicon" />
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </Row>
//                 </div>
//               </div>
//             </Col>
//             <Col md={6}>
//               <p className="addproductwrapper__background--title">
//                 Media Information
//               </p>
//               <p className="addproductwrapper__background--dragdroptitle">
//                 <FiAlertTriangle />
//                 <span>Please choose image below 5 mb</span>
//               </p>
//               <div className="addproduct-dragdrop">
//                 <Previews />
//               </div>
//             </Col>
//           </Row>
//           <div>
//             <p className="addproductwrapper__ingredientused">
//               Ingredient used in product
//             </p>
//             <Row>
//               <Col md={10}>
//                 <Row>
//                   <Col md={10}>
//                     <InputField
//                       name="Add Ingredient"
//                       placeholder="ingredient used for making this product"
//                     />
//                   </Col>
//                   <Col md={2}>
//                     <button className="addproductwrapper__addbtn">Add</button>
//                   </Col>
//                   <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
//                     {ingredientItem.map((curElm, index) => {
//                       return (
//                         <li
//                           className="d-flex align-items-center justify-content-between"
//                           key={index}
//                         >
//                           <p>{curElm.item}</p>
//                           <ImCross className="crossicon" />
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </Row>
//               </Col>
//               <Col md={2}></Col>
//             </Row>
//           </div>
//           <div>
//             <p className="addproductwrapper__ingredientused">
//               Add Similar Products
//             </p>
//             <Row>
//               <Col md={10}>
//                 <Row>
//                   <Col md={10}>
//                     <InputField
//                       name="Add Product "
//                       placeholder="Similar Product"
//                     />
//                   </Col>
//                   <Col md={2}>
//                     <button className="addproductwrapper__addbtn">Add</button>
//                   </Col>
//                   <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3">
//                     {addProductItem.map((curElm, index) => {
//                       return (
//                         <li
//                           className="d-flex align-items-center justify-content-between"
//                           key={index}
//                         >
//                           <p>{curElm.item}</p>
//                           <ImCross className="crossicon" />
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </Row>
//               </Col>
//               <Col md={2}></Col>
//             </Row>
//           </div>
//           <div className="categorywrapper__addcategorywrapper--buttons">
//             <button className="btn-discard">Discard</button>
//             <button className="btn-addcategory">Update Product</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProduct;
