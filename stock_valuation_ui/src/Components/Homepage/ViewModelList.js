import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewModelList = ({ stockId, stockTicker }) => {
  const [DDMData, setDDMData] = useState([]);
  const [DCFData, setDCFData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchModelData();
  }, []);

  async function fetchModelData() {
    try {
      const response = await fetch(
        "http://localhost:5286/api/dcf?" +
          new URLSearchParams({ StockId: stockId })
      );
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
    try {
      const response = await fetch(
        "http://localhost:5286/api/ddm?" +
          new URLSearchParams({ StockId: stockId })
      );
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

  async function deleteModel(e, modelType) {
    let t = "";
    if (modelType == "dcf") {
      try {
        const response = await axios.delete(
          "http://localhost:5286/api/dcf/" + e.target.id
        );
        if (!response.ok) {
          setError(response.status);
        }
        fetchModelData();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.delete(
          "http://localhost:5286/api/ddm/" + e.target.id
        );
        if (!response.ok) {
          setError(response.status);
        }
        fetchModelData();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }
  async function newModel(e, stockId, modelType, stockName) {
    if (modelType == "dcf") {
      try {
        const response = await axios.post("http://localhost:5286/api/dcf", {
          name: stockName + " new dcf model",
          cashflows: [],
          stockId,
          rateReturn: 0,
          growth: 0,
          years: 0,
        });
        setPopup(true);
        setError("Added new DCF model");
        fetchModelData();
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5286/api/ddm", {
          name: stockName + " new ddm model",
          stockId,
          dividend: 0,
          rateReturn: 0,
          growth: 0,
        });
        setPopup(true);
        setError("Added new DDM model");
        fetchModelData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  return (
    <>
      <>
        {DCFData.length !== 0 ? (
          <Badge bg="success" style={{ marginBottom: 10, fontSize: 15 }}>
            DCF data:
          </Badge>
        ) : (
          <Badge bg="danger" style={{ marginBottom: 10, fontSize: 15 }}>
            No DCF data
          </Badge>
        )}
        <ListGroup>
          {DCFData.map((dcf) => (
            <ListGroupItem key={dcf.modelId}>
              <ListGroup horizontal>
                <h6 style={{ paddingTop: 10 }}>{dcf.modelName}</h6>
                <Link to={"/dcf/" + dcf.modelId}>
                  <Button
                    id={dcf.modelId}
                    variant="warning"
                    style={{ marginLeft: 10 }}
                  >
                    Edit {dcf.modelName}
                  </Button>
                </Link>
                <Button
                  id={dcf.modelId}
                  variant="danger"
                  style={{ marginLeft: 10 }}
                  onClick={(e) => {
                    deleteModel(e, "dcf");
                    setPopup(true);
                  }}
                >
                  Delete {dcf.modelName}
                </Button>
              </ListGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
        <ListGroup style={{ paddingTop: 10 }} horizontal>
          <Button
            onClick={(e) => {
              newModel(e, stockId, "dcf", stockTicker);
            }}
          >
            Add DCF
          </Button>
        </ListGroup>
        <br />
        {DDMData.length !== 0 ? (
          <Badge bg="success" style={{ marginBottom: 10, fontSize: 15 }}>
            DDM data:
          </Badge>
        ) : (
          <Badge bg="danger" style={{ marginBottom: 10, fontSize: 15 }}>
            No DDM data
          </Badge>
        )}
        <ListGroup>
          {DDMData.map((ddm) => (
            <ListGroupItem key={ddm.modelId}>
              <ListGroup horizontal>
                <h6 style={{ paddingTop: 10 }}>{ddm.modelName}</h6>
                <Link to={"/ddm/" + ddm.modelId}>
                  <Button
                    id={ddm.modelId}
                    variant="warning"
                    style={{ marginLeft: 10 }}
                  >
                    Edit {ddm.modelName}
                  </Button>
                </Link>
                <Button
                  id={ddm.modelId}
                  variant="danger"
                  style={{ marginLeft: 10 }}
                  onClick={(e) => {
                    deleteModel(e, "ddm");
                    setPopup(true);
                  }}
                >
                  Delete {ddm.modelName}
                </Button>
              </ListGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
        <ListGroup style={{ paddingTop: 10 }} horizontal>
          <Button
            id={stockId}
            onClick={(e) => {
              newModel(e, stockId, "ddm", stockTicker);
            }}
          >
            Add DDM
          </Button>
        </ListGroup>
      </>
      <br />
    </>
  );
};

export default ViewModelList;
