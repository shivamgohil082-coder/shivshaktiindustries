import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">

      <div className="container-custom grid gap-10 py-16 md:grid-cols-3 lg:grid-cols-3">

        <div>
          <h2 className="mb-4 text-2xl font-bold">
            SHIV SHAKTI INDUSTRIES
          </h2>

          <p className="text-gray-300">
            Precision CNC & VMC Machining, Custom Sheet Metal Works, Parts Assembly, and Engineering Solutions.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Contact
          </h3>

          <p className="text-sm font-semibold text-gray-400">Address</p>
          <p className="mb-3 text-sm">C1-677, Makarpura GIDC, Vadodara, 390010, Gujarat, India</p>

          <p className="text-sm font-semibold text-gray-400">Email Desks</p>
          <div className="mb-3 space-y-1.5 text-sm">
            <div>
              <span className="text-xs text-gray-400 block">RFQ & Quotes:</span>
              <a
                href="mailto:rfq@shivshaktiindustries.org"
                className="text-white hover:text-primary transition-colors hover:underline"
              >
                rfq@shivshaktiindustries.org
              </a>
            </div>
            <div>
              <span className="text-xs text-gray-400 block">General & Careers:</span>
              <a
                href="mailto:info@shivshaktiindustries.org"
                className="text-white hover:text-primary transition-colors hover:underline"
              >
                info@shivshaktiindustries.org
              </a>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-400">Phone</p>
          <p className="text-sm">
            <a href="tel:+919213662579" className="text-white hover:text-primary transition-colors">
              +91 92136 62579
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Products
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>CNC Machined Components</li>
            <li>CNC Turned Components</li>
            <li>Sheet Metal Parts</li>
            <li>Fabricated Assemblies</li>
            <li>Plastic Injection Moulded Parts</li>
            <li>Custom-Made Assemblies</li>
            <li>Metal Castings</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-sm">
        © 2026 SHIV SHAKTI INDUSTRIES. All Rights Reserved.
      </div>
    </footer>
  );
}
