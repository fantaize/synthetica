import { useMemo } from "react";
import type { Lab, Stats } from "../types";

export function useStats(labs: Lab[]): Stats {
  return useMemo<Stats>(() => {
    const tierCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    const countryCounts: Record<string, number> = {};
    const openSourceCounts: Record<string, number> = {
      true: 0,
      partial: 0,
      false: 0,
    };
    const apiCounts: Record<string, number> = { true: 0, false: 0 };
    const chatCounts: Record<string, number> = { true: 0, false: 0 };
    const focusAreas: Record<string, number> = {};

    labs.forEach((lab) => {
      tierCounts[lab.tier]++;
      const country = lab.headquarters.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
      openSourceCounts[String(lab.openSource)]++;
      apiCounts[String(lab.apiAvailable)]++;
      chatCounts[lab.chat ? "true" : "false"]++;
      lab.focus.forEach((f) => {
        focusAreas[f] = (focusAreas[f] || 0) + 1;
      });
    });

    return {
      tierCounts,
      countryCounts,
      openSourceCounts,
      apiCounts,
      chatCounts,
      focusAreas,
    };
  }, [labs]);
}
