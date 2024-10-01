"use client";

import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "theme/theme";

export function Providers({ children }) {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
}
