import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

// import ProductImg from "../../assets/images/ProductListImg.png";
// import PaginationComp from "../../components/PaginationComp";
import { listArchiveProducts, listProducts } from '../../actions/productAction';
import Paginate from '../../components/PaginationComp';
import Loader from '../../components/Loader';
// import SideBar from "../../components/SideBar";
// import NavBar from "../../components/NavBar";
// import axios from "axios";
import { Helmet } from 'react-helmet';

const ProductList = () => {
  const [searchinput, setSearchInput] = useState('');
  let { pageNumber } = useParams();

  const history = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // pageNumber = pageNumber || 1;
  const {
    products,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.productList);
  const { success: productUpdateSuccess } = useSelector(
    (state) => state.productUpdate
  );

  const { archiveproducts } = useSelector((state) => state.archiveProductList);
  const handleChange = async (e) => {
    setFilterTerm(e.target.value);
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };
    // if (filterTerm === "Archived") {
    //   await axios.get(`/api/products/list/archive/`, config);
    // }
  };
  // useEffect(() => {
  //   dispatch(listProducts(pageNumber));
  // }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(listArchiveProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  useEffect(() => {
    if (productUpdateSuccess) {
      dispatch(listProducts());
    }
  }, [productUpdateSuccess]);
  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [pageNumber]);
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  const [filterTerm, setFilterTerm] = useState('Stock');
  return (
    <>
      <Helmet>
        <title>Paicho-Product List</title>
      </Helmet>
      <div className='productlistwrapper'>
        <p className='productlistwrapper__title'>Product list</p>
        <div className='productlistwrapper__productlistwrapper'>
          <div className='d-flex justify-content-between align-items-center productlistwrapper__productlistwrapper--heading'>
            <div className='categorywrapper__addcategorywrapper--searchinput'>
              <BiSearch className='searchicon' />
              <input
                type='text'
                placeholder='Search category'
                value={searchinput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* <button onClick={()=>filterItem('abc')}>Edit</button> */}
            <div className='d-flex justify-content-between align-items-center'>
              {/* <div className="me-4">
                <select id="subcategory" name="subcategory">
                  <option value="volvo" defaultValue>
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
                <select onChange={handleChange}>
                  <option value='Stock'>Stock</option>
                  <option value='In Stock'> In Stock </option>
                  <option value='Out Of Stock'>Out of Stock</option>
                  <option value='Archived'>Archived</option>
                </select>
              </div>
            </div>
          </div>
          <div className='productlistwrapper__productlistwrapper--headingrow'>
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
            {filterTerm === 'Stock' &&
              products &&
              products
                ?.filter((i) =>
                  i.category?.name.toLowerCase().includes(searchinput)
                )
                ?.map((curElm, index) => {
                  return (
                    <Row
                      className='productlistwrapper__productlistwrapper--listitem'
                      key={index}
                    >
                      <Col md={1}>
                        <p>{index + 1}</p>
                      </Col>
                      <Col md={2}>
                        <div className='d-flex  align-items-center'>
                          {/* <img
                              src={`http://localhost:5000${curElm.image}`}
                              alt=""
                            /> */}
                          <img
                            src={`${curElm.image[0]}`}
                            alt=''
                            className='productlist-image'
                          />
                          <p>{curElm.name}</p>
                        </div>
                      </Col>
                      <Col md={2}>
                        <p>
                          {curElm.category && curElm.category.name
                            ? curElm.category.name
                            : ''}
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
                                ? '#3D6703'
                                : curElm.countInStock === 0
                                ? '#FF3A00'
                                : '#920000',
                            background:
                              curElm.countInStock !== 0
                                ? '#DDEEC5'
                                : curElm.countInStock === 0
                                ? '#FFEBE6'
                                : '#F4E6E6',
                            borderRadius: '28px',
                            padding: '5px 10px',
                            textAlign: 'center',
                          }}
                        >
                          {curElm.countInStock !== 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </p>
                      </Col>
                      <Col md={2}>
                        <button
                          className='editbtn'
                          onClick={() => {
                            navigate(`/editproduct/${curElm._id}`);
                          }}
                        >
                          Edit
                        </button>
                      </Col>
                    </Row>
                  );
                })}
            {filterTerm === 'In Stock' &&
              products &&
              products
                ?.filter((i) => i.countInStock !== 0)
                ?.map((i, index) => (
                  <Row
                    className='productlistwrapper__productlistwrapper--listitem'
                    key={index}
                  >
                    <Col md={1}>
                      <p>{index + 1}</p>
                    </Col>
                    <Col md={3}>
                      <div className='d-flex  align-items-center'>
                        <img
                          src={i.image}
                          alt=''
                          className='productlist-image'
                        />
                        <p className='ms-2 mt-3'>{i.name}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <p>
                        {' '}
                        {i.category && i.category.name ? i.category.name : ''}
                      </p>
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
                            i.countInStock !== 0
                              ? '#3D6703'
                              : i.countInStock === 0
                              ? '#FF3A00'
                              : '#920000',
                          background:
                            i.countInStock !== 0
                              ? '#DDEEC5'
                              : i.countInStock === 0
                              ? '#FFEBE6'
                              : '#F4E6E6',
                          borderRadius: '28px',
                          padding: '5px 10px',
                          textAlign: 'center',
                        }}
                      >
                        {i.countInStock !== 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </Col>
                    <Col md={2}>
                      <button
                        className='editbtn'
                        onClick={() => {
                          navigate(`/editproduct/${i._id}`);
                        }}
                      >
                        Edit
                      </button>
                    </Col>
                  </Row>
                ))}
            {filterTerm === 'Out Of Stock' &&
              products &&
              products
                ?.filter((i) => i.countInStock === 0)
                ?.map((i, index) => (
                  <Row
                    className='productlistwrapper__productlistwrapper--listitem'
                    key={index}
                  >
                    <Col md={1}>
                      <p>{index + 1}</p>
                    </Col>
                    <Col md={2}>
                      <div className='d-flex  align-items-center'>
                        <img
                          src={i.image}
                          alt=''
                          className='productlist-image'
                        />
                        <p className='ms-2 mt-3'>{i.name}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <p>
                        {i.category && i.category.name ? i.category.name : ''}
                      </p>
                    </Col>
                    <Col md={2}>
                      <p>{i.price}</p>
                    </Col>
                    <Col md={1}>
                      <p>{i.discount}</p>
                    </Col>
                    <Col md={2}>
                      <p
                        style={{
                          color:
                            i.countInStock !== 0
                              ? '#3D6703'
                              : i.countInStock === 0
                              ? '#FF3A00'
                              : '#920000',
                          background:
                            i.countInStock !== 0
                              ? '#DDEEC5'
                              : i.countInStock === 0
                              ? '#FFEBE6'
                              : '#F4E6E6',
                          borderRadius: '28px',
                          padding: '5px 10px',
                          textAlign: 'center',
                        }}
                      >
                        {i.countInStock !== 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </Col>
                    <Col md={2}>
                      <button
                        className='editbtn'
                        onClick={() => {
                          navigate(`/editproduct/${i._id}`);
                        }}
                      >
                        Edit
                      </button>
                    </Col>
                  </Row>
                ))}
            {filterTerm === 'Archived' &&
              archiveproducts?.archiveproducts.length > 0 &&
              archiveproducts?.archiveproducts?.map((i, index) => {
                return (
                  <Row
                    className='productlistwrapper__productlistwrapper--listitem'
                    key={index}
                  >
                    <Col md={1}>
                      <p>{index + 1}</p>
                    </Col>
                    <Col md={2}>
                      <div className='d-flex  align-items-center'>
                        <img
                          src={i.image[0]}
                          alt=''
                          className='productlist-image'
                        />
                        <p className='ms-2 mt-3'>{i.name}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      {i.category && i.category.name ? i.category.name : ''}
                    </Col>
                    <Col md={2}>
                      <p>{i.price}</p>
                    </Col>
                    <Col md={1}>
                      <p>{i.discount}</p>
                    </Col>
                    <Col md={2}>
                      <p
                        style={{
                          color:
                            i.countInStock !== 0
                              ? '#3D6703'
                              : i.countInStock === 0
                              ? '#FF3A00'
                              : '#920000',
                          background:
                            i.countInStock !== 0
                              ? '#DDEEC5'
                              : i.countInStock === 0
                              ? '#FFEBE6'
                              : '#F4E6E6',
                          borderRadius: '28px',
                          padding: '5px 10px',
                          textAlign: 'center',
                        }}
                      >
                        {i.removeStatus === true ? 'Archived' : ''}
                      </p>
                    </Col>
                    <Col md={2}>
                      <button
                        className='editbtn'
                        onClick={() => {
                          navigate(`/editproduct/${i._id}`);
                        }}
                      >
                        Edit
                      </button>
                    </Col>
                  </Row>
                );
              })}
          </div>
        </div>
        {!paginationLoading ? (
          <>
            <div className='mt-5'>
              <Paginate
                pages={pages}
                page={page}
                list='productlist'
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
