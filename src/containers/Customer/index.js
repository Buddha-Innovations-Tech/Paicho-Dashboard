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
  const [sortType, setSortType] = useState("Orders");
  const [searchInput, setSearchInput] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  let sorted = [];
  // const history = useNavigate();
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

  useEffect(() => {
    dispatch(listSubscribers(pageNumber));
  }, [pageNumber]);



  const subs = subscribers?.users;
  const [sorting, setSorting] = useState(subscribers?.users);


  useEffect(()=>{
    if(subscribers){

      setSorting(subscribers?.users);
    }
  },[subscribers])
  const dispatch = useDispatch();
  const changeSort =  async () => {
    
    if (sortType.toLowerCase() === "Orders".toLowerCase()) {
      setSorting(subscribers?.users);
    } 
    else if (sortType.toLowerCase() === "Highest".toLowerCase()) {
     
       sorted = await subscribers?.users.sort((a, b) => {
        return a.orders.length < b.orders.length ?1:-1;
      });
      setSorting([...sorted]);
    } else if (sortType.toLowerCase() === "Lowest".toLowerCase()) {
       sorted = await subscribers?.users.sort((a, b) => {
        return a.orders.length > b.orders.length ? 1:-1;
      });
      
      setSorting([...sorted]);
    } else {
      setSorting(subs.filter((i) => i.orders.length === 0));
    }
  };

  useEffect(() => {
        changeSort();
  }, [sortType]);

  // const sorted = sorting?.sort((a, b) => {
  //   if (sortType === "Orders") {
  //     return sorting;
  //   } else if (sortType === "Highest Orders") {
  //     return b.orders.length - a.orders.length;
  //   } else if (sortType === "Lowest Orders") {
  //     return a.orders.length - b.orders.length;
  //   }else if(sortType==="No Orders"){
  //     return sorting.filter((i) => i.orders.length === 0)
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
                  setSortType(e.target.value);
                }}
              >
                <option value="Orders">Orders</option>
                <option value="Highest"> Highest Orders </option>
                <option value="Lowest">Lowest Orders</option>
                <option value="No Orders">No Orders</option>
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
            {sorting &&
              sorting
                ?.filter((customer) =>
                  customer.firstname.toLowerCase().includes(searchInput)
                )
                ?.map((curElm, index) => {
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
                        <p>{curElm?.billingaddress?.billingaddress}</p>
                      </Col>

                      <Col md={2}>
                        <p>{curElm.orders.length === 0 ? "No Order" : curElm.orders.length}</p>
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

export default Customer;
