"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import content from "../../../content.json";
import ThemeToggle from "../../components/ThemeToggle";

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
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[400px]">
        <p className="text-center font-display text-lg text-foreground">{login.panelTitle}</p>
        <p className="mt-1.5 text-center text-sm text-foreground-faint">{login.tagline}</p>

        <h1 className="mt-10 text-center font-display text-2xl font-medium text-foreground">
          {login.heading}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground-dim">
              {login.passwordLabel}
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoFocus
              className="block w-full rounded-xl border border-edge bg-surface px-4 py-3 text-base text-foreground focus-visible:border-accent-hover"
            />
          </label>

          {error && (
            <p role="alert" className="mt-3 text-sm font-medium text-accent-text">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-accent px-8 py-3.5 text-[0.95rem] font-medium tracking-wide text-paper shadow-[0_14px_28px_-12px_rgba(130,35,47,0.5)] transition-all duration-300 ease-out hover:bg-accent-hover disabled:opacity-60"
          >
            {submitting ? login.submittingLabel : login.submitLabel}
          </button>
        </form>
      </div>
    </main>
  );
}
