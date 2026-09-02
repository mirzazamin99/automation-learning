"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton({ label }) {
  const router = useRouter();

  async function handleClick() {
    await fetch("/api/operator/logout", { method: "POST" });
    router.push("/operator/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-edge px-4 py-2 text-sm font-medium text-foreground-dim transition-colors duration-300 ease-out hover:border-accent-hover hover:text-foreground"
    >
      {label}
    </button>
  );
}
