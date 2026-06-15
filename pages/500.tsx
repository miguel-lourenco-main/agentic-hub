// Pages Router fallback for static export hosts that serve 500.html on server errors.
export default function Custom500() {
  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>500 - Server Error</h1>
      <p>Something went wrong.</p>
    </main>
  );
}


