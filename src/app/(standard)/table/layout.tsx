import "server-only";
import { AutocardContextProvider } from "@/components/Autocard/AutocardContext";

const Layout = ({ children }) => {
  return <AutocardContextProvider>{children}</AutocardContextProvider>;
};

export default Layout;
