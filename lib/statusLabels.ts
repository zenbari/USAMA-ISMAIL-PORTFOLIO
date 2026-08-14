import type { ImplementationStatus } from "@/types/content";

export const STATUS_LABELS: Record<ImplementationStatus, string> = {
  "ongoing-role": "Ongoing",
  "roadmap-delivered": "Roadmap delivered",
  "planning-only": "Planning stage — no live changes made",
  "self-directed-build": "Self-directed build",
  "past-role": "Completed — prior role",
};
