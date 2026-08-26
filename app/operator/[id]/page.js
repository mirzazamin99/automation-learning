import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import content from "../../../content.json";
import { theme } from "../../../lib/operator-theme";
import OperatorDetailClient from "./OperatorDetailClient";

const { detail } = content.operator;

export const dynamic = "force-dynamic";

export default async function OperatorSubmissionPage({ params }) {
  const { id } = await params;
  const supabaseAdmin = getSupabaseAdmin();

  const { data: submission, error } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !submission) notFound();

  return (
    <main style={theme.page}>
      <div style={theme.container}>
        <Link href="/operator" className="operator-back-link" style={theme.backLink}>
          {detail.backLabel}
        </Link>

        <div style={theme.detailIntro}>
          <h1 style={theme.heading}>{submission.name}</h1>
          <p style={theme.subHeading}>{submission.email}</p>

          {submission.flagged && <p style={theme.noticeText}>{detail.flaggedNoticeLabel}</p>}
          {submission.draft_status === "failed" && (
            <p style={theme.noticeText}>{detail.failedNoticeLabel}</p>
          )}
        </div>

        <OperatorDetailClient submission={submission} />
      </div>
    </main>
  );
}
