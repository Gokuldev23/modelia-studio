import type { Generation } from "./types";


const KEY = "modelia-generations-v1";
const MAX = 5;

export function saveGeneration(gen: Generation) {
  const current = loadGenerations();
  const filtered = [gen, ...current.filter((g) => g.id !== gen.id)];
  const sliced = filtered.slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(sliced));
}

export function loadGenerations(): Generation[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Generation[];
    return parsed;
  } catch {
    return [];
  }
}