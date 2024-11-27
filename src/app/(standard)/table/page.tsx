import "server-only";
import { Card, RawCard } from "@/utilities/magic_types";
import { processCard } from "@/utilities/process_card";
import TableView from "./TableView";
import { Sort, sortDeep } from "@/utilities/deep_sort";

export default async function Page() {
  const data = await fetch(process.env.CARD_DATA_JSON_URL!);
  const rawCards: RawCard[] = await data.json();
  const cards: Card[] = rawCards.map(processCard);
  const sorted = sortDeep(
    cards,
    true,
    Sort.Alphabetical,
    Sort["Color Category"],
    Sort["Types-Multicolor"],
    Sort["Mana Value"]
  );

  return <TableView numCards={cards.length} sorted={sorted} />;
}
