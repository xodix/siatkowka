import { writable } from "svelte/store";

export interface User {
  field: number;
  jwt: string;
}

export const user = writable({ field: 0, jwt: "" });
