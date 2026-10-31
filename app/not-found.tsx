export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
    </main>
  );
}
