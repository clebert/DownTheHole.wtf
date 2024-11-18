import "tailwindcss/tailwind.css";
import { render } from "preact";
import { App } from "./components/app.js";

const appElement = document.querySelector("#app");

if (appElement) {
  render(<App />, appElement);
}
