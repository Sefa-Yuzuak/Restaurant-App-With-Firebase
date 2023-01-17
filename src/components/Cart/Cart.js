import { useContext } from "react"; //sipariş edilecek ürünleri sepette göstermek için

import Modal from "../UI/Modal";
import CartItem from "./CartItem"; // Sepetin içindeki ürünlere özellik eklemek için
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context"; //sipariş edilecek ürünleri sepette göstermek için

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id); //useContext te store objesi içerisinde tanımlı metoda parametre gönderdik.
  };

  const cartItemHandler = (item) => {//useContext te store objesi içerisinde tanımlı metoda parametre gönderdik.
    cartCtx.addItem({ ...item, amount: 1 });// CartProvide.js
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} //bu kısmı anlamadım
          onAdd={cartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderedMead = () => {
    props.onShowOrderCart();
  };

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderedMead}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
