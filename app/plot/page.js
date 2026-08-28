"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { plot } = content.sheet;
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

function PlotForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");

  const [direction, setDirection] = useState("");
  const [cost, setCost] = useState("");
  const [givingUp1, setGivingUp1] = useState("");
  const [givingUp2, setGivingUp2] = useState("");
  const [givingUp3, setGivingUp3] = useState("");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!submissionId) {
      setStatus("error");
      setMessage("No submissionId given in the page address.");
      return;
    }
    fetch(`/api/plot?submissionId=${submissionId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.plot) {
          setDirection(result.plot.direction || "");
          setCost(result.plot.cost || "");
          const givingUp = result.plot.giving_up || [];
          setGivingUp1(givingUp[0] || "");
          setGivingUp2(givingUp[1] || "");
          setGivingUp3(givingUp[2] || "");
        }
        setStatus("idle");
      })
      .catch(() => setStatus("idle"));
  }, [submissionId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const givingUp = [givingUp1, givingUp2, givingUp3].filter((item) => item.trim() !== "");
    try {
      const res = await fetch("/api/plot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, direction, cost, givingUp }),
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
        <p>{plot.intro}</p>
        <form onSubmit={handleSubmit}>
          {plot.questions.map((q) => {
            if (q.id === "direction") {
              return (
                <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                  <label style={label}>
                    {q.question}
                    <textarea rows={3} value={direction} onChange={(e) => setDirection(e.target.value)} required style={inputStyle} />
                  </label>
                </div>
              );
            }
            if (q.id === "cost") {
              return (
                <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                  <label style={label}>
                    {q.question}
                    <textarea rows={3} value={cost} onChange={(e) => setCost(e.target.value)} required style={inputStyle} />
                  </label>
                </div>
              );
            }
            if (q.id === "givingUp") {
              return (
                <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                  <label style={label}>{q.question}</label>
                  <input type="text" value={givingUp1} onChange={(e) => setGivingUp1(e.target.value)} style={{ ...inputStyle, marginBottom: "0.5rem" }} />
                  <input type="text" value={givingUp2} onChange={(e) => setGivingUp2(e.target.value)} style={{ ...inputStyle, marginBottom: "0.5rem" }} />
                  <input type="text" value={givingUp3} onChange={(e) => setGivingUp3(e.target.value)} style={inputStyle} />
                </div>
              );
            }
            return null;
          })}
          {status === "error" && message && <p role="alert">{message}</p>}
          {status === "saved" && <p>{message}</p>}
          <button type="submit" disabled={status === "saving" || status === "loading"} style={button}>
            {status === "saving" ? "Saving" : "Save"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default function PlotPage() {
  return (
    <Suspense fallback={<div style={pageStyle}><main style={wrap}><p>Loading</p></main></div>}>
      <PlotForm />
    </Suspense>
  );
}
