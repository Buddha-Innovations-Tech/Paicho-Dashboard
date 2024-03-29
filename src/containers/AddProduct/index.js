import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, FormControl, Form, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Previews from "../../components/DragAndDrop";
import { createProduct } from "../../actions/productAction";
import { listCategories } from "../../actions/categoryAction";
import { listProducts,listProductsALL } from "../../actions/productAction";

import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const [image, setImage] = useState("");
  const [imgarray, setImgArray] = useState([]);
  const [name, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategories, setSubcategories] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [keywords, setKeyword] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [similar, setSimilarProduct] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [dltsimilarpdct, setDltSimilarPdct] = useState([]);
  const [seo, setSeo] = useState([]);
  const [showA, setShowA] = useState(false);
  const [countErr,setCountErr]=useState(false);
  const [discountErr,setDiscountErr]=useState(false);
  const [priceErr,setPriceErr]=useState(false);
  const [imageErr,setImageErr]=useState(false);
  const [productErr,setProductErr]=useState(false);
  const [categoryErr,setCategoryErr]=useState(false);
  const [subCategoryErr,setSubCategoryErr]=useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { categories } = useSelector((state) => state.categoryList);

  const { loading: addProductLoading, error } = useSelector(
    (state) => state.createProduct
  );
  const {success:productListSuccess}=useSelector((state)=>state.createProduct);
  const { products } = useSelector((state) => state.productALLList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  useEffect(()=>{
    if(productListSuccess){
      dispatch(listProducts());
    }
  },[productListSuccess])
  useEffect(() => {
    dispatch(listProductsALL());
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(name===""){
      setProductErr(true);
      return ;
    }
    if(category===""){
      setCategoryErr(true);
      return ;
    }
    if(subcategories===""){
      setSubCategoryErr(true);
      return;
    }
      if(Number(countInStock)<1 ){
        setCountErr(true);
        return;
      }
      if(Number(discount)<1){
        setDiscountErr(true);
        return;
      }
      if(Number(price)<1 ){
        setPriceErr(true);
        return;
      }
      if(imgarray.length<1){
        setImageErr(true);
        return;
      }
       if(countInStock<1 || discount<1 || price<1 || imgarray.length<1|| name==="" || category==="" || subcategories==="" ) {
        return false;
       }else{
        dispatch(
          createProduct({
            name,
            image: imgarray?.map((i) => i),
            description,
            countInStock,
            discount,
            price,
            seokeyword: seo.map((i) => i),
            ingredient: subCategories.map((i) => i),
            category,
            subcategories,
            similar: dltsimilarpdct.map((i) => i._id),
          })
        );
       }
      setShowA(true);
      setProduct("");
      setDescription("");
      setCount("");
      setDiscount("");
      setPrice("");
      setKeyword("");
      setIngredient("");
      setSimilarProduct("");
      if (error) {
        navigate("/addproduct");
      } else {
        navigate("/productlist");
      }
    
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
         <Helmet>
          <title>Paicho-Add Product</title>
         </Helmet>
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
                    // required
                  />
                </div>
                {productErr && name.length<=0 && <p style={{color:"red",fontSize:"12px"}}>Product is required.</p>}
                <div className="mt-3">
                  <Row>
                    <Col md={6}>
                      <label htmlFor="">Category</label>
                      <select
                        id="category"
                        name="category"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          Select a Category
                        </option>
                        {categories &&
                          categories?.map((curElm, index) => {
                            return (
                              <option value={curElm._id} key={index}>
                                {curElm.name}
                              </option>
                            );
                          })}
                      </select>
                    {categoryErr && category.length<=0 && <p style={{color:"red",fontSize:"12px"}}>Category  is required.</p>}
                    </Col>

                    <Col md={6}>
                      <label htmlFor="">Sub Category</label>

                      <select
                        id="subcategory"
                        name="subcategory"
                        onChange={(e) => {
                          setSubcategories(e.target.value);
                        }}
                      >
                        <option selected>Select a Sub-Category</option>
                        {subcategory.map((curElm, index) => {
                          return (
                            <option value={curElm.name} key={index}>
                              {curElm.name}
                            </option>
                          );
                        })}
                        {/* <option value="saab">Bhutuk Pickle</option>
                        <option value="fiat">Mango Pickle</option>
                        <option value="audi">Lemon Pickle</option> */}
                      </select>
                      {subCategoryErr && subcategories.length<=0 && <p style={{color:"red",fontSize:"12px"}}> Sub Category  is required.</p>}

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
                    required
                  />
                </div>
                <div className="mt-3">
                  <Row>
                    <Col md={4}>
                      <label htmlFor="">Stock Count</label>
                      <FormControl
                        type="number"
                        name="count"
                        placeholder=" Stock Count"
                        value={countInStock}
                        onChange={(e) => setCount(e.target.value)}
                        // required
                      />
                    {countErr && countInStock<1  &&  <p style={{color:"red",fontSize:"11px"}}>Count cannot be negative & empty.</p>}
                    </Col>
                    <Col md={4}>
                      <label htmlFor="">Discount In %(Optional)</label>
                      <FormControl
                        type="number"
                        name="discount"
                        placeholder=" Discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                      />
                    {discountErr && discount<1 &&  <p style={{color:"red",fontSize:"11px"}}>Discount cannot be negative & empty.</p>}
                    </Col>

                    <Col md={4}>
                      <label htmlFor="">Price(Rs)</label>
                      <FormControl
                        type="number"
                        name="price"
                        placeholder=" Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    {priceErr && price<1 &&  <p style={{color:"red",fontSize:"11px"}}>Price cannot be negative & empty.</p>}
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
                          required
                        />
                      </Col>
                      <Col md={3}>
                        <button
                          className="addproductwrapper__background--addbtn"
                          onClick={(e) => {
                            e.preventDefault();

                            !seo.find((i) => i === keywords) &&
                              keywords.trim() !== "" &&
                              setSeo([keywords, ...seo]);
                              setKeyword("")
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
                  <Previews imgarray={imgarray} setImgArray={setImgArray} imageErr={imageErr} />
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
                        required
                      />
                    </Col>
                    <Col md={2}>
                      <button
                        className="addproductwrapper__addbtn"
                        onClick={(e) => {
                          e.preventDefault();
                          !subCategories.find((i) => i === ingredient) &&
                            ingredient.trim() !== "" &&
                            setSubCategories([ingredient, ...subCategories]);
                            setIngredient("")
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
                        required
                      />
                    </Col>
                    
                    <ul className="categorywrapper__addcategorywrapper--unorderlist mt-3 overflowaddproduct">
                      {products &&
                        products
                          ?.filter((i) =>
                            i.name.toLowerCase().includes(similar)
                          )
                          .map((curElm, index) => {
                            return (
                              <li
                                className="d-flex align-items-center justify-content-between"
                                key={index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  !dltsimilarpdct.find((i) => i.name===curElm.name) &&
                                    // similar.trim() !== "" &&
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
                <Link to="" className="btn-discard">
                  Discard
                </Link>
                <button className="btn-addcategory" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
            </>
            {/* ) : ( */}
            {/* <Loader /> */}
            {/* )} */}
          </div>
          {error && (
            <Toast
              onClose={() => setShowA(false)}
              show={showA}
              delay={10000}
              autohide
              className="mt-3"
            >
              <Toast.Body>
                <p>{error}</p>
              </Toast.Body>
            </Toast>
          )}
        </Form>
      </div>
       
    </>
  );
};

export default AddProduct;
