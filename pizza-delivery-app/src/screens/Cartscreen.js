import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../action/cartAction";
import Checkout from "../components/checkout";

export default function Cartscreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();
  return (
    <div >
      <div className="row justify-content-center">
        <div
          className="col-md-6 rounded-start"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.690)",

          }}
        >
          <h3 style={{ fontSize: "40px", color: "white" }}>My Cart</h3>
          <hr style={{color:"white"}}/>
          {cartItems.map((item) => {
            return (
              <div className="flex-container ">
                <div className="text-left m-1 w-100 ">
                  <h2>
                    {item.name} [{item.varient}]
                  </h2>
                  <h2>
                    Price : {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}
                  </h2>
                  <h2 style={{ display: "inline" }}>Quantity : </h2>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.varient)
                      );
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1, item.varient)
                      );
                    }}
                  ></i>
                  <hr />
                </div>
                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    alt="PIzza img"
                    style={{ height: "100px", width: "100px" }}
                  />
                </div>
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-4"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="col-md-4 text-end rounded-end"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.690)"}}>
          <h3 style={{ fontSize: "35px", color:'white', marginTop: "30px" }}>SubTotal: {subtotal}/- </h3>
            <Checkout subtotal={subtotal}/>
        </div>
      </div>
    </div>
  );
}
