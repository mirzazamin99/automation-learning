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
    <main className="operator-login-screen" style={theme.loginScreen}>
      <div className="operator-login-left" style={theme.loginLeftPanel}>
        <h1 style={theme.loginPanelTitle}>{login.panelTitle}</h1>
        <p style={theme.loginPanelDescriptor}>{login.tagline}</p>
      </div>

      <div style={theme.loginRightPanel}>
        <div style={theme.loginFormWrap}>
          <h2 style={theme.signInHeading}>{login.heading}</h2>
          <form onSubmit={handleSubmit}>
            <label style={theme.loginLabel}>
              {login.passwordLabel}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoFocus
                className="operator-input"
                style={theme.loginInput}
              />
            </label>

            {error && <p style={theme.errorText}>{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="operator-primary-button"
              style={{ ...theme.primaryButton, ...theme.loginSubmitButton }}
            >
              {submitting ? login.submittingLabel : login.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
