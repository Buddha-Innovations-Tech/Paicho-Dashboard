import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
const Dashboard = () => {
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
