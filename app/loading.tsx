export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <h2 className="text-base font-semibold text-gray-700 tracking-wide">
          Loading...
        </h2>
      </div>
    </main>
  );
}
