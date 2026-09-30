export function PlaceholderPage({ title }: { title: string }) {
  return <main className="flex-1 overflow-y-auto bg-bg" style={{ padding: 'clamp(1.25rem, 2vw, 2.5rem)' }}>
    <h1 className="text-xl font-semibold">{title}</h1>
  </main>
}
