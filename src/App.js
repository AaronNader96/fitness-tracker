import React, { useState } from "react";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Workouts from "./pages/Workouts";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setLoggedIn(!isLoggedIn);
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.100">
        <Header isLoggedIn={isLoggedIn} onLoginToggle={handleLoginToggle} />
        <Container maxW="container.xl" py={10}>
          <Workouts />
        </Container>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
