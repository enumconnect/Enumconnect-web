import { getByState, getStates } from "nigeria-lga-data";

export const nigerianStates = getStates();

export function getNigerianLgas(state: string): string[] {
  return getByState(state).map(({ name }) => name);
}
