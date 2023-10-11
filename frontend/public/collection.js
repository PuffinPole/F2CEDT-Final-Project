import { fetchAndDrawTable, handleCreateItem } from "./table.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTable();

  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("save");
  addButton.addEventListener("click", () => {
    handleCreateItem();
  });
});