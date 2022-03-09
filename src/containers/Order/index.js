import React from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";

const Order = () => {
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <div className="orderwrapper">
            <p className="orderwrapper__title">Order</p>
            <div className="orderwrapper__background">
              <div className="d-flex justify-content-between align-items-center">
                <div className="categorywrapper__addcategorywrapper--searchinput">
                  <BiSearch className="searchicon" />
                  <input type="text" placeholder="Search category" />
                </div>

                <div className="d-flex">
                  <div className="d-flex orderwrapper__background--dateicon">
                    <p>Date</p>
                    <IoMdArrowDropdown className="icon" />
                  </div>

                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                    <AiOutlineCalendar className="calendericon" />
                    <input type="date" placeholder="03/23/2020"/>
                  </div>

                  <div>
                    <select className="orderwrapper__background--selectstatus">
                      <option selected>Status</option>
                      <option> To be delivered </option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Order;
