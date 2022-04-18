import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComp = ({ pages, page, list, history }) => {
  let alwaysShown = true;
  const [currentPage, setCurrentPage] = useState(page);

  const isPaginationShown = alwaysShown ? true : pages > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pages;

  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);

    if (list === undefined) {
      history(`/${number}`);
      return;
    }
    history(`/${list}/${number}`);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(parseInt(currentPage) - 1);
  };

  const onNextPageClick = () => {
    console.log(typeof currentPage);
    changePage(parseInt(currentPage) + 1);
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pages)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pages;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 4;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }
    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }
    return null;
  });

  return (
    <>
      <div className="d-flex justify-content-end align-items-center paginations">
        <p>Pagination</p>
        {/* {pages > 1 && ( */}
        <Pagination>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          {/* <Pagination.Ellipsis /> */}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
        {/* )} */}
      </div>
    </>
  );
};

export default PaginationComp;
