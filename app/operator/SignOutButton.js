"use client";

import { useRouter } from "next/navigation";
import { theme } from "../../lib/operator-theme";

export default function SignOutButton({ label }) {
  const router = useRouter();

  async function handleClick() {
    await fetch("/api/operator/logout", { method: "POST" });
    router.push("/operator/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleClick} className="operator-quiet-button" style={theme.quietButton}>
      {label}
    </button>
  );
}
