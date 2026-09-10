import { DatabaseSync } from "node:sqlite";

export interface DumpedSession {
  sessionKey: string;
  sessionId: string;
  messages: unknown[];
}

export function readConversationSessions(
  dbPath: string,
  sinceMs: number,
  conversationId: string,
  threadIds: string[],
): DumpedSession[] {
  let db: DatabaseSync;
  try {
    db = new DatabaseSync(dbPath, { readOnly: true });
  } catch {
    return [];
  }
  try {
    db.exec("PRAGMA busy_timeout = 2000;");
    const wanted = conversationId.toLowerCase();
    const nodes = db.prepare("SELECT session_key, current_session_id FROM session_nodes").all() as {
      session_key: string;
      current_session_id: string;
    }[];
    const sessions: DumpedSession[] = [];
    for (const node of nodes) {
      const segments = node.session_key.toLowerCase().split(":");
      if (!segments.includes(wanted) && !threadIds.some((id) => segments.includes(id))) continue;
      sessions.push({
        sessionKey: node.session_key,
        sessionId: node.current_session_id,
        messages: readNodeMessages(db, node, sinceMs),
      });
    }
    return sessions;
  } catch {
    // Fresh store without the tables yet, or a transient lock: the runner's
    // next poll retries.
    return [];
  } finally {
    db.close();
  }
}

/**
 * A session key can span several session windows: compaction, reset, or
 * recovery mints a successor id that `current_session_id` then advances to,
 * and `transcript_events` rows stay keyed to the window that wrote them.
 * Union every window of the key (in creation order) so earlier tool calls and
 * costs survive a mid-run rollover.
 */
function readNodeMessages(
  db: DatabaseSync,
  node: { session_key: string; current_session_id: string },
  sinceMs: number,
): unknown[] {
  const windows = db
    .prepare("SELECT session_id FROM session_windows WHERE session_key = ? ORDER BY created_at")
    .all(node.session_key) as { session_id: string }[];
  const sessionIds = windows.map((w) => w.session_id);
  if (!sessionIds.includes(node.current_session_id)) sessionIds.push(node.current_session_id);
  return sessionIds.flatMap((id) => readSessionMessages(db, id, sinceMs));
}

function readSessionMessages(db: DatabaseSync, sessionId: string, sinceMs: number): unknown[] {
  const rows = db
    .prepare(
      "SELECT event_json FROM transcript_events WHERE session_id = ? AND created_at >= ? ORDER BY seq",
    )
    .all(sessionId, sinceMs) as { event_json: string }[];
  const messages: unknown[] = [];
  for (const row of rows) {
    let event: { type?: string; message?: unknown };
    try {
      event = JSON.parse(row.event_json) as { type?: string; message?: unknown };
    } catch {
      continue;
    }
    if (event.type === "message" && event.message !== undefined) messages.push(event.message);
  }
  return messages;
}
