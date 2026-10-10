// The root <html lang="en"> is shared by every route; lang="ro" here marks the
// /ro subtree as Romanian, and hreflang alternates pair each page with its EN
// twin. ponytail: a full <html lang="ro"> needs route-group root layouts
// (moving every app/ route), worth it only if /ro grows.
export default function RoLayout({ children }: { children: React.ReactNode }) {
  return <div lang="ro">{children}</div>;
}
