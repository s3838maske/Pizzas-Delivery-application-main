import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../action/cartAction";

export default function Pizza({ pizza }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  function addtocart() {
    dispatch(addToCart(pizza, quantity, varient));
  }

  return (
    <div className="shadow-lg p-3 mb-5 bg-warning rounded-2 border">
      <div onClick={handleShow}>
        <h1> {pizza.name}</h1>
        <img
          src={pizza.image}
          alt="pizza"
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>varients</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {pizza.variants.map((varient) => (
              <>
                <option value={varient}>{varient}</option>
              </>
            ))}
          </select>
        </div>
        <div className="w-100 m-1" key={pizza._id}>
          <p>quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Price:{pizza.prices[0][varient] * quantity}Rs/-
          </h1>
        </div>
        <div className="m-1 w-100">
          <div className="btn" onClick={addtocart}>
            Add To Cart
          </div>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={pizza.image} alt="pizza" className="img-fluid" />
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
