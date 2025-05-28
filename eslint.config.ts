import { rules } from "eslint-plugin-prettier";
import tl from "./src/index";

export default tl(
  {
    prettier: true,
  },
  {
    rules: {
      semi: false,
    },
  },
).append({
  files: ["src/**/*.ts"],
  rules: {},
});
