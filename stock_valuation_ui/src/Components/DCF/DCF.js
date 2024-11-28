import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DCF = () => {
  const [DCFData, setDCFData] = useState({
    id: "",
    name: "",
    stockId: "",
    cashflows: [],
    growth: 0,
    rateReturn: 0,
    years: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasEdit, setHasEdit] = useState(false);
  const { modelId } = useParams();

  useEffect(() => {
    fetchModelData();
  }, []);
  async function fetchModelData() {
    try {
      const response = await fetch("http://localhost:5286/api/dcf/" + modelId);
      if (!response.ok) {
        setError(response.status);
      }
      const result = await response.json();
      setDCFData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveModelData() {
    try {
      const response = await axios.put(
        "http://localhost:5286/api/dcf/" + modelId,
        DCFData
      );
      if (!response.ok) {
        setError(response.status);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const calValue = () => {
    let v = 0;
    for (let i = 0; i < DCFData.cashflows.length; i++) {
      v +=
        Number(DCFData.cashflows[i]) /
        Math.pow(1 + Number(DCFData.rateReturn), i + 1);
    }
    return v;
  };
  const addYear = () => {
    let t = [...DCFData.cashflows, 0];
    setDCFData(() => ({
      ...DCFData,
      cashflows: t,
      years: t.length,
    }));
    calValue();
    setHasEdit(true);
  };

  const removeYear = () => {
    DCFData.cashflows.pop();
    let t = DCFData.cashflows;
    setDCFData(() => ({
      ...DCFData,
      cashflows: t,
      years: t.length,
    }));
    calValue();
    setHasEdit(true);
  };

  const updateCashflow = (e) => {
    let t = DCFData.cashflows;
    // random javascript indexing bug
    if (!e.target.id) {
      t[0] = Number(e.target.value);
    } else {
      t[e.target.id] = Number(e.target.value);
    }
    setDCFData(() => ({
      ...DCFData,
      cashflows: t,
    }));
    calValue();
    setHasEdit(true);
  };

  const handleChange = (e) => {
    setDCFData(() => ({
      ...DCFData,
      [e.target.id]: e.target.value,
    }));
    setHasEdit(true);
  };

  if (loading) <p>Loading...</p>;
  if (error) <p>Error...</p>;

  return (
    <Container>
      <InputGroup>
        <Form.Control
          id="name"
          value={DCFData.name}
          aria-label="Model name"
          onChange={(e) => {
            handleChange(e);
          }}
          style={{ marginBottom: 10, border: 0, fontSize: 30 }}
        ></Form.Control>
      </InputGroup>
      <br />
      <h5>Present value</h5>
      <h5>${calValue().toLocaleString()}</h5>
      <Table>
        <thead>
          <tr>
            {Array.from({ length: DCFData.cashflows.length }).map(
              (_, index) => (
                <th style={{ border: 0 }} key={index}>
                  Year {index + 1} cashflow ($)
                </th>
              )
            )}
            <th style={{ border: 0 }}>
              <Button
                variant="success"
                onClick={() => {
                  addYear();
                }}
              >
                +
              </Button>
            </th>
            <th style={{ border: 0 }}>
              <Button
                onClick={() => {
                  removeYear();
                }}
                variant="danger"
                style={{ marginLeft: 10 }}
              >
                -
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {DCFData.cashflows.map((_, index) => (
              <td style={{ border: 0 }} key={index}>
                <InputGroup>
                  <Form.Control
                    id={index == null ? 0 : index}
                    value={DCFData.cashflows[index]}
                    onChange={(e) => {
                      updateCashflow(e);
                    }}
                    type="number"
                  />
                </InputGroup>
              </td>
            ))}
          </tr>
          <tr>
            <td style={{ border: 0, paddingTop: 20 }}>
              <h6>Rate of Return (decimal value)</h6>
            </td>
          </tr>
          <tr>
            <td style={{ border: 0 }}>
              <InputGroup>
                <Form.Control
                  id="rateReturn"
                  value={DCFData.rateReturn}
                  type="number"
                  onChange={(e) => {
                    setDCFData(() => ({
                      ...DCFData,
                      rateReturn: e.target.value,
                    }));
                    setHasEdit(true);
                  }}
                />
              </InputGroup>
            </td>
          </tr>
        </tbody>
      </Table>
      {hasEdit && (
        <Button
          style={{ marginLeft: 9 }}
          variant="warning"
          onClick={saveModelData}
        >
          Save changes
        </Button>
      )}
    </Container>
  );
};

export default DCF;
