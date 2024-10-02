import { Card, RawCard } from "@/utilities/magic_types";
import { processCard } from "@/utilities/process_card";
import TableView from "./TableView";

export default async function Page() {
  const data = await fetch(process.env.CARD_DATA_JSON_URL!);
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map(processCard);

  return <TableView cards={cards} />;
}
