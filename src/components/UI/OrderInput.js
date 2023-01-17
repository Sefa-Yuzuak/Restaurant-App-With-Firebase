import React from 'react';

import classes from './OrderInput.module.css'

const OrderInput = (props) => {

    const onChangeHandler = (event) => {
        const value = event.target.value
        props.onChange(value)
    };

    return <div className={classes.input}>
      <label>{props.label}</label>
      <input {...props.input} onChange={onChangeHandler}/>
    </div>;
};

export default OrderInput;