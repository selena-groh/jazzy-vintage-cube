import React from "react";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata = {
  title: {
    template: "%s | Jazzy Vintage Cube",
    default: "Jazzy Vintage Cube", // a default is required when creating a template
  },
  description: "A custom, vintage-power-level cube",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.robotoSerif.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
