import { buildJsonPluginConfigSchema, definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { DEFAULT_CHANNEL_SURFACES, registerThreadHandoff } from "./thread-handoff/index.js";

const configSchema = buildJsonPluginConfigSchema({
  type: "object",
  additionalProperties: false,
  properties: {
    channelSurfaces: {
      type: "object",
      additionalProperties: { enum: ["slack", "discord"] },
      default: DEFAULT_CHANNEL_SURFACES,
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
