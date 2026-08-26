"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import content from "../../../content.json";
import { theme } from "../../../lib/operator-theme";

const { login } = content.operator;

export default function OperatorLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    let ok = false;
    try {
      const res = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }

    if (!ok) {
      setSubmitting(false);
      setError(login.errorLabel);
      return;
    }

    router.push("/operator");
    router.refresh();
  }

  return (
    <main style={theme.page}>
      <div style={theme.narrowContainer}>
        <h1 style={{ ...theme.heading, marginBottom: "2.5rem" }}>{login.heading}</h1>
        <form onSubmit={handleSubmit}>
          <label style={theme.label}>
            {login.passwordLabel}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              style={theme.input}
            />
          </label>

          {error && <p style={theme.errorText}>{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="operator-quiet-button"
            style={{ ...theme.quietButton, marginTop: "0.5rem" }}
          >
            {submitting ? login.submittingLabel : login.submitLabel}
          </button>
        </form>
      </div>
    </main>
  );
}
