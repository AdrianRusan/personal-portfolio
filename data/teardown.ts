// /teardown copy: the page and its Markdown (lib/markdown) both read this.
export const teardown = {
  title:
    "Free AI Code Teardown — a 15-min Loom of what your AI-generated code is hiding",
  description:
    "Send a repo or PR. Get a free 15-minute Loom of the security bugs your AI coding tools wrote that pass tests and merge anyway. No call, no pitch.",
  eyebrow: "Free · no call",
  heading:
    "Send me a repo. I'll show you what your AI-generated code is hiding.",
  intro:
    "A free 15-minute Loom of a repo or a recent PR, showing the security bugs that pass your tests and merge anyway. No call. I only need your email.",
  // R2-F20. The 30-PR repo had no tests, so the line makes no claim about tests.
  proof:
    "On my own 30-PR run, review caught 3 shell-injection paths before merge.",
  // Answers the objections that stop the form being sent.
  trustNotes: [
    "Private repo? Paste the link anyway. I'll reply asking for read-only access, and you can remove it once the Loom is sent.",
    "Need an NDA first? Say so in the note and I'll sign yours before I look.",
    "Your code and the findings stay between us. Nothing is published or reused.",
  ],
  steps: [
    "Paste a repo or PR link above: something real you've shipped with Copilot, Cursor or Claude Code.",
    "I run the security review every sprint PR gets (injection, auth, secrets, access control) and assume the agent got it wrong until the code shows otherwise.",
    "Within 2–3 business days you get a ~15-minute Loom of what I found. If I find nothing serious, the Loom says so.",
  ],
  whyHeading: "Why is this free?",
  why: "A 15-minute video of real bugs in your own code is the best sales pitch I have. If you want them fixed, we can talk about a sprint. If not, keep the video.",
};
