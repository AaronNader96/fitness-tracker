import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react";
import Workouts from "./components/Workouts";
import Progress from "./components/Progress";
import Nutrition from "./components/Nutrition";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation.js";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <div>
          <header>
            <Navigation />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Workouts />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/Nutrition" element={<Nutrition />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
