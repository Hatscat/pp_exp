import { lm } from "./libs/lm";

export const elements = {
  pageContainer: lm("div", { className: "flex items-center my-4 mx-auto" })(),
  headerTitle: lm("h1", { className: "text-2xl font-medium" })(),
};
