import React from "react";

const CartContext = React.createContext({
    items: [],
    adresses: [],
    totalAmount:0,
    addItem: (item) => {}, //
    removeItem: (id) => {}, //
    adressInfo: (adresses) => {},
    resetHandler: () => {}
});

export default CartContext;