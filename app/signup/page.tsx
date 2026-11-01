import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Customer Account Registration",
  description: "Customer account registration is not currently available.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return (
    <main className="bg-white py-24">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Customer Accounts"
          title="Account Registration Is Not Available Yet"
          description="You can still discuss your project or request a quotation by contacting our team."
        />

        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-lg">
          <p className="mb-6 text-slate-700">
            Customer accounts are not available at this time. Please contact us
            directly to discuss your manufacturing requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </main>
  );
}
