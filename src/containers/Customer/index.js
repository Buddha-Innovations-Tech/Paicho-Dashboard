import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

import PaginationComp from "../../components/PaginationComp";
import { listUsers } from "../../actions/userActions";

const customerList = [
  {
    id: 1,
    username: "Sindhu aryal",
    Phone: 9847135126,
    email: "sindhu.12@gmail.com",
    address: "Butwal 10,Sukhanagar",
    order: 320,
  },
  {
    id: 2,
    username: "Sindhu ",
    Phone: 9847135126,
    email: "sindhu2@gmail.com",
    address: "Butwal 11,Shankhanagar",
    order: 0,
  },
  {
    id: 3,
    username: "Laxmi Pandey",
    Phone: 9847135126,
    email: "laxmi.12@gmail.com",
    address: "Butwal Golpark",
    order: 400,
  },
  {
    id: 4,
    username: "Sagar Gc",
    Phone: 9847135126,
    email: "sagar.12@gmail.com",
    address: "Butwal 10,Belbas",
    order: 440,
  },
  {
    id: 5,
    username: "Sindhu aryal",
    Phone: 9847135126,
    email: "sindhu.12@gmail.com",
    address: "Butwal 10,Sukhanagar",
    order: 45,
  },
  {
    id: 6,
    username: "Sindhu ",
    Phone: 9847135126,
    email: "sindhu2@gmail.com",
    address: "Butwal 11,Shankhanagar",
    order: 0,
  },
  {
    id: 7,
    username: "Laxmi Pandey",
    Phone: 9847135126,
    email: "laxmi.12@gmail.com",
    address: "Butwal Golpark",
    order: 350,
  },
  {
    id: 8,
    username: "Sagar Gc",
    Phone: 9847135126,
    email: "sagar.12@gmail.com",
    address: "Butwal 10,Belbas",
    order: 410,
  },
  {
    id: 9,
    username: "Sindhu aryal",
    Phone: 9847135126,
    email: "sindhu.12@gmail.com",
    address: "Butwal 10,Sukhanagar",
    order: 310,
  },
  {
    id: 10,
    username: "Sindhu ",
    Phone: 9847135126,
    email: "sindhu2@gmail.com",
    address: "Butwal 11,Shankhanagar",
    order: 0,
  },
  {
    id: 11,
    username: "Laxmi Pandey",
    Phone: 9847135126,
    email: "laxmi.12@gmail.com",
    address: "Butwal Golpark",
    order: 70,
  },
  {
    id: 12,
    username: "Sagar Gc",
    Phone: 9847135126,
    email: "sagar.12@gmail.com",
    address: "Butwal 10,Belbas",
    order: 90,
  },
];

const Customer = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  console.log(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!userInfo.superAdmin) {
      navigate("/home");
    }
  }, [userInfo]);

  const [sortType, setSortType] = useState("Orders");
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState(customerList);
  const dispatch = useDispatch();
  const changeSort = () => {
    if (sortType.toLowerCase() === "Orders".toLowerCase()) {
      setSorting(customerList);
    } else if (sortType.toLowerCase() === "Highest Orders".toLowerCase()) {
      const sorted = customerList.sort((a, b) => {
        return b.order - a.order;
      });
      setLoading(true);
      setSorting(sorted);
      setLoading(false);
    } else if (sortType.toLowerCase() === "Lowest Orders".toLowerCase()) {
      const sorted = customerList.sort((a, b) => {
        return a.order - b.order;
      });
      setLoading(true);
      setSorting(sorted);
      setLoading(false);
    } else {
      setSorting(customerList.filter((i) => i.order === 0));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      changeSort();
    }, 100);
  }, [sortType]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

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
              <input type="text" placeholder="Search Customer" />
            </div>

            <div>
              <select
                className="orderwrapper__background--selectstatus"
                onChange={(e) => {
                  setSortType(e.target.value);
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
              <Col md={2}>Email</Col>
              <Col md={3}>Address</Col>
              <Col md={2}>Total Order</Col>
            </Row>
          </div>

          <div>
            {sorting &&
              sorting.map((curElm, index) => {
                return (
                  <Row
                    className="productlistwrapper__productlistwrapper--listitem customerlistleft"
                    key={index}
                  >
                    <Col md={1}>
                      <p>{curElm.id}</p>
                    </Col>
                    <Col md={2}>
                      <p>{curElm.username}</p>
                    </Col>
                    <Col md={2}>
                      <p>{curElm.Phone}</p>
                    </Col>
                    <Col md={2}>
                      <p>{curElm.email}</p>
                    </Col>
                    <Col md={3}>
                      <p>{curElm.address}</p>
                    </Col>

                    <Col md={2}>
                      <p>{curElm.order === 0 ? "No orders" : curElm.order}</p>
                    </Col>
                  </Row>
                );
              })}
          </div>
        </div>

        <div className="mt-5">
          <PaginationComp />
        </div>
      </div>
    </>
  );
};

export default Customer;
