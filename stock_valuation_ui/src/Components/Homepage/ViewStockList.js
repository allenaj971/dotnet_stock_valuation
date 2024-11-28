import React, { useEffect, useState } from "react";
import { Container, Accordion, Badge, Button } from "react-bootstrap";
import ViewModelList from "./ViewModelList";
import axios from "axios";

const ViewStockList = () => {
  const [stockData, setstockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  async function fetchStockData() {
    try {
      const response = await fetch("http://localhost:5286/api/stocks");
      if (!response.ok) {
        setError(response.status);
      }
      const result = await response.json();
      setstockData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteStock(e) {
    try {
      const response = await axios.delete(
        "http://localhost:5286/api/stocks/" + e.target.id
      );
      if (!response.ok) {
        setError(response.status);
      }
      fetchStockData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      <Accordion>
        {stockData.map((stock) => (
          <>
            <Accordion.Item key={stock.id} eventKey={stock.id}>
              <Accordion.Header>
                <h5>
                  {stock.name}: {stock.ticker}
                </h5>
                <br />
              </Accordion.Header>
              <Accordion.Body>
                <ViewModelList
                  key={stock.id}
                  stockId={stock.id}
                  stockName={stock.name}
                  stockTicker={stock.ticker}
                />
                <Button
                  id={stock.id}
                  variant="danger"
                  onClick={(e) => deleteStock(e)}
                >
                  Delete {stock.ticker}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ))}
      </Accordion>
    </Container>
  );
};

export default ViewStockList;
