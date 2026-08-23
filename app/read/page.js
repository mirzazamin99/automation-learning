"use client";

import { useState } from "react";
import content from "../../content.json";
import { MAX_ANSWER_LENGTH } from "../../lib/validate-reading";

const { reading } = content;
const { form } = reading;

export default function ReadPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [message, setMessage] = useState("");

  function updateAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    let result;
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers }),
      });
      result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(result.error || form.genericError);
        return;
      }
    } catch {
      setStatus("error");
      setMessage(form.networkError);
      return;
    }

    setStatus("done");
    setMessage(result.emailSent ? form.successWithEmail : form.successWithoutEmail);
  }

  if (status === "done") {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
        <p>{message}</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
      <p>{reading.intro}</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block" }}>
            {form.nameLabel}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: "block", width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block" }}>
            {form.emailLabel}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", width: "100%" }}
            />
          </label>
        </div>

        {reading.groups.map((group) => (
          <section key={group.id} style={{ marginBottom: "2rem" }}>
            <h2>{group.label}</h2>
            {group.questions.map((q) => (
              <div key={q.id} style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block" }}>
                  {q.text}
                  <textarea
                    rows={q.rows}
                    maxLength={MAX_ANSWER_LENGTH}
                    value={answers[q.id] || ""}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    required
                    style={{ display: "block", width: "100%" }}
                  />
                </label>
              </div>
            ))}
          </section>
        ))}

        {status === "error" && message && <p role="alert">{message}</p>}

        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? form.submittingLabel : form.submitLabel}
        </button>
      </form>
    </main>
  );
}
