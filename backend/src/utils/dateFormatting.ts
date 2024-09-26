/** @format */

import { format } from "date-fns";

export function formatDateWithDateFns(date: Date): string {
  return format(date, "dd/MM/yy");
}
