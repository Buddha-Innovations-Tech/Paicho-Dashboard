import { useNavigate, Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <div>
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
