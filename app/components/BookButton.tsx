type BookButtonProps = {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
};

export default function BookButton({
  className = "",
  compact = false,
  onClick,
}: BookButtonProps) {
  return (
    <a
      href="mailto:hello@draamir.com?subject=Consultation%20Request"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-accent font-body font-medium tracking-wide text-paper shadow-[0_14px_28px_-12px_rgba(130,35,47,0.5)] transition-all duration-300 ease-out hover:bg-accent-hover hover:shadow-[0_18px_34px_-10px_rgba(154,44,58,0.55)] active:bg-accent-press ${compact ? "px-4 py-2 text-[0.8rem]" : "px-8 py-4 text-[0.95rem]"} ${className}`}
    >
      Book a Consultation
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </a>
  );
}
