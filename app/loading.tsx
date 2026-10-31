import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">

        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />

        <h2 className="text-xl font-semibold">
          Loading...
        </h2>

      </div>
    </main>
  );
}
