import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import PaginationComp from "../../components/PaginationComp";
import { IoMdArrowDropdown } from "react-icons/io";
// import { AiOutlineCalendar } from "react-icons/ai";
const transactionList = [
    {
      name: "Sindhu ",
      address: "Butwal 10, Sukhanagr",
      method: "Esewa",
      date: "02/01/2020",
      amount:"Rs.50000"
    },
    {
        name: "Sindhu Aryal",
        address: "Butwal 10, Sukhanagr",
        method: "Mobile Banking",
        date: "02/01/2020",
        amount:"Rs.45000"
      },
      {
        name: "Uday Tiwari",
        address: "Butwal 15, Belbas",
        method: "Phone Pay",
        date: "02/01/2020",
        amount:"Rs.45000"
      },
      {
        name: "Sagar Gc",
        address: "Butwal 11, Murgiya",
        method: "Cash on delivery",
        date: "02/01/2020",
        amount:"Rs.45000"
      },
      {
        name: "Sindhu ",
        address: "Butwal 10, Sukhanagr",
        method: "Esewa",
        date: "02/01/2020",
        amount:"Rs.50000"
      },
      {
          name: "Sindhu Aryal",
          address: "Butwal 10, Sukhanagr",
          method: "Mobile Banking",
          date: "02/01/2020",
          amount:"Rs.45000"
        },
        {
          name: "Uday Tiwari",
          address: "Butwal 15, Belbas",
          method: "Phone Pay",
          date: "02/01/2020",
          amount:"Rs.45000"
        },
        {
          name: "Sagar Gc",
          address: "Butwal 11, Murgiya",
          method: "Cash on delivery",
          date: "02/01/2020",
          amount:"Rs.45000"
        },
      
]
const Transaction = () => {
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />

          <div className="transactionwrapper">
            <p className="transactionwrapper__title">Transaction</p>
            <div className="transactionwrapper__background">
              <div className="d-flex justify-content-between align-items-center transactionwrapper__background--transactionheading">
                <div>
                  <select className="orderwrapper__background--selectstatus">
                    <option selected>Method</option>
                    <option>Esewa</option>
                    <option>Phone Pay</option>
                    <option>Mobile Banking</option>
                    <option>Cash on delivery</option>
                  </select>
                </div>

                <div>
                  <div className="d-flex">
                    <select className="orderwrapper__background--selectstatus">
                    <option selected>Day</option>
                    <option>Dates</option>
                  </select>
                      

                    <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                      {/* <AiOutlineCalendar className="calendericon" /> */}
                      <input type="date" placeholder="03/23/2020" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="orderwrapper__background--headingrow transactionlistheading">
                <Row>
                  <Col md={3}>User Name</Col>
                  <Col md={3}>Address</Col>
                  <Col md={2}>Method</Col>
                  <Col md={2}>Date</Col>
                  <Col md={2}>Amount</Col>
                  
                </Row>
              </div>
              <div>
                {transactionList.map((curElm, index) => {
                  return (
                    <Row
                      className="productlistwrapper__productlistwrapper--listitem transactionlistleft"
                      key={index}
                    >
                      <Col md={3}>
                        <p>{curElm.name}</p>
                      </Col>
                      <Col md={3}>
                        <p>{curElm.address}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.method}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.date}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.amount}</p>
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

export default Transaction;
