import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [cardInfo, setCardInfo] = useState({
    card_number: '',
    card_expiration_date: '',
    card_holder_name: '',
    card_cvv: '',
    order_amount: '',
    order_currency: '',
  });
  const [uuid, setUuid] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cardInfo);
    const apiUrl = 'https://bpt70mko6e.execute-api.ap-northeast-1.amazonaws.com/prod/payment-info';
    try {
      const res = await axios.post(apiUrl, cardInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUuid(res.data.uuid);
    } catch (err) {
      setErrMessage(err.response.data.message);
    }
  };
  const Result = () => {
    if (uuid) {
      return <p>UUID: {uuid}</p>;
    }
    if (errMessage) {
      return <p>{errMessage}</p>;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Card Number:
            <input type="text" name="card_number" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Expiration Date:
            <input type="text" name="card_expiration_date" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Card Holder Name:
            <input type="text" name="card_holder_name" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            CVV:
            <input type="text" name="card_cvv" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Order Amount:
            <input type="text" name="order_amount" onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Order Currency:
            <input type="text" name="order_currency" onChange={handleChange} />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Result />
    </div>
  );
};

export default PaymentForm;
