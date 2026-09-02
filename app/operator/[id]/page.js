import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import content from "../../../content.json";
import OperatorHeader from "../OperatorHeader";
import OperatorDetailClient from "./OperatorDetailClient";
import ReplyBox from "./ReplyBox";

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
    <>
      <OperatorHeader />
      <main className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
        <Link
          href="/operator"
          className="text-sm font-medium text-foreground-faint transition-colors duration-300 ease-out hover:text-foreground"
        >
          &larr; {detail.backLabel}
        </Link>

        <div className="mt-6">
          <h1 className="font-display text-3xl font-medium text-foreground md:text-4xl">
            {submission.name}
          </h1>
          <p className="mt-1 text-base text-foreground-faint">{submission.email}</p>

          {submission.flagged && (
            <>
              <p className="mt-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-text">
                {detail.flaggedNoticeLabel}
              </p>
              {submission.screening && (
                <div className="mt-4 max-w-[65ch]">
                  <p className="text-sm font-medium text-foreground-dim">
                    {detail.screeningAnswerLabel}
                  </p>
                  <p className="mt-1 text-base leading-relaxed text-foreground">
                    {submission.screening}
                  </p>
                </div>
              )}
              <ReplyBox
                submissionId={submission.id}
                initialReplied={submission.replied}
                initialRepliedAt={submission.replied_at}
                initialReplyBody={submission.reply_body}
              />
            </>
          )}

          {submission.draft_status === "failed" && (
            <p className="mt-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-text">
              {detail.failedNoticeLabel}
            </p>
          )}
        </div>

        <OperatorDetailClient submission={submission} />
      </main>
    </>
  );
}
