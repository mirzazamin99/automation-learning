"use client";

import { useState } from "react";
import content from "../../../content.json";

const { detail } = content.operator;
const { groups } = content.reading;

const textareaClass =
  "mt-2 block w-full rounded-xl border border-edge bg-surface-tint/60 px-4 py-3 text-base leading-relaxed text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.08)] outline-none transition-all duration-300 ease-out focus-visible:border-accent-hover focus-visible:shadow-[var(--shadow-glow)]";

function draftToFields(source) {
  return {
    whatTheyActuallySay: source?.whatTheyActuallySay || "",
    theOneThingInTheWay: source?.theOneThingInTheWay || "",
    fourteenDays: Array.isArray(source?.fourteenDays) ? source.fourteenDays.join("\n") : "",
    notes: source?.notes || "",
  };
}

function fieldsToDraft(fields) {
  return {
    whatTheyActuallySay: fields.whatTheyActuallySay.trim(),
    theOneThingInTheWay: fields.theOneThingInTheWay.trim(),
    fourteenDays: fields.fourteenDays
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    notes: fields.notes.trim(),
  };
}

export default function OperatorDetailClient({ submission }) {
  const hasDraft = Boolean(submission.draft || submission.final);
  const [fields, setFields] = useState(draftToFields(submission.final || submission.draft));
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [sendState, setSendState] = useState("idle"); // idle | saving | error | emailFailed
  const [sent, setSent] = useState(submission.sent);
  const [sentAt, setSentAt] = useState(submission.sent_at);

  function updateField(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
  }

  async function persist(extra) {
    const res = await fetch(`/api/operator/submissions/${submission.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final: fieldsToDraft(fields), ...extra }),
    });
    if (!res.ok) throw new Error("save failed");
    return res.json();
  }

  async function handleSave() {
    setSaveState("saving");
    try {
      await persist({});
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  async function handleMarkAsSent() {
    setSendState("saving");
    try {
      const result = await persist({ sent: true });
      setSent(true);
      setSentAt(result.sentAt);
      setSaveState("saved");
      setSendState(result.emailSent === false ? "emailFailed" : "idle");
    } catch {
      setSendState("error");
    }
  }

  return (
    <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
      <section>
        <h2 className="flex items-center gap-3 font-display text-xl font-medium text-foreground">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {detail.answersHeading}
        </h2>
        <div className="mt-8 space-y-9">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-faint">
                {group.label}
              </h3>
              <div className="mt-4 space-y-4">
                {group.questions.map((question) => (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-edge bg-surface px-5 py-4 shadow-[var(--shadow-card)]"
                  >
                    <p className="text-sm font-semibold text-accent-text">{question.text}</p>
                    <p className="mt-2 text-base leading-relaxed text-foreground">
                      {submission.answers?.[question.id] || ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-3 font-display text-xl font-medium text-foreground">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {detail.draftHeading}
        </h2>
        <div className="mt-8" />

        {!hasDraft && (
          <p className="mt-6 text-base text-foreground-faint">{detail.noDraftLabel}</p>
        )}

        {hasDraft && (
          <div className="mt-6 space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-foreground-dim">
                {detail.whatTheyActuallySayLabel}
              </span>
              <textarea
                value={fields.whatTheyActuallySay}
                onChange={(event) => updateField("whatTheyActuallySay", event.target.value)}
                rows={6}
                className={textareaClass}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-dim">
                {detail.theOneThingInTheWayLabel}
              </span>
              <textarea
                value={fields.theOneThingInTheWay}
                onChange={(event) => updateField("theOneThingInTheWay", event.target.value)}
                rows={3}
                className={textareaClass}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-dim">
                {detail.fourteenDaysLabel}
              </span>
              <span className="ml-2 text-sm text-foreground-faint">{detail.fourteenDaysHint}</span>
              <textarea
                value={fields.fourteenDays}
                onChange={(event) => updateField("fourteenDays", event.target.value)}
                rows={14}
                className={textareaClass}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-dim">{detail.notesLabel}</span>
              <textarea
                value={fields.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                rows={4}
                className={textareaClass}
              />
            </label>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saveState === "saving"}
                className="rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-foreground-dim transition-colors duration-300 ease-out hover:border-accent-hover hover:text-foreground disabled:opacity-60"
              >
                {saveState === "saving" ? detail.savingLabel : detail.saveLabel}
              </button>
              {saveState === "saved" && (
                <span className="text-sm font-medium text-foreground-dim">{detail.savedLabel}</span>
              )}
              {saveState === "error" && (
                <span className="text-sm font-medium text-accent-text">{detail.saveErrorLabel}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-edge pt-6">
              {sent ? (
                <span className="text-sm font-medium text-foreground-dim">
                  {detail.sentOnLabel}
                  {sentAt ? ` · ${new Date(sentAt).toLocaleDateString("en-IN")}` : ""}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAsSent}
                  disabled={sendState === "saving"}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium tracking-wide text-paper shadow-[0_14px_28px_-12px_rgba(130,35,47,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_20px_38px_-10px_rgba(154,44,58,0.6)] active:translate-y-0 active:bg-accent-press disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {sendState === "saving"
                    ? "Sending"
                    : `Send to ${submission.name?.split(" ")[0] || "them"}`}
                </button>
              )}
              {sendState === "error" && (
                <span className="text-sm font-medium text-accent-text">{detail.saveErrorLabel}</span>
              )}
              {sendState === "emailFailed" && (
                <span className="text-sm font-medium text-accent-text">
                  {detail.emailFailedLabel}
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
