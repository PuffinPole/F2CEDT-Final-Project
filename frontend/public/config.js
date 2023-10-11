/**
 * @typedef {Object} Item
 * @property {number} _id
 * @property {number} distance
 * @property {number} velocity
 * @property {string} name
 * @property {number} acceleration
 */

/** @typedef {Omit<Item, "_id">} ItemPayload */

export const BACKEND_URL = "http://localhost:3222";