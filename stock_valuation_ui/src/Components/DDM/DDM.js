import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DDM = () => {
  const [DDMData, setDDMData] = useState({
    id: "",
    name: "",
    stockId: "",
    dividend: 0,
    rateReturn: 0,
    growth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasEdit, setHasEdit] = useState(false);
  const { modelId } = useParams();
  useEffect(() => {
    fetchModelData();
  }, [modelId]);

  async function fetchModelData() {
    try {
      const response = await fetch("http://localhost:5286/api/ddm/" + modelId);
      if (!response.ok) {
        setError(response.status);
      }
      const result = await response.json();
      setDDMData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveModelData() {
    try {
      const response = await axios.put(
        "http://localhost:5286/api/ddm/" + modelId,
        DDMData
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

  const handleChange = (e) => {
    setDDMData(() => ({
      ...DDMData,
      [e.target.id]: e.target.value,
    }));
    setHasEdit(true);
  };

  return (
    <Container>
      <InputGroup>
        <Form.Control
          id="name"
          value={DDMData.name}
          aria-label="Model name"
          onChange={(e) => {
            handleChange(e);
          }}
          style={{ marginBottom: 10, border: 0, fontSize: 30 }}
        ></Form.Control>
      </InputGroup>
      <Table>
        <thead>
          <tr>
            <th style={{ border: 0 }}>Current dividend ($)</th>
            <th style={{ border: 0 }}>
              Expected perpetual growth rate of dividend (decimal format)
            </th>
            <th style={{ border: 0 }}>Rate of return (decimal format)</th>
            <th style={{ border: 0 }}>Value ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: 0 }}>
              <InputGroup>
                <Form.Control
                  id="dividend"
                  value={DDMData.dividend}
                  type="number"
                  aria-label="dividend (year 0)"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </InputGroup>
            </td>
            <td style={{ border: 0 }}>
              <InputGroup>
                <Form.Control
                  id="growth"
                  value={DDMData.growth}
                  aria-label="growth"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </InputGroup>
            </td>
            <td style={{ border: 0 }}>
              <InputGroup>
                <Form.Control
                  id="rateReturn"
                  value={DDMData.rateReturn}
                  aria-label="rateReturn"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </InputGroup>
            </td>
            <td style={{ border: 0 }}>
              $
              {(DDMData.dividend * (1 + DDMData.growth)) /
                (DDMData.rateReturn - DDMData.growth).toLocaleString()}
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

export default DDM;
