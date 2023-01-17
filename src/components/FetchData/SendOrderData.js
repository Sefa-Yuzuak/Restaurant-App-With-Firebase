import { useEffect } from "react";

import useHttp from "../../hooks/useHttp";
import OrderCartButton from "../CartOrder/OrderCartButton";

const SendOrderData = (props) => {
    const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();

    const enterOrderRequest = async () => {

        sendOrderRequest({
          url: "https://order-app-dd16f-default-rtdb.firebaseio.com/:meal.json",
          method: "POST",
          headers: { "Conten-type": "application/json" },
          body: { 
            orderedMeal:props.mealOrder.orderMealItems,
            orderAmount:props.mealOrder.orderTotalAmount,
            ordererName: props.mealOrder.orderAdress
          }
        });
    }

    useEffect(() => {
        enterOrderRequest()
    }, [])

    return (
        <>
            <OrderCartButton onCancel={props.onCancel}>
                Go To Cart
            </OrderCartButton>
            <OrderCartButton onOrder={props.onOrder} isLoading={isLoading} error={error} enterOrderRequest={enterOrderRequest} formValid= {props.formValid} reset={props.reset}>Order</OrderCartButton>
        </>

    )
};

export default SendOrderData;