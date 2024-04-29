import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { NotFound } from "./components/notfound/NotFound";
import MapPage from "./components/map/MapPage";
import { Pollutants } from "./components/pollutants/Pollutants";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/pollutants" element={<Pollutants />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
