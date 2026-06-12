// Fallback 404 for static export hosts that serve pages/ instead of app/not-found.
export default function Custom404() {
  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>404 - Page Not Found</h1>
      <p>This page could not be found.</p>
    </main>
  );
}


