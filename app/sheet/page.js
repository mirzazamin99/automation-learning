"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { morning, evening } = content.sheet;

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function SheetForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");
  const date = todayISO();

  const [morningEntry, setMorningEntry] = useState("");
  const [didIt, setDidIt] = useState(null); // null | true | false
  const [eveningDetail, setEveningDetail] = useState("");
  const [status, setStatus] = useState("loading"); // loading | idle | saving | saved | error
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
        body: JSON.stringify({
          submissionId,
          date,
          morningEntry,
          didIt,
          eveningDetail,
        }),
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
      <p>{date}</p>

      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block" }}>
          {morning.question}
          <input
            type="text"
            value={morningEntry}
            onChange={(e) => setMorningEntry(e.target.value)}
            style={{ display: "block", width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p>{evening.didItQuestion}</p>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            name="didIt"
            checked={didIt === true}
            onChange={() => setDidIt(true)}
          />
          {" "}{evening.didItOptions[0]}
        </label>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            name="didIt"
            checked={didIt === false}
            onChange={() => setDidIt(false)}
          />
          {" "}{evening.didItOptions[1]}
        </label>
        <label>
          <input
            type="radio"
            name="didIt"
            checked={didIt === null}
            onChange={() => setDidIt(null)}
          />
          {" "}{evening.didItOptions[2]}
        </label>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block" }}>
          {evening.detailQuestion}
          <input
            type="text"
            value={eveningDetail}
            onChange={(e) => setEveningDetail(e.target.value)}
            style={{ display: "block", width: "100%" }}
          />
        </label>
      </div>

      {status === "error" && message && <p role="alert">{message}</p>}
      {status === "saved" && <p>{message}</p>}
      <button onClick={handleSave} disabled={status === "saving" || status === "loading"}>
        {status === "saving" ? "Saving" : "Save"}
      </button>
    </main>
  );
}

export default function SheetPage() {
  return (
    <Suspense fallback={<main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}><p>Loading</p></main>}>
      <SheetForm />
    </Suspense>
  );
}
