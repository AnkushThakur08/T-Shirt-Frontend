import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { cartEmpty } from './helper/CartHelper';

const StripeCheckout = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products?.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log('STATUS', status);
        // cartEmpty();
        cartEmpty(() => {
          console.log('Did we got a Crash');
        });

        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        token={makePayment}
        stripeKey={process.env.REACT_APP_STRIPEKEY}
        amount={getFinalAmount() * 100}
        name="Buy your Tees"
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe &#8377; {getFinalAmount()}</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Required SignIn</button>
      </Link>
    );
  };
  return (
    <div>
      {/* <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3> */}
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
