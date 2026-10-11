// /teardown copy: the page and its Markdown (lib/markdown) both read this.
export const teardown = {
  title:
    "Free AI Code Teardown — a 15-min Loom of what your AI-generated code is hiding",
  description:
    "Send a repo or PR. Get a free 15-minute Loom of the security bugs your AI coding tools wrote that pass tests and merge anyway. No call, no pitch.",
  eyebrow: "Free · async · no call",
  heading:
    "Send me a repo. I'll show you what your AI-generated code is hiding.",
  intro:
    "A free, 15-minute Loom teardown of a repo or a recent PR — the security bugs that pass your tests and merge anyway. On my own agent-written code, review caught shell-injection paths that nothing else was checking for. No call, no pitch, no signup beyond your email.",
  // Answers the objections that stop the form being sent.
  trustNotes: [
    "Private repo? Paste the link anyway. I'll reply asking for read-only access, and you can remove it once the Loom is sent.",
    "Need an NDA first? Say so in the note and I'll sign yours before I look.",
    "Your code and the findings stay between us. Nothing is published or reused.",
  ],
  steps: [
    "Paste a repo or PR link above — something real you've shipped with Copilot, Cursor, or Claude Code.",
    "I run the same adversarial security review every sprint PR gets — injection, auth, secrets, access control — assuming the agent got it wrong until it's proven right.",
    "You get a ~15-minute Loom walking through exactly what I found, usually within 2–3 business days. Free.",
  ],
  whyHeading: "Why is this free?",
  why: "Because showing you beats telling you. Most AI-code pitches claim they catch bugs; this one hands you the bugs, in your own code, for nothing. If it's useful, we can talk about shipping your backlog this way — agent-speed delivery with every PR reviewed before it reaches you. If not, you keep the teardown and we both move on.",
};
