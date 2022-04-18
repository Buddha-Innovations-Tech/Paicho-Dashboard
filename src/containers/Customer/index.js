import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

import PaginationComp from "../../components/PaginationComp";
import { listSubscribers } from "../../actions/subscriberActions";
import { listOrders } from "../../actions/orderAction";
import Paginate from "../../components/PaginationComp";
import Loader from "../../components/Loader";

const Customer = () => {
  // const [sortType, setSortType] = useState("Orders");
  const [searchInput, setSearchInput] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const history = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const {
    subscribers,
    success,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.subscriberList);
  useEffect(() => {
    dispatch(listSubscribers());
  }, [success]);
  // useEffect(() => {
  //   dispatch(listOrders());
  // }, [success]);
  useEffect(() => {
    dispatch(listSubscribers(pageNumber));
  }, [pageNumber]);

  const subs = subscribers.users;
  const [sorting, setSorting] = useState(subs);
  const dispatch = useDispatch();
  // const changeSort = () => {
  //   if (sortType.toLowerCase() === "Orders".toLowerCase()) {
  //     setSorting(subs);
  //   } else if (sortType.toLowerCase() === "Highest Orders".toLowerCase()) {
  //     const sorted = subs.sort((a, b) => {
  //       return b.order - a.order;
  //     });
  //     setLoading(true);
  //     setSorting(sorted);
  //     setLoading(false);
  //   } else if (sortType.toLowerCase() === "Lowest Orders".toLowerCase()) {
  //     const sorted = subs.sort((a, b) => {
  //       return a.order - b.order;
  //     });
  //     setLoading(true);
  //     setSorting(sorted);
  //     setLoading(false);
  //   } else {
  //     setSorting(subs.filter((i) => i.order === 0));
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     changeSort();
  //   }, 100);
  // }, [sortType]);

  // const sorted = sorting.sort((a, b) => {
  //   if (sortType === "Orders") {
  //     return sorting;
  //   } else if (sortType === "Highest Orders") {
  //     return b.order - a.order;
  //     // return [...b.order-a.order,...newCustomerlistString];
  //   } else if (sortType === "Lowest Orders") {
  //     return a.order - b.order;
  //   }
  //   setSorting(sorted);
  // });

  return (
    <>
      <div className="customerwrapper">
        <div className="d-flex justify-content-between align-items-center">
          <p className="customerwrapper__title">Customer</p>
          <div className="d-flex  customerwrapper__export">
            <p>Export</p>
            <AiOutlineFilePdf className="customerwrapper__export--icon" />
          </div>
        </div>
        <div className="customerwrapper__background">
          <div className="d-flex justify-content-between align-items-center customerwrapper__background--customerheading">
            <div className="categorywrapper__addcategorywrapper--searchinput">
              <BiSearch className="searchicon" />
              <input
                type="text"
                placeholder="Search Customer"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div>
              <select
                className="orderwrapper__background--selectstatus"
                onChange={(e) => {
                  // setSortType(e.target.value);
                }}
              >
                <option selected>Orders</option>
                <option value="Highest Orders"> Highest Orders </option>
                <option value="Lowest Orders">Lowest Orders</option>
                <option value="0">No Orders</option>
              </select>
            </div>
          </div>

          <div>
            <Row className="orderwrapper__background--headingrow customerlistheading">
              <Col md={1}>SN</Col>
              <Col md={2}>Name</Col>
              <Col md={2}>Phone Number</Col>
              <Col md={3}>Email</Col>
              <Col md={2}>Address</Col>
              <Col md={2}>Total Order</Col>
            </Row>
          </div>

          <div>
            {subs &&
              subs
                .filter((customer) =>
                  customer.firstname.toLowerCase().includes(searchInput)
                )
                .map((curElm, index) => {
                  return (
                    <Row
                      className="productlistwrapper__productlistwrapper--listitem customerlistleft"
                      key={index}
                    >
                      <Col md={1}>
                        <p>{index + 1}</p>
                      </Col>
                      <Col md={2}>
                        <p>{`${curElm.firstname} ${curElm.lastname}`}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.mobilenumber}</p>
                      </Col>
                      <Col md={3}>
                        <p>{curElm.email}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.address}</p>
                      </Col>

                      <Col md={2}>
                        {/* <p>{curElm.order === 0 ? "No orders" : curElm.order}</p> */}
                        <p>{curElm.orders.length}</p>
                      </Col>
                    </Row>
                  );
                })}
          </div>
        </div>

        {!paginationLoading ? (
          <>
            <div className="mt-5">
              <Paginate
                pages={pages}
                page={page}
                list="customer"
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

export default Customer;
