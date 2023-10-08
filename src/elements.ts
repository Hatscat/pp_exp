import { lm } from "./libs/lm";

export const elements = {
  pageContainer: lm("div", { id: "page_container" })(),
  headerTitle: lm("h1", { className: "text-2xl font-medium" })(),
};
