import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// export const categoryData = [
//   {
//     sn: 1,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     product: 4,
//   },
//   {
//     sn: 2,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     product: 4,
//   },
//   {
//     sn: 3,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     subcategory4: "Lemon Pickle",
//     product: 4,
//   },
//   {
//     sn: 4,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     product: 4,
//   },
//   {
//     sn: 5,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     product: 4,
//   },
//   {
//     sn: 6,
//     category: "Paicho Pickle",
//     subcategory1: "Mango Pickle",
//     subcategory2: "Lemon Pickle",
//     subcategory3: "Bhutuk Pickle",
//     product: 4,
//   },
// ];

const CategoryList = ({ index, _id, name, subcategories, product }) => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="categorylist mt-4">
        <Col md={2}>
          <p className="serial-num">{index + 1}</p>
        </Col>
        <Col md={3}>
          <p>{name}</p>
        </Col>
        <Col md={3}>
          {/* {console.log(subcategories)} */}
          {subcategories &&
            subcategories.map((data, index) => {
              return <p>{data.name}</p>;
            })}
        </Col>
        <Col md={2}>{product}</Col>
        <Col md={2}>
          <button
            onClick={() => {
              navigate(`/editcategory/${_id}`);
            }}
          >
            Edit
          </button>
        </Col>
      </Row>
    </>
  );
};

export default CategoryList;
