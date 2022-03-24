import React from "react";
import { Pagination } from "react-bootstrap";
const handlePageChange = () => {
  console.log("clicked");
};
const PaginationComp = () => {
  return (
    <>
      <div className="d-flex justify-content-end align-items-center paginations">
        <p>Pagination</p>
        <Pagination onPageChange={handlePageChange}>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  );
};

export default PaginationComp;
