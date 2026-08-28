"use client";
import { useState } from "react";
import content from "../../content.json";

const { reading, brand } = content;
const { form } = reading;
const { colors, typography } = brand;

const pageStyle = {
  backgroundColor: colors.paper,
  color: colors.ink,
  fontFamily: typography.fontFamily,
  minHeight: "100vh",
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
};

const wrap = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "2rem 1.25rem",
};

const heading = {
  color: colors.oxblood,
  fontWeight: "normal",
};

const label = {
  display: "block",
  marginBottom: "0.5rem",
};

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

export default function ReadPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle");
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
      <div style={pageStyle}>
        <main style={wrap}>
          <p>{message}</p>
        </main>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <main style={wrap}>
        <p>{reading.intro}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={label}>
              {form.nameLabel}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </label>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={label}>
              {form.emailLabel}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </label>
          </div>
          {reading.groups.map((group) => (
            <section key={group.id} style={{ marginBottom: "2.5rem" }}>
              <h2 style={heading}>{group.label}</h2>
              {group.questions.map((q) => (
                <div key={q.id} style={{ marginBottom: "1.5rem" }}>
                  <label style={label}>
                    {q.text}
                    <textarea
                      rows={q.rows}
                      value={answers[q.id] || ""}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </label>
                </div>
              ))}
            </section>
          ))}
          {status === "error" && message && <p role="alert">{message}</p>}
          <button type="submit" disabled={status === "submitting"} style={button}>
            {status === "submitting" ? form.submittingLabel : form.submitLabel}
          </button>
        </form>
      </main>
    </div>
  );
}
