export const PROTOCOLS = ["spec", "plan", "aad", "merge", "review", "description"] as const;

export type Protocol = (typeof PROTOCOLS)[number];
