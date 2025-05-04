// components/LostAndFound/statusColors.ts

import { LostItem } from "../../data/LostAndFoundData";

// Status color classes mapping
export const statusColors: Record<LostItem["status"], string> = {
  Reported: "bg-yellow-500 text-white",
  Found: "bg-green-500 text-white",
  Unclaimed: "bg-red-500 text-white",
  Returned: "bg-orange-500 text-white",
};
