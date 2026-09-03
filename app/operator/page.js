import Link from "next/link";
import { getSupabaseAdmin } from "../../lib/supabase-admin";
import content from "../../content.json";
import OperatorHeader from "./OperatorHeader";

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
    <>
      <OperatorHeader label={queue.signOutLabel} />
      <main className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-3xl font-medium text-foreground md:text-4xl">
          {queue.heading}
        </h1>

        {error && (
          <p className="mt-8 text-base font-medium text-accent-text">{queue.loadErrorLabel}</p>
        )}

        {!error && rows.length === 0 && (
          <p className="mt-8 text-base text-foreground-faint">{queue.emptyLabel}</p>
        )}

        {!error && rows.length > 0 && (
          <div className="mt-10 flex flex-col gap-4">
            {rows.map((row) => {
              const marked = row.flagged || row.draft_status === "failed";
              const badgeLabel = row.flagged
                ? queue.flaggedLabel
                : queue.statusLabels[row.draft_status] || row.draft_status;
              return (
                <Link
                  key={row.id}
                  href={`/operator/${row.id}`}
                  className="flex flex-col gap-3 rounded-2xl border border-edge bg-surface px-5 py-5 shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:shadow-[var(--shadow-card-hover)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
                >
                  <div>
                    <p className="font-display text-lg text-foreground">{row.name}</p>
                    <p className="text-sm text-foreground-faint">{row.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <span
                      className={
                        marked
                          ? "rounded-full bg-accent px-3 py-1 text-xs font-medium text-paper"
                          : "rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text"
                      }
                    >
                      {badgeLabel}
                    </span>
                    <p className="text-sm text-foreground-faint">{formatDate(row.submitted_at)}</p>
                    <p className="text-sm text-foreground-dim">{statusText(row)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
