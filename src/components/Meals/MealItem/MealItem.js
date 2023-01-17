import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    //most important part of this dummy project
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount, //sadece amount parametre alarak mealItemForm dan geliyor burası cok onemli geri kalan prenttan props olarak geliyor.
      price: props.price,
    }); //addItem from CartProvider.js
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
