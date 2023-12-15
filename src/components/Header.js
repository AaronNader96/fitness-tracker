import React from "react";
import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";

function Header({ isLoggedIn, onLoginToggle }) {
  return (
    <Flex p={4} bg="teal.500" color="white" alignItems="center">
      <Heading size="md">Fitness Tracker</Heading>
      <Spacer />
      <Button colorScheme="teal" variant="ghost" onClick={onLoginToggle}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </Button>
    </Flex>
  );
}

export default Header;
