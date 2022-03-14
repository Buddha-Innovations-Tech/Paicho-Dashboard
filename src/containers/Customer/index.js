import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PaginationComp from "../../components/PaginationComp";
import { BiSearch } from "react-icons/bi";
import { AiOutlineFilePdf } from "react-icons/ai";
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
    order: "no orders",
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
    order: "no orders",
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
    order: "no orders",
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
  const [sortType, setSortType] = useState("Orders");
  const [sorting, setSorting] = useState(customerList);
  // const newCustomerlist=customerList.filter((c)=>(
  //   typeof(c.order)==="number"

  // ))
  // const newCustomerlistString=customerList.filter((c)=>(
  //   typeof(c.order)==="string"

  // ))
  // console.log(newCustomerlist);
  const sorted = sorting.sort((a, b) => {
    if (sortType === "Orders") {
      return sorting;
    } else if (sortType === "Highest Orders") {
      return b.order - a.order;
      // return [...b.order-a.order,...newCustomerlistString];
    } else if (sortType === "Lowest Orders") {
      return a.order - b.order;

      // setSorting([...sorted,...newCustomerlistString]);
    }
    // else if(sortType="Lowest Orders"){
    //   setSorting([...newCustomerlistString,...sorted]);
    // }

    setSorting(sorted);
  });
  // const sorted =customerList.sort((a,b)=>{
  //   if(sorting==="Orders"){
  //     return a.order>b.order?1:-1
  //   })

  //  setSorting(sorted);
  // }
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />

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
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option selected>Orders</option>
                    <option value="Highest Orders"> Highest Orders </option>
                    <option value="Lowest Orders">Lowest Orders</option>
                    <option value="No Orders">No Orders</option>
                  </select>
                </div>
              </div>

              <div>
                <Row className="orderwrapper__background--headingrow customerlistheading">
                  <Col md={1}>ID</Col>
                  <Col md={2}>Name</Col>
                  <Col md={2}>Phone Number</Col>
                  <Col md={2}>Email</Col>
                  <Col md={3}>Address</Col>
                  <Col md={2}>Total Order</Col>
                </Row>
              </div>

              <div>
                {sorting.map((curElm, index) => {
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
                        <p>{curElm.order}</p>
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
        </Col>
      </Row>
    </>
  );
};

export default Customer;
