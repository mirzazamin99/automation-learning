"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import content from "../../content.json";

const { plot } = content.sheet;

function PlotForm() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");

  const [direction, setDirection] = useState("");
  const [cost, setCost] = useState("");
  const [givingUp1, setGivingUp1] = useState("");
  const [givingUp2, setGivingUp2] = useState("");
  const [givingUp3, setGivingUp3] = useState("");
  const [status, setStatus] = useState("loading"); // loading | idle | saving | saved | error
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
      .catch(() => {
        setStatus("idle");
      });
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
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
        <p>No submissionId given in the page address.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
      <p>{plot.intro}</p>
      <form onSubmit={handleSubmit}>
        {plot.questions.map((q) => {
          if (q.id === "direction") {
            return (
              <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block" }}>
                  {q.question}
                  <textarea
                    rows={3}
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    required
                    style={{ display: "block", width: "100%" }}
                  />
                </label>
              </div>
            );
          }
          if (q.id === "cost") {
            return (
              <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block" }}>
                  {q.question}
                  <textarea
                    rows={3}
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                    style={{ display: "block", width: "100%" }}
                  />
                </label>
              </div>
            );
          }
          if (q.id === "givingUp") {
            return (
              <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block" }}>{q.question}</label>
                <input
                  type="text"
                  value={givingUp1}
                  onChange={(e) => setGivingUp1(e.target.value)}
                  style={{ display: "block", width: "100%", marginBottom: "0.5rem" }}
                />
                <input
                  type="text"
                  value={givingUp2}
                  onChange={(e) => setGivingUp2(e.target.value)}
                  style={{ display: "block", width: "100%", marginBottom: "0.5rem" }}
                />
                <input
                  type="text"
                  value={givingUp3}
                  onChange={(e) => setGivingUp3(e.target.value)}
                  style={{ display: "block", width: "100%" }}
                />
              </div>
            );
          }
          return null;
        })}
        {status === "error" && message && <p role="alert">{message}</p>}
        {status === "saved" && <p>{message}</p>}
        <button type="submit" disabled={status === "saving" || status === "loading"}>
          {status === "saving" ? "Saving" : "Save"}
        </button>
      </form>
    </main>
  );
}

export default function PlotPage() {
  return (
    <Suspense fallback={<main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}><p>Loading</p></main>}>
      <PlotForm />
    </Suspense>
  );
}
