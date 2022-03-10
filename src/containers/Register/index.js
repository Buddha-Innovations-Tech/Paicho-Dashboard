import React from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
const Register = () => {
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
            <div className="orderwrapper__background"></div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
