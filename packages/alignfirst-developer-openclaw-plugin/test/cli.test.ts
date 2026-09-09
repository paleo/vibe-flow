import { describe, expect, it } from "vitest";
import { renderReceipts } from "../src/thread-handoff/cli.js";
import { receipt } from "./helpers.js";

describe("thread-handoff receipt rendering", () => {
  it("renders empty JSON and text output", () => {
    expect(renderReceipts([], true)).toBe("[]");
    expect(renderReceipts([], false)).toBe("No active receipts.");
  });

  it("renders JSON without starter text", () => {
    const output = renderReceipts(
      [
        receipt(),
        receipt({
          receiptKey: "receipt-2",
          threadId: "200.300",
          starterMessageId: undefined,
        }),
      ],
      true,
    );
    expect(JSON.parse(output)).toEqual([
      {
        sessionKey: receipt().sessionKey,
        sessionId: receipt().sessionId,
        threadId: receipt().threadId,
        starterMessageId: receipt().starterMessageId,
        createdAt: receipt().createdAt,
        expiresAt: receipt().expiresAt,
      },
      {
        sessionKey: receipt().sessionKey,
        sessionId: receipt().sessionId,
        threadId: "200.300",
        createdAt: receipt().createdAt,
        expiresAt: receipt().expiresAt,
      },
    ]);
    expect(output).not.toContain(receipt().starterText);
  });

  it("renders tab-separated text without starter text", () => {
    const records = [
      receipt(),
      receipt({ receiptKey: "receipt-2", threadId: "200.300", starterMessageId: undefined }),
    ];
    const output = renderReceipts(records, false);
    expect(output).toBe(
      `${records[0].sessionKey}\t100.200\t100.201\t1000\t3601000\n${records[1].sessionKey}\t200.300\t-\t1000\t3601000`,
    );
    expect(output).not.toContain(receipt().starterText);
  });
});
