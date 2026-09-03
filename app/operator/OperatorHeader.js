import SignOutButton from "./SignOutButton";
import ThemeToggle from "../components/ThemeToggle";

export default function OperatorHeader({ label }) {
  return (
    <header className="border-b border-edge">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-lg text-foreground md:text-xl">
            Dr. Aamir
          </span>
          <span className="text-sm font-medium text-foreground-faint">
            Operator
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {label && <SignOutButton label={label} />}
        </div>
      </div>
    </header>
  );
}
