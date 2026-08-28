import Link from "next/link";
import { getSupabaseAdmin } from "../../lib/supabase-admin";
import content from "../../content.json";
import { theme } from "../../lib/operator-theme";
import SignOutButton from "./SignOutButton";

const { queue } = content.operator;

export const dynamic = "force-dynamic";

function sortSubmissions(rows) {
  return [...rows].sort((a, b) => {
    const aMarked = a.flagged || a.draft_status === "failed";
    const bMarked = b.flagged || b.draft_status === "failed";
    if (aMarked !== bMarked) return aMarked ? -1 : 1;
    return new Date(b.submitted_at) - new Date(a.submitted_at);
  });
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusText(row) {
  const parts = row.draft_status === "flagged" ? [] : [queue.statusLabels[row.draft_status] || row.draft_status];
  if (row.flagged) parts.push(queue.flaggedLabel);
  if (row.sent) parts.push(queue.sentLabel);
  return parts.join(" · ");
}

export default async function OperatorQueuePage() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select("id, name, email, submitted_at, draft_status, flagged, sent")
    .order("submitted_at", { ascending: false });

  if (error) console.error("Queue load failed:", error.message);

  const rows = sortSubmissions(data || []);

  return (
    <main style={theme.page}>
      <div style={theme.container}>
        <div style={theme.topRow}>
          <h1 style={theme.heading}>{queue.heading}</h1>
          <SignOutButton label={queue.signOutLabel} />
        </div>

        {error && <p style={theme.errorText}>{queue.loadErrorLabel}</p>}

        {!error && rows.length === 0 && <p style={theme.mutedText}>{queue.emptyLabel}</p>}

        {!error && rows.length > 0 && (
          <div style={theme.queueList}>
            {rows.map((row) => {
              const marked = row.flagged || row.draft_status === "failed";
              const badgeLabel = row.flagged
                ? queue.flaggedLabel
                : queue.statusLabels[row.draft_status] || row.draft_status;
              return (
                <Link key={row.id} href={`/operator/${row.id}`} style={theme.queueRowLink}>
                  <div
                    className="operator-queue-row"
                    style={{ ...theme.queueRow, ...(marked ? theme.queueRowMarked : null) }}
                  >
                    <div>
                      <p style={theme.queueRowName}>{row.name}</p>
                      <p style={theme.mutedText}>{row.email}</p>
                    </div>
                    <div style={theme.queueRowMeta}>
                      <span style={{ ...theme.badge, ...(marked ? theme.badgeFlagged : theme.badgeNormal) }}>
                        {badgeLabel}
                      </span>
                      <p style={theme.mutedText}>{formatDate(row.submitted_at)}</p>
                      <p style={theme.queueRowStatus}>{statusText(row)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
