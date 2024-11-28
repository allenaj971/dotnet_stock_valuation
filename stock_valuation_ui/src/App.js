import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // required for react-bootstrap styles
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import CreateStock from "./Components/Stock/CreateStock";
import CreateDCF from "./Components/DCF/CreateDCF";
import CreateDDM from "./Components/DDM/CreateDDM";
import { Container } from "react-bootstrap";
import DDM from "./Components/DDM/DDM";
import DCF from "./Components/DCF/DCF";

function App() {
  return (
    <div className="App">
      <Header />
      <Container style={{ paddingTop: 15 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/newstock" element={<CreateStock />} />
          <Route path="/ddm/:modelId" element={<DDM />} />
          <Route path="/dcf/:modelId" element={<DCF />} />
          <Route path="/newdcf" element={<CreateDCF />} />
          <Route path="/newddm" element={<CreateDDM />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
