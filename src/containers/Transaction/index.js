import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Paginate from "../../components/PaginationComp";
import { listOrders } from "../../actions/orderAction";
import moment from "moment";
import Loader from "../../components/Loader";
import Moment from "react-moment";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Helmet } from "react-helmet";
const Transaction = () => {
  const {
    orders,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order } = useSelector((state) => state.orderDetails);
  const { success: orderUpdateSuccess } = useSelector(
    (state) => state.orderUpdate
  );
  const dispatch = useDispatch();
  const [searchedFrom, setSearchedFrom] = useState(null);
  const [searchedTo, setSearchedTo] = useState(null);
  const [searched, setSearched] = useState(null);
  const [display, setDisplay] = useState([]);
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(listOrders(pageNumber));
  }, [pageNumber]);
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  const [filterdate, setFilterDate] = useState("Day");
  const [date, setDate] = useState(true);
  const [dates, setDates] = useState(false);
  const handleChange = (e) => {
    setFilterDate(e.target.value);
  };
  useEffect(() => {
    filterdate === "Day" ? setDate(true) : setDate(false);
    filterdate === "Dates" ? setDates(true) : setDates(false);
  }, [filterdate]);
  const handleDate = (e) => {
    setSearched(e.target.value);
  };
  useEffect(() => {
    if (searched !== null) {
      setDisplay(
        orders?.orders?.filter((i) => {
          return (
            moment(new Date(i.paidAt)).format("L") ===
            moment(new Date(searched)).format("L")
          );
        })
      );
    }
  }, [searched]);
  useEffect(() => {
    if (searchedFrom !== null && searchedTo !== null) {
      setDisplay(
        orders?.orders?.filter((i) => {
          return (
            moment(new Date(i.paidAt)).format("L") >=
              moment(new Date(searchedFrom)).format("L") &&
            moment(new Date(i.paidAt)).format("L") <=
              moment(new Date(searchedTo)).format("L")
          );
        })
      );
    }
  }, [searchedFrom, searchedTo]);
  const clearDate = () => {
    setDisplay(orders.orders);
    setSearched(null);
    setSearchedFrom(null);
    setSearchedTo(null);
  };
  return (
    <>
      <Helmet>
        <title>Paicho-Transaction</title>
      </Helmet>
      <div className="transactionwrapper">
        <p className="transactionwrapper__title">Transaction</p>
        <div className="transactionwrapper__background">
          <div className="d-flex justify-content-between align-items-center transactionwrapper__background--transactionheading">
            <div>
              <select className="orderwrapper__background--selectstatus">
                <option selected>Method</option>
                {/* <option>Esewa</option>
                <option>Phone Pay</option>
                <option>Mobile Banking</option> */}
                <option>Cash on delivery</option>
              </select>
            </div>

            <div>
              <div className="d-flex">
                <div>
                  <select
                    className="orderwrapper__background--selectstatus"
                    onChange={handleChange}
                  >
                    <option value="Day">Day</option>
                    <option value="Dates">Dates</option>
                  </select>
                </div>
                {date && (
                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                    {/* <AiOutlineCalendar className="calendericon" /> */}
                    <input type="date" value={searched} onChange={handleDate} />
                  </div>
                )}
                {dates && (
                  <>
                    <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                      <div className="reportwrapper__background--right-title inputabsolute">
                        From
                      </div>
                      <input
                        type="date"
                        placeholder="03/23/2020"
                        value={searchedFrom}
                        onChange={(e) => setSearchedFrom(e.target.value)}
                      />
                    </div>
                    <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                      <div className="reportwrapper__background--right-title inputabsolute">
                        To
                      </div>
                      <input
                        type="date"
                        placeholder="03/23/2020"
                        value={searchedTo}
                        onChange={(e) => setSearchedTo(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <button
                  className="me-3 pe-3 ps-3"
                  style={{ border: "none", borderRadius: "3px" }}
                  onClick={clearDate}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="orderwrapper__background--headingrow transactionlistheading">
            <Row>
              <Col md={2}>User Name</Col>
              <Col md={3}>Address</Col>
              <Col md={2}>Method</Col>
              <Col md={3}>Date</Col>
              <Col md={2}>Amount</Col>
            </Row>
          </div>
          <div>
            {searched === null &&
            searchedFrom === null &&
            searchedTo === null ? (
              <>
                {orders &&
                  orders.orders &&
                  orders?.orders
                    ?.filter(
                      (x) => x.paymentInfo.paymentmethod === "Cash on Delivery"
                    )
                    .map((curElm, index) => {
                      return (
                        <Row
                          className="productlistwrapper__productlistwrapper--listitem transactionlistleft"
                          key={index}
                        >
                          <Col md={2}>
                            <p>
                              {curElm.shippingInfo &&
                              curElm.shippingInfo.fullname
                                ? curElm.shippingInfo.fullname
                                : "no"}
                            </p>
                          </Col>
                          <Col md={3}>
                            <p>
                              {curElm.shippingInfo &&
                              curElm.shippingInfo.address
                                ? curElm.shippingInfo.address
                                : "no"}
                            </p>
                          </Col>
                          <Col md={2}>
                            <p>
                              {curElm.paymentInfo &&
                              curElm.paymentInfo.paymentmethod
                                ? curElm.paymentInfo.paymentmethod
                                : ""}
                            </p>
                          </Col>
                          <Col md={3}>
                            <p>
                              <Moment format="DD/MM/YYYY">
                                {curElm.createdAt && curElm.createdAt
                                  ? curElm.createdAt
                                  : ""}
                              </Moment>
                            </p>
                          </Col>
                          <Col md={2}>
                            <p> Rs.{curElm.totalPrice}</p>
                          </Col>
                        </Row>
                      );
                    })}
              </>
            ) : (
              <>
                {display &&
                  display
                    ?.filter(
                      (x) => x.paymentInfo.paymentmethod === "Cash on Delivery"
                    )
                    .map((curElm, index) => {
                      return (
                        <Row
                          className="productlistwrapper__productlistwrapper--listitem transactionlistleft"
                          key={index}
                        >
                          <Col md={2}>
                            <p>
                              {curElm.shippingInfo &&
                              curElm.shippingInfo.fullname
                                ? curElm.shippingInfo.fullname
                                : "no"}
                            </p>
                          </Col>
                          <Col md={3}>
                            <p>
                              {curElm.shippingInfo &&
                              curElm.shippingInfo.address
                                ? curElm.shippingInfo.address
                                : "no"}
                            </p>
                          </Col>
                          <Col md={2}>
                            <p>
                              {curElm.paymentInfo &&
                              curElm.paymentInfo.paymentmethod
                                ? curElm.paymentInfo.paymentmethod
                                : ""}
                            </p>
                          </Col>
                          <Col md={3}>
                            <p>
                              <Moment format="DD/MM/YYYY">
                                {curElm.createdAt
                                  ? moment(new Date(curElm.paidAt)).format("L")
                                  : ""}
                              </Moment>
                            </p>
                          </Col>
                          <Col md={2}>
                            <p> Rs.{curElm.totalPrice}</p>
                          </Col>
                        </Row>
                      );
                    })}
              </>
            )}
          </div>
        </div>
        {!paginationLoading ? (
          <>
            <div className="mt-5">
              <Paginate
                pages={pages}
                page={page}
                list="order"
                history={navigate}
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

export default Transaction;
