"use client";

import { AutocardContextProvider } from "@/components/AutocardContext";

const Layout = ({ children }) => {
  return <AutocardContextProvider>{children}</AutocardContextProvider>;
};

export default Layout;
