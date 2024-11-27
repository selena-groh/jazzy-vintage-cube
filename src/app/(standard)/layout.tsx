import "server-only";
import Header from "@/components/Header";
import { Container, Flex } from "@chakra-ui/react";
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav";

const Layout = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <main>
        <Container py={{ base: 8 }} px={4} maxWidth="1600px" margin="auto">
          <SkipNavLink>Skip to content</SkipNavLink>
          <Header />
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </Flex>
  );
};

export default Layout;
