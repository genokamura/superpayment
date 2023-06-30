import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ExecuteForm = () => {
  const [uuid, setUuid] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setUuid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bpt70mko6e.execute-api.ap-northeast-1.amazonaws.com/prod/execute',
        { uuid }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      setStatus(res.data.status);
    } catch (err) {
      setStatus(err.response.data.message);
    }
  };

  const Result = () => {
    if (status) {
      return <Alert variant="success">Status: {status}</Alert>;
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>
            UUID:
            <input type="text" name="uuid" onChange={handleChange} />
          </label>
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
      <Result />
    </div>
  );
};

export default ExecuteForm;

