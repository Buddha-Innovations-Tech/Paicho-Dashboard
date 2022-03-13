import React from "react";
import {Row,Col} from 'react-bootstrap';
import ReportCard from "../ReportCard";

const DailyReport = () => {
  return (
    <>
      <div className="reportwrapper__background--reports">
        <Row className="mb-29">
          <Col md={6}>
            <ReportCard date="Today" />
          </Col>
          <Col md={6}>
            <ReportCard date="Yesterday" />
          </Col>
        </Row>
        <Row className="mb-29">
          <Col md={6}>
            <ReportCard date="03/02/2078" />
          </Col>
          <Col md={6}>
            <ReportCard date="04/02/2078" />
          </Col>
        </Row>
        <Row className="mb-29">
          <Col md={6}>
            <ReportCard date="05/02/2078" />
          </Col>
          <Col md={6}>
            <ReportCard date="07/02/2078" />
          </Col>
        </Row>
        <Row className="mb-29">
          <Col md={6}>
            <ReportCard date="08/02/1996" />
          </Col>
          <Col md={6}>
            <ReportCard date="09/02/1996" />
          </Col>
        </Row>
        <Row className="mb-145">
          <Col md={6}>
            <ReportCard date="10/02/1996" />
          </Col>
          <Col md={6}>
            <ReportCard date="11/02/1996" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DailyReport;
