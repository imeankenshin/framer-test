import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  shortcuts: {
    vstack: "flex flex-col",
    hstack: "flex flex-row",
  },
});
