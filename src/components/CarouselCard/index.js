import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { FiAlertTriangle } from "react-icons/fi";

import cardImage from "../../assets/images/card--img.png";
import Modal from "react-bootstrap/Modal";
import InputField from "../../components/InputField";
import Previews from "../../components/DragAndDrop";

const CarouselCard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <>
      <div className="carouselCard">
        <div className="carouselCard__category d-flex justify-content-between">
          <div className="carouselCard__category--name">
            Paicho Lemon Pickle
          </div>
          <div className="carouselCard__category--icons d-flex justify-content-between">
            <FiEdit
              className="carouselCard__category--icons--editicon"
              onClick={handleShow}
            />
            <ImCross
              className="carouselCard__category--icons--crossicon"
              onClick={handleShow1}
            />
          </div>

          {/* edit modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body className="edit__body">
              <div className="title">Edit carousel</div>
              <Form>
                <div className="mt-4">
                  <InputField
                    name="Title"
                    placeholder="Get 10% off with Paicho Lemon Pickle "
                  />
                </div>
                <div className="mt-3">
                  {/* <InputField
                    name="Description"
                    placeholder="Organic Fresh Fruits"
                  /> */}
                  <label htmlFor="">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="5"
                    placeholder="Organic Fresh Fruits"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <InputField
                    name="Link"
                    placeholder="https;//paichopasal.com/productpage/pickle "
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Images</label>
                  <p className="addproductwrapper__background--dragdroptitle">
                    <FiAlertTriangle />
                    <span>Please choose image below 5 mb</span>
                  </p>
                  <Previews />
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
                    onClick={handleClose}
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
                  onClick={handleClose1}
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
            <img src={cardImage} alt="card" className="img-fluid" />
          </div>
        </div>
        <div className="carouselCard__title d-flex">
          <div className="carouselCard__title--name">Title:</div>
          <p>Get 10% off with Paicho Lemon Pickle </p>
        </div>
        <div className="carouselCard__desc d-flex">
          <div className="carouselCard__desc--name">Description:</div>
          <p>Organic fresh fruits </p>
        </div>
        <div className="carouselCard__link d-flex">
          <div className="carouselCard__link--name">Link: </div>
          <a href="https://paichopasal.com/productpage/pickle">
            <p>paichopasal.com/productpage/pickle </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default CarouselCard;
