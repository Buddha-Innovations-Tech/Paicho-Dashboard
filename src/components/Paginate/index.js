import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "", list, history }) => {
  let alwaysShown = true;
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate;

  const isPaginationShown = alwaysShown ? true : pages > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pages;

  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);

    if (list === undefined) {
      navigate(`/${number}`);
      return;
    }
    navigate(`/${list}/${number}`);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
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
    pages > 1 && (
      <Pagination>
        <Pagination.Prev
          onClick={onPreviousPageClick}
          disabled={isCurrentPageFirst}
        />
        {pageNumbers}
        {/* <pagination.next/
          onClick={onNextPageClick}
          disabled={isCurrentPageLast}
        /> */}
      </Pagination>
      // <Pagination>
      //   <Pagination.Prev />

      //   {[...Array(pages).keys()].map((x) => (
      //     <>
      //       <LinkContainer key={x + 1} to={/${list}/${x + 1}}>
      //         <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
      //       </LinkContainer>
      //     </>
      //   ))}
      //   <https://pagination.next/ />
      // </Pagination>
    )
  );
};

export default Paginate;
