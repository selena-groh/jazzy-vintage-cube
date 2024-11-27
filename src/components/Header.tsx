import logo from "@/assets/logo.png";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

const Header = () => {
  return (
    <Flex
      is="header"
      mb="32px"
      direction={{ base: "column", lg: "row" }}
      gap="16px"
      alignItems="center"
      justifyContent="space-between"
      textAlign={{ base: "center", lg: "left" }}
    >
      <div>
        <Box display="flex" gap="2px">
          <Box
            width={{ base: "43px", md: "48px" }}
            height={{ base: "43px", md: "48px" }}
          >
            <Image src={logo} alt="" />
          </Box>
          <Heading as="h1" size="2xl" mb="8px">
            Jazzy Vintage Cube
          </Heading>
        </Box>
        <Text color="gray.600">
          A custom, vintage-power-level Magic the Gathering cube.
        </Text>
      </div>
      <Flex
        direction={["column", "row"]}
        gap={{ base: "8px", lg: "32px" }}
        justify="flex-start"
      >
        <Link as={NextLink} href="/">
          Overview
        </Link>
        <Link as={NextLink} href="/table">
          Table View
        </Link>
        <Link as={NextLink} href="/gallery">
          Gallery View
        </Link>
        <Link as={NextLink} href="/random-pack">
          Random Pack
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
