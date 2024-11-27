import "server-only";
import React from "react";
import { Heading } from "@chakra-ui/react";

export default async function Page() {
  return (
    <div>
      <Heading as="h2" size="lg" mb="16px">
        Overview
      </Heading>
      <p>TODO add cube information here</p>
    </div>
  );
}
