"use client";

import chakraTheme from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }) {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
}
