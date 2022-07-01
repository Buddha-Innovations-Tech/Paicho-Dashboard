import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import {
  listCategories,
  listCategoryDetails,
  updateCategory,
} from "../../actions/categoryAction";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import id from "faker/lib/locales/id_ID";
const CategoryList = ({ index, _id, name, subcategories, product }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [edittest, setEditTest] = useState("");
  // const [editcategoryName, setEditCategoryName] = useState(name);
  // const [subCategories, setSubCategories] = useState([]);
  const [test, setTest] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(0);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const { category } = useSelector((state) => state.categoryDetails);
  const { success: updateSuccess, loading } = useSelector(
    (state) => state.categoryUpdate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: categoryName,
      subcategories: subCategories.map((i) => {
        return { name: i };
      }),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (checked) {
      await axios.put(`/api/categories/archive/${category._id}`, {}, config);
    } else {
      dispatch(updateCategory(data, _id));
      setTest("");
    }

    handleClose();
  };

  const handleEdit = (_id) => {
    dispatch(listCategoryDetails(_id));
  };

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSubCategories(
        category.subcategories && category.subcategories.map((i) => i.name)
      );
    }
  }, [category]);
  // useEffect(() => {
  //   if (updateSuccess) {
  //     dispatch(listCategories());
  //   }
  // }, []);
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
        <Col md={2}>{product.length}</Col>
        <Col md={2}>
          <button
            onClick={() => {
              // setEditId(_id);
              handleEdit(_id);
              handleShow();
            }}
            // onClick={() => {
            //   navigate(`/editcategory/${_id}`);
            // }}
          >
            Edit
          </button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="edit__body">
          <div className="title">Edit Category</div>
          <Form onSubmit={handleSubmit}>
            <div className="categorywrapper__addcategorywrapper--categoryname">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                placeholder="Category Name"
                name="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="categorywrapper__addcategorywrapper--categoryname">
              <label htmlFor="name">Sub category</label> <br />
              <input
                type="text"
                placeholder="Sub Category"
                value={test}
                onChange={(e) => setTest(e.target.value)}
              />
              <BiPlus
                className="plusIcon"
                onClick={(e) => {
                  !subCategories.find((i) => i === test) &&
                    test.trim() !== "" &&
                    setSubCategories([test, ...subCategories]);
                  setTest("");
                }}
              />
            </div>
            <ul className="categorywrapper__addcategorywrapper--unorderlist">
              {subCategories &&
                subCategories.map((curElm, index) => {
                  return (
                    <li
                      className="d-flex align-items-center justify-content-between"
                      key={index}
                    >
                      <p>{curElm}</p>
                      <ImCross
                        className="crossicon"
                        onClick={(e) =>
                          setSubCategories(
                            subCategories.filter((i) => i !== curElm)
                          )
                        }
                      />
                    </li>
                  );
                })}
            </ul>
            <div class="form-check mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                value={checked}
                id="flexCheckDefault"
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Archive this category
              </label>
            </div>
            {!loading ? (
              <>
                <div className="mt-3 d-flex justify-content-end">
                  <Link
                    to=""
                    className="carouselwrapper__background__btn--discard editcategorydiscard"
                    onClick={handleClose}
                  >
                    Discard
                  </Link>
                  <button
                    className="carouselwrapper__background__btn--add"
                    onClick={() => handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryList;
