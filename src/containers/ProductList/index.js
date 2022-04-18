import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import ProductImg from "../../assets/images/ProductListImg.png";
import PaginationComp from "../../components/PaginationComp";
import { listProducts } from "../../actions/productAction";
import Paginate from "../../components/PaginationComp";
import Loader from "../../components/Loader";

const ProductList = () => {
  const [searchinput, setSearchInput] = useState("");
  const { pageNumber } = useParams();

  const history = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    products,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [pageNumber]);

  const [filterTerm, setFilterTerm] = useState("Stock");
  return (
    <>
      <div className="productlistwrapper">
        <p className="productlistwrapper__title">Product list</p>
        <div className="productlistwrapper__productlistwrapper">
          <div className="d-flex justify-content-between align-items-center productlistwrapper__productlistwrapper--heading">
            <div className="categorywrapper__addcategorywrapper--searchinput">
              <BiSearch className="searchicon" />
              <input
                type="text"
                placeholder="Search category"
                value={searchinput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* <button onClick={()=>filterItem('abc')}>Edit</button> */}
            <div className="d-flex justify-content-between align-items-center">
              {/* <div className="me-4">
                <select id="subcategory" name="subcategory">
                  <option value="volvo" selected>
                    All Category
                  </option>
                  <option>Paicho Pickle</option>
                  <option>Processing Item</option>
                  <option>Grains & Pulses</option>
                  <option>Indenginous Product</option>
                  <option>Dry Foods</option>
                  <option>Ketchup & Sauces</option>
                  <option>Organic Vegatable</option>
                </select>
              </div> */}
              <div>
                <select onChange={(e) => setFilterTerm(e.target.value)}>
                  <option selected>Stock</option>
                  <option value="In Stock"> In Stock </option>
                  <option value="Out Of Stock">Out of Stock</option>
                  {/* <option value="Archived">Archived</option> */}
                </select>
              </div>
            </div>
          </div>
          <div className="productlistwrapper__productlistwrapper--headingrow">
            <Row>
              <Col md={1}>ID</Col>
              <Col md={2}>Product</Col>
              <Col md={2}>Category</Col>
              <Col md={2}>Price</Col>
              <Col md={1}>Discount</Col>
              <Col md={2}>Stock</Col>
              <Col md={2}>Action</Col>
            </Row>
          </div>
          <div>
            {filterTerm === "Stock"
              ? products &&
                products
                  .filter((i) => i.name.toLowerCase().includes(searchinput))
                  .map((curElm, index) => {
                    return (
                      <Row
                        className="productlistwrapper__productlistwrapper--listitem"
                        key={index}
                      >
                        <Col md={1}>
                          <p>{index + 1}</p>
                        </Col>
                        <Col md={2}>
                          <div className="d-flex  align-items-center">
                            {/* <img
                              src={`http://localhost:5000${curElm.image}`}
                              alt=""
                            /> */}
                            <img src={`${curElm.image}`} alt="" />
                            <p>{curElm.name}</p>
                          </div>
                        </Col>
                        <Col md={2}>
                          <p>
                            {curElm.category && curElm.category.name
                              ? curElm.category.name
                              : ""}
                          </p>
                        </Col>
                        <Col md={2}>
                          <p>{curElm.price}</p>
                        </Col>
                        <Col md={1}>
                          <p>{curElm.discount}</p>
                        </Col>
                        <Col md={2}>
                          <p
                            style={{
                              color:
                                curElm.countInStock !== 0
                                  ? "#3D6703"
                                  : curElm.countInStock === 0
                                  ? "#FF3A00"
                                  : "#920000",
                              background:
                                curElm.countInStock !== 0
                                  ? "#DDEEC5"
                                  : curElm.countInStock === 0
                                  ? "#FFEBE6"
                                  : "#F4E6E6",
                              borderRadius: "28px",
                              padding: "5px 10px",
                              textAlign: "center",
                            }}
                          >
                            {curElm.countInStock !== 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </p>
                        </Col>
                        <Col md={2}>
                          <button
                            className="editbtn"
                            onClick={() => {
                              navigate(`/editproduct/${curElm._id}`);
                            }}
                          >
                            Edit
                          </button>
                        </Col>
                      </Row>
                    );
                  })
              : products &&
                products
                  .filter((i) => i.countInStock === filterTerm)
                  .map((i) => (
                    <Row
                      className="productlistwrapper__productlistwrapper--listitem"
                      key={i.id}
                    >
                      <Col md={1}>
                        <p>{i.id}</p>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex ms-5 align-items-center">
                          <img src={i.image} alt="" />
                          <p className="ms-2 mt-3">{i.name}</p>
                        </div>
                      </Col>
                      <Col md={2}>
                        {i.category && i.category.name ? i.category.name : ""}
                      </Col>
                      <Col md={1}>
                        <p>{i.price}</p>
                      </Col>
                      <Col md={1}>
                        <p>{i.discount}</p>
                      </Col>
                      <Col md={2}>
                        <p
                          style={{
                            color:
                              i.stock === "In stock"
                                ? "#3D6703"
                                : i.stock === "Out of Stock"
                                ? "#FF3A00"
                                : "#920000",
                            background:
                              i.stock === "In Stock"
                                ? "#DDEEC5"
                                : i.stock === "Out of Stock"
                                ? "#FFEBE6"
                                : "#F4E6E6",
                            borderRadius: "28px",
                            padding: "5px 10px",
                            textAlign: "center",
                          }}
                        >
                          {i.countInStock && i.countInStock !== 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                      </Col>
                      <Col md={2}>
                        <button
                          className="editbtn"
                          onClick={() => {
                            navigate(`/editproduct/${i._id}`);
                          }}
                        >
                          Edit
                        </button>
                      </Col>
                    </Row>
                  ))}
          </div>
        </div>
        {!paginationLoading ? (
          <>
            <div className="mt-5">
              <Paginate
                pages={pages}
                page={page}
                list="productlist"
                history={history}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ProductList;
