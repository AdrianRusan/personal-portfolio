import type { Metadata } from "next";
import { RootShell } from "./root-shell";
import NotFound, { metadata as notFoundMetadata } from "./(en)/not-found";

// D1: no single root layout any more, so a URL that matches no route group
// renders here. Same page as the in-group 404, inside the EN shell.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.adrian-rusan.com"),
  ...notFoundMetadata,
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFound />
    </RootShell>
  );
}
