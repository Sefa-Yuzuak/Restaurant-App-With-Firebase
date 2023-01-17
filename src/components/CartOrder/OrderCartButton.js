import React from "react";
import classes from "./OrderCartButton.module.css";

const OrderCartButton = (props) => {

  const buttonHandling = props.children === 'Order' && !props.formValid

  const clickHandling = async () => {
    if (props.children === "Order" && props.formValid) {
      
      await props.enterOrderRequest();
      if(!props.isLoading){
        return (
          await props.reset(),
          props.onOrder()
        );
      };

    } else if (props.children === "Go To Cart") {
      return props.onCancel();
    }
  };

  return (
    <React.Fragment>
      <button className={classes.button} onClick={clickHandling} disabled={buttonHandling}>
        {props.isLoading ? 'Sending' : props.children}
      </button>
    </React.Fragment>
  );
};

export default OrderCartButton;
