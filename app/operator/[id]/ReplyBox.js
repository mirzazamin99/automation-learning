"use client";
import { useState } from "react";
import { theme } from "../../../lib/operator-theme";

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
    <div style={{ marginTop: "1.25rem", maxWidth: 600 }}>
      <p style={theme.fieldLabelText}>Write a personal reply</p>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows={6}
        style={theme.textarea}
        placeholder="Write to them directly, in your own words."
      />
      <div style={{ marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={handleSend}
          disabled={status === "sending" || !replyText.trim()}
          className="operator-primary-button"
          style={theme.primaryButton}
        >
          {status === "sending" ? "Sending" : replied ? "Send again" : "Send"}
        </button>
        {replied && (
          <span style={{ ...theme.sentLabel, marginLeft: "0.75rem" }}>
            Sent{repliedAt ? ` · ${new Date(repliedAt).toLocaleDateString("en-IN")}` : ""}
          </span>
        )}
        {status === "error" && (
          <span style={{ ...theme.errorText, marginLeft: "0.75rem" }}>{message}</span>
        )}
      </div>
    </div>
  );
}
