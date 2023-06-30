import * as uuid from 'uuid';

exports.handler = async (event: any) => {
  const props = JSON.parse(event.body);
  const id = genuuid();

  try {
    if (!isvalidcardnumber(props.card_number)) {
      throw new Error('Invalid card number');
    }

    if (!isvalidcardexpirationdate(props.card_expiration_date)) {
      throw new Error('Invalid card expiration date');
    }

    if (isExpiredExpirationDate(props.card_expiration_date)) {
      throw new Error('Card is expired');
    }

    if (!isvalidcardholdername(props.card_holder_name)) {
      throw new Error('Invalid card holder name');
    }

    if (!isvalidcardcvv(props.card_cvv)) {
      throw new Error('Invalid card cvv');
    }

    if (!isvalidorderamount(props.order_amount)) {
      throw new Error('Invalid order amount');
    }

    if (!isvalidordercurrency(props.order_currency)) {
      throw new Error('Invalid order currency');
    }
  } catch (e: any) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      uuid : id,
    }),
  };
}

const isvalidcardnumber = (card_number: string) => {
  const regex = new RegExp('^[0-9]{16}$');
  return regex.test(card_number);
}

const isvalidcardexpirationdate = (card_expiration_date: string) => {
  const regex = new RegExp('^[0-9]{2}/[0-9]{2}$');
  return regex.test(card_expiration_date);
}

const isExpiredExpirationDate = (card_expiration_date: string) => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = now.getMonth() + 1;

  const [card_expiration_month, card_expiration_year] = card_expiration_date.split('/');

  return parseInt(card_expiration_year) < parseInt(year) || (parseInt(card_expiration_year) === parseInt(year) && parseInt(card_expiration_month) < month);
}

const isvalidcardholdername = (card_holder_name: string) => {
  return card_holder_name.length > 0;
}

const isvalidcardcvv = (card_cvv: string) => {
  const regex = new RegExp('^[0-9]{3}$');
  return regex.test(card_cvv);
}

const isvalidorderamount = (order_amount: string) => {
  const regex = new RegExp('^[0-9]+$');
  return regex.test(order_amount);
}

const isvalidordercurrency = (order_currency: string) => {
  return order_currency === "JPY";
}

const genuuid = () => {
  return uuid.v4();
}
