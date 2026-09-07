import { buildJsonPluginConfigSchema, definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { registerThreadHandoff } from "./thread-handoff/index.js";

const configSchema = buildJsonPluginConfigSchema({
  type: "object",
  additionalProperties: false,
  properties: {
    channelSurfaces: {
      type: "object",
      additionalProperties: { enum: ["slack", "discord"] },
      default: { slack: "slack", discord: "discord" },
    },
  },
});

export default definePluginEntry({
  id: "alignfirst-developer",
  name: "AlignFirst Developer",
  description: "OpenClaw capabilities for AlignFirst Developer.",
  configSchema,
  register: registerThreadHandoff,
});
