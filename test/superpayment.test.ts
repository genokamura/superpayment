import * as uuid from 'uuid';

describe('SuperPayment', () => {
  describe('payment-info', () => {
    const ut = require('../lib/superpayment-stack.payment-info.ts');

    it('should return uuid', async () => {
      // Arrange
      const uuidRegex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/25",
          "card_holder_name": "John Doe",
          "card_cvv": "123",
          "order_amount": "15000",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 201,
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res.statusCode).toEqual(expected.statusCode);
      expect(uuidRegex.test(JSON.parse(res.body).uuid)).toBeTruthy();
    });

    it('should throw error when card_number is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "123456789012345",
          "card_expiration_date": "10/25",
          "card_holder_name": "John Doe",
          "card_cvv": "123",
          "order_amount": "15000",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid card number\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should throw error when card_expiration_date is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/2",
          "card_holder_name": "John Doe",
          "card_cvv": "123",
          "order_amount": "15000",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid card expiration date\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should throw error when card_holder_name is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/25",
          "card_holder_name": "",
          "card_cvv": "123",
          "order_amount": "15000",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid card holder name\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should throw error when card_cvv is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/25",
          "card_holder_name": "John Doe",
          "card_cvv": "12",
          "order_amount": "15000",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid card cvv\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should throw error when order_amount is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/25",
          "card_holder_name": "John Doe",
          "card_cvv": "123",
          "order_amount": "",
          "order_currency": "JPY"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid order amount\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should throw error when order_currency is invalid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "card_number": "1234567890123456",
          "card_expiration_date": "10/25",
          "card_holder_name": "John Doe",
          "card_cvv": "123",
          "order_amount": "15000",
          "order_currency": "USD"
        })
      };
      const expected = {
        "statusCode": 400,
        "body": "{\"message\":\"Invalid order currency\"}"
      };

      // Act
      const res = await ut.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });
  });

  describe('execute', () => {
    const execute = require('../lib/superpayment-stack.execute.ts');

    it('should return success', async () => {
      // Arrange
      const id = uuid.v4();
      const params = {
        body: JSON.stringify({
          "uuid": id
        })
      };
      const expected = {
        "statusCode": 201,
        "body": "{\"status\":\"success\"}"
      };

      // Act
      const res = await execute.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });

    it('should return failure with invalid uuid', async () => {
      // Arrange
      const params = {
        body: JSON.stringify({
          "uuid": "123456789"
        })
      };

      const expected = {
        "statusCode": 500,
        "body": "{\"message\":\"failure\"}"
      };

      // Act
      const res = await execute.handler(params);

      // Assert
      expect(res).toEqual(expected);
    });
  });
});

