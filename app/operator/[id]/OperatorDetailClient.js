"use client";

import { useState } from "react";
import content from "../../../content.json";
import { theme } from "../../../lib/operator-theme";

const { detail } = content.operator;
const { groups } = content.reading;

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
  const [sendState, setSendState] = useState("idle"); // idle | saving | error
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
      setSendState("idle");
    } catch {
      setSendState("error");
    }
  }

  return (
    <div style={theme.detailGrid}>
      <section className="operator-answers-column" style={theme.answersColumn}>
        <h2 style={theme.sectionHeading}>{detail.answersHeading}</h2>
        <div style={theme.sectionHeadingRule} />
        {groups.map((group) => (
          <div key={group.id} style={theme.answerGroup}>
            <h3 style={theme.answerGroupLabel}>{group.label}</h3>
            <div style={theme.sectionHeadingRule} />
            {group.questions.map((question) => (
              <div key={question.id} style={theme.answerItem}>
                <p style={theme.answerQuestion}>{question.text}</p>
                <p style={theme.answerText}>{submission.answers?.[question.id] || ""}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="operator-draft-column" style={theme.draftColumn}>
        <h2 style={theme.sectionHeading}>{detail.draftHeading}</h2>
        <div style={theme.sectionHeadingRule} />

        {!hasDraft && <p style={theme.mutedText}>{detail.noDraftLabel}</p>}

        {hasDraft && (
          <div style={theme.draftCard}>
            <label style={theme.fieldLabel}>
              <span style={theme.fieldLabelText}>{detail.whatTheyActuallySayLabel}</span>
              <textarea
                value={fields.whatTheyActuallySay}
                onChange={(event) => updateField("whatTheyActuallySay", event.target.value)}
                rows={6}
                style={theme.textarea}
              />
            </label>

            <label style={theme.fieldLabel}>
              <span style={theme.fieldLabelText}>{detail.theOneThingInTheWayLabel}</span>
              <textarea
                value={fields.theOneThingInTheWay}
                onChange={(event) => updateField("theOneThingInTheWay", event.target.value)}
                rows={3}
                style={theme.textarea}
              />
            </label>

            <label style={theme.fieldLabel}>
              <span style={theme.fieldLabelText}>{detail.fourteenDaysLabel}</span>
              <span style={theme.fieldHint}>{detail.fourteenDaysHint}</span>
              <textarea
                value={fields.fourteenDays}
                onChange={(event) => updateField("fourteenDays", event.target.value)}
                rows={14}
                style={theme.textarea}
              />
            </label>

            <label style={{ ...theme.fieldLabel, marginBottom: 0 }}>
              <span style={theme.fieldLabelText}>{detail.notesLabel}</span>
              <textarea
                value={fields.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                rows={4}
                style={theme.textarea}
              />
            </label>

            <div style={theme.actionsRow}>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveState === "saving"}
                className="operator-quiet-button"
                style={theme.quietButton}
              >
                {saveState === "saving" ? detail.savingLabel : detail.saveLabel}
              </button>
              {saveState === "saved" && <span style={theme.sentLabel}>{detail.savedLabel}</span>}
              {saveState === "error" && <span style={theme.errorText}>{detail.saveErrorLabel}</span>}
            </div>

            <div style={theme.sentRow}>
              {sent ? (
                <span style={theme.sentLabel}>
                  {detail.sentOnLabel}
                  {sentAt ? ` · ${new Date(sentAt).toLocaleDateString("en-IN")}` : ""}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAsSent}
                  disabled={sendState === "saving"}
                  className="operator-primary-button"
                  style={theme.primaryButton}
                >
                  {sendState === "saving" ? detail.markingAsSentLabel : detail.markAsSentLabel}
                </button>
              )}
              {sendState === "error" && <span style={theme.errorText}>{detail.saveErrorLabel}</span>}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
