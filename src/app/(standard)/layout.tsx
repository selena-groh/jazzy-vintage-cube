"use client";

import { Flex, Container, Heading, Text, Box } from "@chakra-ui/react";
import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav";
import { Link } from "@chakra-ui/next-js";

const Layout = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <SkipNavLink>Skip to content</SkipNavLink>
      <main>
        <Container py={{ base: 8 }} px={4} maxWidth="1600px" margin="auto">
          <Box is="header" mb="32px">
            <SkipNavContent />
            <Heading as="h1" size="2xl">
              Jazzy Vintage Cube
            </Heading>
            <Text color="gray.600">
              A custom, vintage-power-level Magic the Gathering cube.
            </Text>
            <Flex direction={["column", "row"]} gap="32px" justify="flex-start">
              <Link href="/">Overview</Link>
              <Link href="/table">Table View</Link>
              <Link href="/gallery">Gallery View</Link>
              <Link href="/random-pack">Random Pack</Link>
            </Flex>
          </Box>
          {children}
        </Container>
      </main>
    </Flex>
  );
};

export default Layout;
