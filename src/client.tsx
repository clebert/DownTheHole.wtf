import "tailwindcss/tailwind.css";
import { render } from "preact";
import { App } from "./components/app.js";
import { backgroundStyle } from "./styles.js";

document.body.classList.add(...backgroundStyle.split(" "));

const appElement = document.querySelector("#app");

if (appElement) {
  render(<App />, appElement);
}
