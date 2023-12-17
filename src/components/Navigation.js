import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Spacer, Text } from "@chakra-ui/react";
import FitMateLogo from "../assets/logo.png";

function Navigation() {
  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex alignItems="center">
        <Box>
          <img
            src={FitMateLogo}
            alt="FitMate Logo"
            style={{ height: "80px", marginRight: "10px" }}
          />
        </Box>
        <Box>
          <Text fontSize="sm" opacity="0.7">
            Empowering Your Fitness Journey, One Goal at a Time with FitMate.
          </Text>
        </Box>
        <Spacer />
        <Flex>
          <NavButton to="/">Home</NavButton>
          <NavButton to="/progress">Progress</NavButton>
          <NavButton to="/Nutrition">Nutrition</NavButton>
        </Flex>
      </Flex>
    </Box>
  );
}

const NavButton = ({ to, children }) => (
  <Link to={to}>
    <Button
      mx={2}
      colorScheme="teal"
      variant="outline"
      _hover={{ bg: "teal.700", color: "white" }}
    >
      {children}
    </Button>
  </Link>
);

export default Navigation;
