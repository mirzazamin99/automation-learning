"use client";

import { useState } from "react";

export default function ReplyBox({ submissionId, initialReplied, initialRepliedAt, initialReplyBody }) {
  const [replyText, setReplyText] = useState(initialReplyBody || "");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [replied, setReplied] = useState(initialReplied);
  const [repliedAt, setRepliedAt] = useState(initialRepliedAt);
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!replyText.trim()) return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/operator/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, replyText }),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(result.error || "Could not send.");
        return;
      }
      setReplied(true);
      setRepliedAt(new Date().toISOString());
      setStatus("idle");
      if (result.emailSent === false) {
        setMessage("Saved, but the email could not be delivered.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  }

  return (
    <div className="mt-6 max-w-[600px]">
      <p className="text-sm font-medium text-foreground-dim">Write a personal reply</p>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={6}
        placeholder="Write to them directly, in your own words."
        className="mt-2 block w-full rounded-xl border border-edge bg-surface px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-foreground-faint focus-visible:border-accent-hover"
      />
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={handleSend}
          disabled={status === "sending" || !replyText.trim()}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium tracking-wide text-paper shadow-[0_14px_28px_-12px_rgba(130,35,47,0.5)] transition-all duration-300 ease-out hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : replied ? "Send again" : "Send"}
        </button>
        {replied && (
          <span className="text-sm font-medium text-foreground-dim">
            Sent{repliedAt ? ` · ${new Date(repliedAt).toLocaleDateString("en-IN")}` : ""}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm font-medium text-accent-text">{message}</span>
        )}
      </div>
    </div>
  );
}
