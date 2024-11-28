import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateStock = () => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("ticker", formData.ticker);

    try {
      const response = await axios.post(
        "http://localhost:5286/api/stocks",
        formData
      );
      const result = response.data;
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <h5>Create stock</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Stock name</Form.Label>
          <Form.Control
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ticker</Form.Label>
          <Form.Control
            name="ticker"
            id="ticker"
            value={formData.ticker}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {response && (
        <div>
          {" "}
          <h2>Response</h2> <pre>{JSON.stringify(response, null, 2)}</pre>{" "}
        </div>
      )}

      {error && (
        <div>
          {" "}
          <h2>Error</h2> <pre>{JSON.stringify(error, null, 2)}</pre>{" "}
        </div>
      )}
    </>
  );
};

export default CreateStock;
