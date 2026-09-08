import type { OpenClawPluginApi } from "openclaw/plugin-sdk/plugin-entry";
import { createHandoffStore, type HandoffStore } from "./state.js";

export function registerThreadHandoffCli(api: OpenClawPluginApi): void {
  api.registerCli(
    ({ program }) => {
      const command = program
        .command("thread-handoff")
        .description("Inspect and maintain durable thread handoffs");
      command
        .command("list")
        .description("List pending and claimed handoffs")
        .option("--json", "Print JSON")
        .action((options: { json?: boolean }) => listHandoffs(api, options.json === true));
      command
        .command("retire")
        .description("Retire one claimed handoff")
        .argument("<handoff-id>")
        .option("--force", "Also retire a pending handoff")
        .action((handoffId: string, options: { force?: boolean }) =>
          retireHandoff(api, handoffId, options.force === true),
        );
    },
    {
      descriptors: [
        {
          name: "thread-handoff",
          description: "Inspect and maintain durable thread handoffs",
          hasSubcommands: true,
          machineOutput: ({ argv }) => argv.includes("--json"),
        },
      ],
    },
  );
}

function listHandoffs(api: OpenClawPluginApi, json: boolean): void {
  withStore(api, (store) => {
    const records = store.listHandoffs();
    if (json) {
      process.stdout.write(`${JSON.stringify(records, null, 2)}\n`);
      return;
    }
    if (records.length === 0) {
      process.stdout.write("No managed handoffs.\n");
      return;
    }
    for (const record of records) {
      process.stdout.write(
        `${record.handoffId}\t${record.state}\t${record.enqueueCount} wakes\t${record.targetSessionKey}\t${record.createdAt}\n`,
      );
    }
  });
}

function retireHandoff(api: OpenClawPluginApi, handoffId: string, force: boolean): void {
  withStore(api, (store) => {
    const retired = store.retireHandoff(handoffId.trim(), { force });
    if (!retired) throw new Error(`Unknown handoff: ${handoffId}`);
    process.stdout.write(`Retired ${handoffId}.\n`);
  });
}

function withStore<T>(api: OpenClawPluginApi, operation: (store: HandoffStore) => T): T {
  const store = createHandoffStore(api.runtime.state.resolveStateDir());
  try {
    return operation(store);
  } finally {
    store.close();
  }
}
