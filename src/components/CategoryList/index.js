import React from 'react'
import {Col,Row} from "react-bootstrap"
export const categoryData=[
  { sn:1,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    product:4
  },
  { sn:2,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    product:4
  },
  { sn:3,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    subcategory4:"Lemon Pickle",
    product:4
  },
  { sn:4,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    product:4
  },
  { sn:5,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    product:4
  },
  { sn:6,
    category:"Paicho Pickle",
    subcategory1:"Mango Pickle",
    subcategory2:"Lemon Pickle",
    subcategory3:"Bhutuk Pickle",
    product:4
  },
]

const CategoryList = ({id,sn,category,subcategory1,subcategory2,subcategory3,product,subcategory4}) => {
  return (
    <>
      <Row className='categorylist mt-4'>
        <Col md={2}><p className='serial-num'>{sn}</p></Col>
        <Col md={3}>
          <p>{category}</p>
          </Col>
          <Col md={3}>
          <p>{subcategory1},</p>
          <p>{subcategory2},</p>
          <p>{subcategory3},</p>
          <p>{subcategory4}</p>
          </Col>
          <Col md={2}>{product}</Col>
          <Col md={2}><button>Edit</button></Col>
      </Row>
    </>
  )
}

export default CategoryList