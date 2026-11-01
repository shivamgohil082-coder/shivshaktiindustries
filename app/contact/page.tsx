"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  X,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Mail,
} from "lucide-react";
import Button from "@/components/common/Button";

/* ── Company config ─────────────────────────────────── */
const COMPANY = {
  name: "Shiv Shakti Industries",
  phone: "+91 92136 62579",
  phoneTel: "+919213662579",
  email: "info@shivshaktiindustries.org",
  rfqEmail: "rfq@shivshaktiindustries.org",
  whatsapp: "919213662579",
  whatsappDisplay: "+91 92136 62579",
  instagram: "https://www.instagram.com/shiv.shakti.industries?mdxt=MzhhNjlxYXFzbGRi&utm_source=qr",
  linkedin: "https://www.linkedin.com/company/shiv-shaktiindustries/",
};

/* ── WhatsApp Preset Quick Messages ─────────────────── */
const WHATSAPP_PRESETS = [
  {
    id: "quote",
    label: "Request a Quote (RFQ)",
    icon: "📋",
    message:
      "Hello! I am interested in your CNC machining services. Could you please provide more information?"
  },
  {
    id: "drawing",
    label: "CAD / Drawing Review",
    icon: "📐",
    message:
      "Hello! I have technical drawings / 3D CAD models ready for review. Could your engineering team evaluate machining feasibility and lead time?",
  },
  {
    id: "urgent",
    label: "Urgent Production",
    icon: "⚡",
    message:
      "Hello! I have an urgent batch manufacturing requirement. Are you currently accepting expedited production runs?",
  },
  {
    id: "general",
    label: "General Inquiry",
    icon: "💬",
    message:
      "Hello! I am interested in your precision machining and custom manufacturing capabilities. Could you share more information?",
  },
];

