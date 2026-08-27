"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { revision } = content.sheet;

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
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
        <p>No submissionId given in the page address.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
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
          <label style={{ display: "block" }}>
            {q.question}
            <textarea
              rows={3}
              value={q.id === "missedDay" ? missedDay : directionCheck}
              onChange={(e) =>
                q.id === "missedDay"
                  ? setMissedDay(e.target.value)
                  : setDirectionCheck(e.target.value)
              }
              style={{ display: "block", width: "100%" }}
            />
          </label>
        </div>
      ))}

      {status === "error" && message && <p role="alert">{message}</p>}
      {status === "saved" && <p>{message}</p>}
      <button onClick={handleSave} disabled={status === "saving" || status === "loading"}>
        {status === "saving" ? "Saving" : "Save"}
      </button>
    </main>
  );
}

export default function RevisionPage() {
  return (
    <Suspense fallback={<main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}><p>Loading</p></main>}>
      <RevisionForm />
    </Suspense>
  );
}
