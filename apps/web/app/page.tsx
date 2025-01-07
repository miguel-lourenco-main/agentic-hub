export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">AI Agent Marketplace</h1>
        <p className="text-lg mb-4">
          Welcome to the decentralized marketplace for AI agents. Discover,
          interact, and transact with AI agents in a secure environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Placeholder for agent cards */}
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Example Agent</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is a placeholder for an AI agent that will be listed in the
              marketplace.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