/* ── SVG Brand Icons ────────────────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

/* ── WhatsApp Modal ─────────────────────────────────── */
function WhatsAppModal({
  initialMessage,
  onClose,
}: {
  initialMessage?: string;
  onClose: () => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState<string>("quote");
  const [message, setMessage] = useState<string>(
    initialMessage || WHATSAPP_PRESETS[0].message
  );

  const handleSelectPreset = (preset: (typeof WHATSAPP_PRESETS)[0]) => {
    setSelectedPreset(preset.id);
    setMessage(preset.message);
  };

  const handleContinue = () => {
    const finalMsg = message.trim() || WHATSAPP_PRESETS[0].message;
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
      finalMsg
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Top Accent Header */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-sm">
                <WhatsAppIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                  <span className="flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-semibold tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium">
                  Shiv Shakti Industries • Engineering Desk
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Quick topic picker */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Select inquiry topic
            </p>
            <div className="grid grid-cols-2 gap-2">
              {WHATSAPP_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all ${
                    selectedPreset === preset.id
                      ? "border-[#25D366] bg-green-50 text-emerald-900 shadow-sm ring-1 ring-[#25D366]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{preset.icon}</span>
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editable message box */}
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Message preview
              </label>
              <span className="text-[11px] text-gray-400">
                You can edit before sending
              </span>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSelectedPreset("");
              }}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 text-sm text-gray-800 placeholder-gray-400 transition focus:border-[#25D366] focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="Type your message here..."
            />
          </div>

          {/* Quick assurance info */}
          <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-3.5 py-2.5 text-xs text-gray-500 border border-gray-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-emerald-600" />
              Typically replies in minutes
            </span>
            <span className="font-semibold text-gray-700">
              {COMPANY.whatsappDisplay}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white hover:bg-[#20ba59] transition-all shadow-md shadow-green-200 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Open in WhatsApp
              <ExternalLink size={14} className="opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
    website: "", // hidden bot trap
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceNo, setReferenceNo] = useState("");
  const [error, setError] = useState("");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [whatsAppInitialMessage, setWhatsAppInitialMessage] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const product = params.get("product");
      if (product) {
        setFormData((prev) => ({
          ...prev,
          subject: "Request for Quotation (RFQ)",
          message: prev.message || `I would like to request an engineering quotation and lead time estimate for: ${product}.`,
        }));
      }
    }
  }, []);

  const openWhatsAppWith = (customMessage?: string) => {
    if (customMessage) {
      setWhatsAppInitialMessage(customMessage);
    } else {
      setWhatsAppInitialMessage("");
    }
    setShowWhatsApp(true);
  };

  const handleOpenWhatsAppFromForm = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const parts: string[] = [];

    parts.push("Hello Shiv Shakti Industries!");
    if (fullName) {
      parts.push(`My name is ${fullName}${formData.phone ? ` (Phone: ${formData.phone})` : ""}.`);
    }
    parts.push(`Regarding: ${formData.subject}.`);
    if (formData.message.trim()) {
      parts.push(`Message: ${formData.message.trim()}`);
    } else {
      parts.push("I would like to speak with an engineer about machining services.");
    }

    openWhatsAppWith(parts.join(" "));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        if (data.reference) {
          setReferenceNo(data.reference);
        }
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
          website: "",
        });
      } else {
        const referenceMessage = data.reference
          ? ` Reference: ${data.reference}.`
          : "";
        setError(`${data.error || "Something went wrong."}${referenceMessage}`);
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen relative">
      {/* WhatsApp Interactive Modal */}
      {showWhatsApp && (
        <WhatsAppModal
          initialMessage={whatsAppInitialMessage}
          onClose={() => setShowWhatsApp(false)}
        />
      )}

      {/* ── Header ───────────────────────────────────── */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            Visit our factory, send us an RFQ inquiry, or connect instantly with
            our sales engineering team via WhatsApp.
          </p>
        </div>
      </section>

      {/* ── Main Grid ────────────────────────────────── */}
      <section className="container-custom mt-8 sm:mt-12 md:mt-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT — Info Cards */}
          <div className="flex flex-col gap-6">
            {/* Row 1 — Address + Hours */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Address */}
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-secondary">Factory Address</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  C1-677, Makarpura GIDC, Vadodara, 390010
                  <br />
                  Gujarat, India
                </p>
              </div>

              {/* Working Hours */}
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-secondary">Working Hours</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Monday – Saturday
                  <br />
                  09:00 AM – 06:30 PM
                  <br />
                  <span className="mt-1 inline-block font-semibold text-primary">
                    Sunday: Closed
                  </span>
                </p>
              </div>
            </div>

            {/* Row 2 — Phone and Direct WhatsApp Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Phone Card */}
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
                aria-label="Call us"
              >
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-100/40 transition-transform duration-500 group-hover:scale-150" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-400">
                  Phone Desk
                </p>
                <p className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {COMPANY.phone}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Call now <ArrowRight size={14} />
                </span>
              </a>

              {/* WhatsApp Quick Card */}
              <button
                type="button"
                onClick={() => openWhatsAppWith()}
                className="group relative text-left overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200"
                aria-label="Chat on WhatsApp"
              >
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-100/40 transition-transform duration-500 group-hover:scale-150" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500">
                  WhatsApp Direct
                </p>
                <p className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {COMPANY.whatsappDisplay}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  Start chat <ArrowRight size={14} />
                </span>
              </button>
            </div>

            {/* ── Social Media & Quick Messaging Box ─────────────────────── */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-secondary">
                  Connect With Us
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Fast response on WhatsApp
                </span>
              </div>
              <p className="mb-5 text-sm text-gray-500">
                Choose your preferred channel for quotes, drawings, or general questions.
              </p>

              {/* 3 Channels Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Instagram */}
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram page"
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-[#C13584] hover:border-[#C13584] hover:shadow-lg hover:shadow-pink-100 hover:-translate-y-1"
                >
                  <span className="text-[#C13584] group-hover:text-white transition-colors">
                    <InstagramIcon />
                  </span>
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-white transition-colors">
                    Instagram
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={COMPANY.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1"
                >
                  <span className="text-[#0A66C2] group-hover:text-white transition-colors">
                    <LinkedInIcon />
                  </span>
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-white transition-colors">
                    LinkedIn
                  </span>
                </a>

                {/* WhatsApp Quick Link */}
                <button
                  type="button"
                  onClick={() => openWhatsAppWith()}
                  aria-label="Chat with us on WhatsApp"
                  className="group flex flex-col items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 transition-all hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-lg hover:shadow-green-100 hover:-translate-y-1"
                >
                  <span className="text-[#25D366] group-hover:text-white transition-colors">
                    <WhatsAppIcon />
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 group-hover:text-white transition-colors">
                    WhatsApp
                  </span>
                </button>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-secondary">
                  Email Desks
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/70">
                    <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-blue-100/60" />
                    <div className="relative">
                      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <Send className="h-6 w-6" />
                      </span>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-500">
                        RFQ &amp; Quotes
                      </p>
                      <a
                        href={`mailto:${COMPANY.rfqEmail}`}
                        className="mt-2 block break-all text-base font-bold text-secondary hover:text-blue-700"
                      >
                        {COMPANY.rfqEmail}
                      </a>
                      <a
                        href={`mailto:${COMPANY.rfqEmail}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2.5"
                      >
                        Send an RFQ <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100/70">
                    <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-orange-100/70" />
                    <div className="relative flex h-full flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                          General &amp; Careers
                        </p>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                          <Mail className="h-5 w-5" />
                        </span>
                      </div>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="break-all text-base font-bold text-secondary hover:text-orange-700"
                      >
                        {COMPANY.email}
                      </a>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-orange-600 transition-all group-hover:gap-2.5"
                      >
                        Email our team <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Card 
            <div className="h-56 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 relative group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Makarpura+GIDC,Vadodara,Gujarat,India&zoom=14&size=800x400&maptype=roadmap&markers=color:red%7Clabel:S%7C22.2570,73.1950')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 shadow-lg font-bold text-sm text-secondary">
                View on Google Maps
              </div>
            </div>*/}
          </div>

          {/* RIGHT — Inquiry Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-secondary">
                    Send an Inquiry
                  </h2>
                  <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-500">
                    Fill out the form below or start an instant conversation on
                    WhatsApp.
                  </p>
                </div>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <CheckCircle className="text-green-500 mb-4 h-16 w-16" />
                  <h3 className="text-2xl font-bold text-secondary mb-1">
                    Message Sent!
                  </h3>
                  {referenceNo && (
                    <div className="mb-3 px-3 py-1 rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-700">
                      Tracking Ref: {referenceNo}
                    </div>
                  )}
                  <p className="text-gray-600 mb-6 max-w-md">
                    Our sales engineering team has received your inquiry and will
                    respond via email or phone shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <Button
                      onClick={() => setSuccess(false)}
                      className="flex-1"
                    >
                      Send Another Message
                    </Button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsAppWith(
                          "Hello! I just submitted an inquiry on your website and would like to follow up directly."
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#20ba59] transition-all shadow-md shadow-green-100"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Follow Up on WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        First Name
                      </label>
                      <input
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Last Name
                      </label>
                      <input
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email Address
                      </label>
                      <input
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        type="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Phone Number
                      </label>
                      <input
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        type="tel"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                    >
                      <option>General Inquiry</option>
                      <option>Request for Quotation (RFQ)</option>
                      <option>Job / Career Application</option>
                      <option>Supplier / Vendor Proposal</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Describe your components, drawings, materials, quantities, or question..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-semibold">{error}</p>
                  )}

                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-base font-bold flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Send Message via Email
                        </>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-4 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Or instant response
                      </span>
                    </div>

                    {/* Direct WhatsApp Button in Form */}
                    <button
                      type="button"
                      onClick={handleOpenWhatsAppFromForm}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] py-3.5 px-4 font-bold text-white transition-all shadow-md shadow-green-100 hover:shadow-lg hover:shadow-green-200 active:scale-[0.99]"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                    <p className="text-center text-[11px] text-gray-400">
                      Quick quotes • CAD drawings • Direct engineer response
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating WhatsApp Action Button ────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Tooltip / Prompt Badge */}
        <button
          type="button"
          onClick={() => openWhatsAppWith()}
          className="hidden md:flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-xl border border-gray-200 hover:border-[#25D366] transition-all hover:-translate-y-0.5"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Need quick quote? Chat on WhatsApp</span>
        </button>

        {/* Floating Circle Button */}
        <button
          type="button"
          onClick={() => openWhatsAppWith()}
          aria-label="Open WhatsApp Chat"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-400/50 hover:bg-[#20ba59] transition-all hover:-translate-y-1 active:translate-y-0"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          <WhatsAppIcon className="h-7 w-7 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </main>
  );
}
