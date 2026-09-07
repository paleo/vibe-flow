import type { ScenarioContext } from "@paleo/openclaw-test";
import { setupAlprojectMock, registeredProject } from "./_lib/mock-alproject.ts";
import { setupCodingAgentMock } from "./_lib/mock-coding-agent.ts";
import { setupGhMock } from "./_lib/mock-gh.ts";
import { NIMBUS_PROJECT_PATH, PRIMARY_PROJECT_PARENT } from "./_lib/project-fixtures.ts";
import { resetFixtures } from "./_lib/reset-fixture.ts";
import { waitForSetupAck } from "./_lib/setup-ack.ts";
import { bootstrapThreadFromChannel } from "./_lib/thread-bootstrap.ts";
import { runWorkspaceFlow } from "./_lib/workspace-flow.ts";

const PROJECT = "nimbus";
const TICKET_ID = "ABC-0140";

export default async function soleProjectInference(ctx: ScenarioContext): Promise<void> {
  await resetFixtures(ctx);
  const alproject = setupAlprojectMock(ctx, {
    projects: [registeredProject(PROJECT, NIMBUS_PROJECT_PATH, PRIMARY_PROJECT_PARENT)],
  });
  const codingAgent = setupCodingAgentMock(ctx);
  setupGhMock(ctx);

  const starter = await bootstrapThreadFromChannel(ctx, {
    text: `Ticket ${TICKET_ID} : passer le bouton d'export en gras.`,
    project: PROJECT,
    projectPath: NIMBUS_PROJECT_PATH,
    ticketId: TICKET_ID,
    codingAgent,
  });
  const ack = await waitForSetupAck(ctx, {
    threadId: starter.threadId,
    prevId: starter.match.id,
    sinceCursor: starter.nextCursor,
    timeoutMs: 240_000,
  });
  await runWorkspaceFlow(ctx, codingAgent, {
    projectPath: NIMBUS_PROJECT_PATH,
    ticketId: TICKET_ID,
    prevStep: ack,
  });
  alproject.assertListCallCount(1);

  ctx.markScenarioAsEnded("PASS");
  ctx.log("PASS");
}
