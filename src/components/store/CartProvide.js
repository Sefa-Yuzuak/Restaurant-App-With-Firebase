import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  adresses:[],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = //toplam fiyatı gösteren constant
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems; // global scope

    if (existingCartItem) { //içi boşmu dolumu?
      //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem; //düzenlediği itemi mevcuttaki itemin üzerine yazdırdı

    } else {
      updatedItems = state.items.concat(action.item); //bunu sepet içindeki ürünlerin özellikleri hazırlarken güncelliyoruz aynı ürünleri bir arada tutmak için
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      adresses: action.adresses,

    };
  }
  if (action.type === "REMOVE") {  //bunu sepet içindeki ürünlerin amountunu artı eksi butonlarıyla ayarlamak için yapıyoruz
    
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1) { //ürünün amountu 1 ise direk ürünü updateItems tan sileriz amountunu bir azaltmak yerine
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
          //ürünün amountu 1 den büyük ise updateItem da bir azaltırız.
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
          }; //önce payloadda işlem yapılan itemi bulun onu clonladık bu satırda sadece bulduğu objenin bir özelliğini değiştirdik
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }

        return{
            items: updatedItems, 
            totalAmount: updatedTotalAmount,
            adresses: state.action,

        }
  }
  if(action.type === "ADRESSES"){
    let updatedAdresses= [action.adresses]
    return{
      items: state.items, 
      totalAmount: state.totalAmount,
      adresses: updatedAdresses,
    };
  };
  if(action.type === "RESET"){
    return defaultCartState;
  };

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const addAdressHandler = (adresses) => {
    dispatchCartAction({ type: "ADRESSES", adresses: adresses })
  };
  const resetHandler = () => {
    dispatchCartAction({ type: "RESET" })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    adresses: cartState.adresses,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    adressInfo: addAdressHandler,
    resetHandler: resetHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
