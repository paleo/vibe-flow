import assert from "node:assert/strict";
import { test } from "node:test";

import {
  type CodingAgentCall,
  extractCodingPrompt,
  isAlignfirstWrapperCall,
  isCodingProtocolPrompt,
  renderCodingAgentCall,
} from "../scenarios/_lib/mock-coding-agent.ts";

const PROMPT =
  "Run `alignfirst guide aad` and follow the protocol. Ticket ID = 29.\n\nFix `code` and $(literal).";

for (const agent of ["claude", "codex"] as const) {
  test(`${agent} uses stdin for new and resumed wrapper calls`, () => {
    for (const resumed of [false, true]) {
      const argv =
        agent === "claude"
          ? [
              "-p",
              "--output-format",
              "stream-json",
              "--verbose",
              "--permission-mode",
              "auto",
              ...(resumed ? ["--resume", "session-1"] : []),
            ]
          : [
              "exec",
              "--json",
              "--sandbox",
              "workspace-write",
              ...(resumed ? ["resume", "session-1"] : []),
              "-",
            ];
      const call: CodingAgentCall = { agent, argv, cwd: "/fixture", stdin: PROMPT };
      assert.equal(isAlignfirstWrapperCall(call), true);
      assert.equal(extractCodingPrompt(call), PROMPT);
      assert.ok(renderCodingAgentCall(call).includes(PROMPT));
    }
  });
}

test("recognizes the active protocol after catchup and ignores historical instructions", () => {
  const history = `Ticket history\n\n${PROMPT}`;
  assert.equal(isCodingProtocolPrompt(PROMPT), true);
  assert.equal(isCodingProtocolPrompt(`${history}\n\n## Current instruction\n\n${PROMPT}`), true);
  assert.equal(
    isCodingProtocolPrompt(`${history}\n\n## Current instruction\n\nSummarize the history.`),
    false,
  );
  assert.equal(
    isCodingProtocolPrompt("Run `alignfirst guide catchup` and follow the protocol."),
    false,
  );
});

test("rejects argv prompts and model-catalog calls as wrapper executions", () => {
  const call: CodingAgentCall = {
    agent: "codex",
    cwd: "/fixture",
    stdin: "",
    argv: ["exec", "--json", "--sandbox", "workspace-write", PROMPT],
  };
  assert.equal(isAlignfirstWrapperCall(call), false);
  assert.equal(extractCodingPrompt(call), undefined);
  assert.equal(extractCodingPrompt({ ...call, argv: ["debug", "models", "--bundled"] }), undefined);
});
