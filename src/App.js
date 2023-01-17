import React, { useState } from 'react';

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/CartProvide';
import OrderCart from './components/CartOrder/OrderCart';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orederCartIsShown, setOrderCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showOrderCartHandler = () => {
    setOrderCartIsShown(true);
  };
  const hideOrderCartHandler = () => {
    setOrderCartIsShown(false);
  };
  const sendOrderData = () => {
    setOrderCartIsShown(false);
    setCartIsShown(false)
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onShowOrderCart={showOrderCartHandler}/>}
      {orederCartIsShown && <OrderCart onSend={sendOrderData} onClose={hideOrderCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
