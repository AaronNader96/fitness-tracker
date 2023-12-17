import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box p={4} bg="teal.500" color="white" textAlign="center">
      <Text fontSize="sm">
        &copy; 2023 FitMate Aaron Nader. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
