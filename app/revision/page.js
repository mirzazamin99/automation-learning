"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { revision } = content.sheet;
const { colors, typography } = content.brand;

const pageStyle = {
  backgroundColor: colors.paper,
  color: colors.ink,
  fontFamily: typography.fontFamily,
  minHeight: "100vh",
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
};
const wrap = { maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem" };
const heading = { color: colors.oxblood, fontWeight: "normal" };
const label = { display: "block", marginBottom: "0.5rem" };
const inputStyle = {
  display: "block",
  width: "100%",
  fontFamily: typography.fontFamily,
  fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
  padding: "0.5rem",
  border: `1px solid ${colors.hair}`,
  backgroundColor: colors.paper,
  color: colors.ink,
  boxSizing: "border-box",
};
const button = {
  display: "inline-block",
  backgroundColor: colors.oxblood,
  color: colors.paper,
  padding: "0.75rem 1.5rem",
  border: "none",
  fontFamily: typography.fontFamily,
  fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
  cursor: "pointer",
};
function RevisionForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");

  const [counts, setCounts] = useState(null);
  const [missedDay, setMissedDay] = useState("");
  const [directionCheck, setDirectionCheck] = useState("");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!submissionId) {
      setStatus("error");
      setMessage("No submissionId given in the page address.");
      return;
    }
    fetch(`/api/revision?submissionId=${submissionId}`)
      .then((res) => res.json())
      .then((result) => {
        setCounts(result.counts);
        if (result.revision) {
          setMissedDay(result.revision.missed_day || "");
          setDirectionCheck(result.revision.direction_check || "");
        }
        setStatus("idle");
      })
      .catch(() => setStatus("idle"));
  }, [submissionId]);
  async function handleSave() {
    setStatus("saving");
    setMessage("");
    const givingUp = [missedDay, directionCheck];
    try {
      const res = await fetch("/api/revision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, missedDay, directionCheck }),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(result.error || "Could not save.");
        return;
      }
      setStatus("saved");
      setMessage("Saved.");
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  }

  if (!submissionId) {
    return (
      <div style={pageStyle}>
        <main style={wrap}><p>No submissionId given in the page address.</p></main>
      </div>
    );
  }
  return (
    <div style={pageStyle}>
      <main style={wrap}>
        <p>{revision.intro}</p>

        {counts && (
          <div style={{ marginBottom: "2rem" }}>
            <p>Days with an entry, last 7 days: {counts.totalDays}</p>
            <p>Yes: {counts.yes}</p>
            <p>No: {counts.no}</p>
            <p>Not answered: {counts.notAnswered}</p>
          </div>
        )}

        {revision.questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "1.5rem" }}>
            <label style={label}>
              {q.question}
              <textarea
                rows={3}
                value={q.id === "missedDay" ? missedDay : directionCheck}
                onChange={(e) =>
                  q.id === "missedDay"
                    ? setMissedDay(e.target.value)
                    : setDirectionCheck(e.target.value)
                }
                style={inputStyle}
              />
            </label>
          </div>
        ))}
        {status === "error" && message && <p role="alert">{message}</p>}
        {status === "saved" && <p>{message}</p>}
        <button onClick={handleSave} disabled={status === "saving" || status === "loading"} style={button}>
          {status === "saving" ? "Saving" : "Save"}
        </button>
      </main>
    </div>
  );
}

export default function RevisionPage() {
  return (
    <Suspense fallback={<div style={pageStyle}><main style={wrap}><p>Loading</p></main></div>}>
      <RevisionForm />
    </Suspense>
  );
}
