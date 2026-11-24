"use client";

// PROTOTYPE, throwaway (branch prototype/ro-non-tech). Floating bar that cycles
// ?variant= on the current route. Hidden in production builds.
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PrototypeSwitcher({
  variants,
}: {
  variants: { key: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("variant") ?? variants[0]!.key;
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  );

  const go = (step: number) => {
    const next = variants[(index + step + variants.length) % variants.length]!;
    router.replace(`${pathname}?variant=${next.key}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (
    process.env.NODE_ENV === "production" &&
    !process.env.NEXT_PUBLIC_PROTOTYPE
  )
    return null;

  const v = variants[index]!;
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-accent bg-ink px-4 py-2 font-mono text-sm text-page shadow-xl">
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Varianta anterioară"
      >
        ←
      </button>
      <span>
        PROTOTIP {v.key} ({v.name})
      </span>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Varianta următoare"
      >
        →
      </button>
    </div>
  );
}
