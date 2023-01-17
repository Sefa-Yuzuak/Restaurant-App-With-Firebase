import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./OrderCart.module.css";
import CartContext from "../store/cart-context";
import OrderInput from "../UI/OrderInput";
import SendOrderData from "../FetchData/SendOrderData";

const OrderCart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const items = cartCtx.items;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adress, setAdress] = useState("");
  const [formValid, setFormValid] = useState(false);

  const firstNameIsValid = firstName.trim() !== "";
  const lastNameIsValid = lastName.trim() !== "";
  const adressIsValid = adress.trim() !== "";
  
  const orderCartSubmitHandler = (event) => {
    event.preventDefault();
    if (firstNameIsValid && lastNameIsValid && adressIsValid) {
      cartCtx.adressInfo({
        firstName: firstName,
        lastName: lastName,
        adress: adress,
      });
    } else {
      return;
    }
  };
  
  const firstNameChangeHandler = (value) => {
    setFirstName(value);
    if (firstNameIsValid && lastNameIsValid && adressIsValid) {
      setFormValid(true);
    }else(setFormValid(false))
  };
  const lastNameChangeHandler = (value) => {
    setLastName(value);
    if (firstNameIsValid && lastNameIsValid && adressIsValid) {
      setFormValid(true);
    }else(setFormValid(false))
  };
  const adressChangeHandler = (value) => {
    setAdress(value);
    if (firstNameIsValid && lastNameIsValid && adressIsValid) {
      setFormValid(true);
    }else(setFormValid(false))
  };
  
  const mealOrder = {
    orderMealItems: items,
    orderTotalAmount: totalAmount,
    orderAdress: { firstName: firstName, lastName: lastName, adress: adress },
  };
  
  const reset = () => {
    cartCtx.resetHandler([]);
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={orderCartSubmitHandler}>
        <h3>Order Meal Form</h3>
        <OrderInput
          onChange={firstNameChangeHandler}
          label="First Name"
          input={{
            type: "text",
            name: "first_name",
            placeholder: "Please Enter Your First Name",
          }}
          />
        <OrderInput
          onChange={lastNameChangeHandler}
          label="Last Name"
          input={{
            type: "text",
            name: "last_name",
            placeholder: "Please Enter Your Last Name",
          }}
        />
        <OrderInput
          onChange={adressChangeHandler}
          label="Adress"
          input={{
            type: "text",
            name: "adress",
            placeholder: "Please Enter Your Adress",
          }}
        />
        <h4>Total Amount: {totalAmount}</h4>

        <div className={classes.buttonGroup}>
          <SendOrderData
            onCancel={props.onClose}
            onOrder={props.onSend}
            mealOrder={mealOrder}
            formValid={formValid}
            reset={reset}
          />
        </div>
      </form>
    </Modal>
  );
};

export default OrderCart;
