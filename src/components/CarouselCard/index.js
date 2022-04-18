import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FiAlertTriangle } from "react-icons/fi";
import cardImage from "../../assets/images/card--img.png";
import Modal from "react-bootstrap/Modal";
import InputField from "../../components/InputField";
import Previews from "../../components/DragAndDrop";
import { InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  deleteCarousel,
  listCarousel,
  listCarouselDetails,
  updateCarousel,
} from "../../actions/carouselAction";
import Loader from "../Loader";
import { CAROUSEL_RESET } from "../../constants/carouselConstants";

const CarouselCard = ({
  carousel: { title, link, description, image, _id },
}) => {
  const [deleteid, setDeleteId] = useState(0);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [edittitle, setEditTitle] = useState(title);
  const [editlink, setEditLink] = useState(link);
  const [editdescription, setEditDescription] = useState(description);
  const [editimage, setEditImage] = useState(image);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const deleteCaro = (id) => {
    dispatch(deleteCarousel(id));
    handleClose1();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCarousel(
        {
          title: edittitle,
          link: editlink,
          description: editdescription,
          image: editimage,
        },
        _id
      )
    );
    handleClose();
  };

  let { id } = useParams();
  const { carousel } = useSelector((state) => state.carouselDetails);
  console.log(image);

  // useEffect(() => {
  //   if (carouselUpdateSuccess) {
  //     dispatch(listCarousel());
  //   }
  // }, [carouselUpdateSuccess]);
  return (
    <>
      <div className="carouselCard">
        <div className="carouselCard__category d-flex justify-content-between">
          <div className="carouselCard__category--name">{title}</div>
          <div className="carouselCard__category--icons d-flex justify-content-between">
            <FiEdit
              className="carouselCard__category--icons--editicon"
              onClick={() => {
                handleShow();
              }}
            />
            <ImCross
              className="carouselCard__category--icons--crossicon"
              onClick={() => {
                setDeleteId(_id);
                handleShow1();
              }}
            />
          </div>

          {/* edit modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body className="edit__body">
              <div className="title">Edit carousel</div>
              <Form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label htmlFor="">Title</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="title"
                      placeholder="Get 10% off with Paicho Lemon Pickle "
                      value={edittitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="5"
                    value={editdescription}
                    placeholder="Organic Fresh Fruits"
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Link</label> <br />
                  <InputGroup>
                    <FormControl
                      name="Link"
                      placeholder="https;//paichopasal.com/productpage/pickle "
                      value={editlink}
                      onChange={(e) => setEditLink(e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Images</label>
                  <p className="addproductwrapper__background--dragdroptitle">
                    <FiAlertTriangle />
                    <span>Please choose image below 5 mb</span>
                  </p>
                  <Previews image={image} setImage={setEditImage} />
                </div>

                <div className="mt-3 d-flex justify-content-end">
                  <button
                    className="carouselwrapper__background__btn--discard"
                    onClick={handleClose}
                  >
                    Discard
                  </button>
                  <button
                    className="carouselwrapper__background__btn--add"
                    // onClick={(e) => {
                    //   updateCaro(e);
                    // }}
                  >
                    Update Product
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          {/* delete modal */}
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Body className="delete__body">
              <div className="d-flex justify-content-between">
                <h2 className="modal__delete">Delete</h2>
                <ImCross
                  className="carouselCard__category--icons--crossicon"
                  onClick={handleClose1}
                />
              </div>
              {/* <h2 className="modal__delete">Delete</h2> */}
              <p className="modal__para">
                Are you sure you want to delete this item ?{" "}
              </p>
              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="carouselwrapper__background__btn--cancel"
                  onClick={handleClose1}
                >
                  Cancel
                </button>
                <button
                  className="carouselwrapper__background__btn--delete"
                  onClick={() => {
                    deleteCaro(deleteid);
                  }}
                >
                  Delete
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="carouselCard__image d-flex align-items-center">
          <div className="carouselCard__image--name">Images: </div>
          <div className="carouselCard__image--img">
            <img
              // src={`http://localhost:5000${image}`}
              src={`${image}`}
              // src={image}
              alt="card"
              name="image"
              className="img-fluid"
            />
          </div>
        </div>
        {/* <div className="carouselCard__title d-flex">
          <div className="carouselCard__title--name">Title:</div>
          <p>{title} </p>
        </div> */}
        <div className="carouselCard__desc d-flex">
          <div className="carouselCard__desc--name">Description:</div>
          <p>{description} </p>
        </div>
        <div className="carouselCard__link d-flex mt-2">
          <div className="carouselCard__link--name">Link: </div>
          <a href={link} title="paichopasal.com/productpage/pickle">
            paichopasal.com/productpage/pickle
          </a>
        </div>
      </div>
    </>
  );
};

export default CarouselCard;
