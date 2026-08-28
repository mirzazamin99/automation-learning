"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { morning, evening } = content.sheet;
const { colors, typography } = content.brand;

const pageStyle = {
  backgroundColor: colors.paper,
  color: colors.ink,
  fontFamily: typography.fontFamily,
  minHeight: "100vh",
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
};
const wrap = { maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem" };
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

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function SheetForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");
  const date = todayISO();

  const [morningEntry, setMorningEntry] = useState("");
  const [didIt, setDidIt] = useState(null);
  const [eveningDetail, setEveningDetail] = useState("");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!submissionId) {
      setStatus("error");
      setMessage("No submissionId given in the page address.");
      return;
    }
    fetch(`/api/day?submissionId=${submissionId}&date=${date}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.day) {
          setMorningEntry(result.day.morning_entry || "");
          setDidIt(result.day.did_it === undefined ? null : result.day.did_it);
          setEveningDetail(result.day.evening_detail || "");
        }
        setStatus("idle");
      })
      .catch(() => setStatus("idle"));
  }, [submissionId, date]);

  async function handleSave() {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, date, morningEntry, didIt, eveningDetail }),
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
        <p>{date}</p>
        <div style={{ marginBottom: "2rem" }}>
          <label style={label}>
            {morning.question}
            <input type="text" value={morningEntry} onChange={(e) => setMorningEntry(e.target.value)} style={inputStyle} />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <p>{evening.didItQuestion}</p>
          <label style={{ marginRight: "1rem" }}>
            <input type="radio" name="didIt" checked={didIt === true} onChange={() => setDidIt(true)} /> {evening.didItOptions[0]}
          </label>
          <label style={{ marginRight: "1rem" }}>
            <input type="radio" name="didIt" checked={didIt === false} onChange={() => setDidIt(false)} /> {evening.didItOptions[1]}
          </label>
          <label>
            <input type="radio" name="didIt" checked={didIt === null} onChange={() => setDidIt(null)} /> {evening.didItOptions[2]}
          </label>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label style={label}>
            {evening.detailQuestion}
            <input
 type="text" value={eveningDetail} onChange={(e) => setEveningDetail(e.target.value)} style={inputStyle} />
          </label>
        </div>
        {status === "error" && message && <p role="alert">{message}</p>}
        {status === "saved" && <p>{message}</p>}
        <button onClick={handleSave} disabled={status === "saving" || status === "loading"} style={button}>
          {status === "saving" ? "Saving" : "Save"}
        </button>
      </main>
    </div>
  );
}

export default function SheetPage() {
  return (
    <Suspense fallback={<div style={pageStyle}><main style={wrap}><p>Loading</p></main></div>}>
      <SheetForm />
    </Suspense>
  );
}
