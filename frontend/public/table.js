import { createItem, getItems } from "./api.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

/**
 * @param {Item[]} items
 */

function drawTable(items) {
    /** @type {HTMLTableSectionElement} */
    const table = document.getElementById("table-body");

    // Clear all elements
    table.innerHTML = "";

    for (const item of items) {
      const row = table.insertRow();
      row.insertCell().innerText = item.name;
      row.insertCell().innerText = item.position;
      row.insertCell().innerText = item.velocity;
      row.insertCell().innerText = item.acceleration;
      row.insertCell().innerText = item.time;
      row.insertCell().innerText = item.distance;
    }
}

export async function fetchAndDrawTable() {
    const items = await getItems();
  
    drawTable(items);

}

export async function handleCreateItem() {
    /** @type {HTMLInputElement} */
    const slide_v = document.getElementById("velocity");
    /** @type {HTMLInputElement} */
    const slide_a = document.getElementById("acceleration");
    /** @type {HTMLInputElement} */
    const slide_t = document.getElementById("time");
    /** @type {HTMLInputElement} */
    const slide_s = document.getElementById("position");
    let t = slide_t.value;
    /** @type {HTMLInputElement} */
    const cal = slide_v.value*t + 0.5*slide_a.value*t*t;
    /** @type {HTMLInputElement} */
    let input = document.querySelector('.input-container input').value;
    if(input === ""){
        input = "Anonymous";
    }
    const payload = {
        name: input,
        position: slide_s.value,
        velocity: slide_v.value,
        acceleration: slide_a.value,
        time: slide_t.value,
        distance: cal,
    };
  
    await createItem(payload);
    await fetchAndDrawTable();
}