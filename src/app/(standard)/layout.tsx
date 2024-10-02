"use client";

import { Link } from "@chakra-ui/next-js";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav";

const Layout = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <SkipNavLink>Skip to content</SkipNavLink>
      <main>
        <Container py={{ base: 8 }} px={4} maxWidth="1600px" margin="auto">
          <SkipNavContent />
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
              <Heading as="h1" size="2xl">
                Jazzy Vintage Cube
              </Heading>
              <Text color="gray.600">
                A custom, vintage-power-level Magic the Gathering cube.
              </Text>
            </div>
            <Flex
              direction={["column", "row"]}
              gap={{ base: "8px", lg: "32px" }}
              justify="flex-start"
            >
              <Link href="/">Overview</Link>
              <Link href="/table">Table View</Link>
              <Link href="/gallery">Gallery View</Link>
              <Link href="/random-pack">Random Pack</Link>
            </Flex>
          </Flex>
          {children}
        </Container>
      </main>
    </Flex>
  );
};

export default Layout;
