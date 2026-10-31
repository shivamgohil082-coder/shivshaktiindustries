"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import {
  User,
  Building2,
  Mail,
  Phone,
  File,
  Trash2,
  Upload,
  MessageSquare,
} from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle";

interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
}

const inquiryTypes = [
  "General Inquiry",
  "Request Quotation",
  "Prototype Manufacturing",
  "Production Manufacturing",
  "SSIpro Turning",
  "SSIpro Milling",
  "VMC Machining",
  "Reverse Engineering",
  "Quality Support",
  "Technical Consultation",
  "Career Opportunity",
  "Other",
];

export default function ContactForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
    maxSize: 15 * 1024 * 1024,

    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
      "application/octet-stream": [".step", ".stp"],
      "application/sla": [".stl"],
      "application/vnd.dxf": [".dxf"],
      "image/vnd.dwg": [".dwg"],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Contact Inquiry",
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      alert("Your message has been sent successfully!");

      reset();
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "There was a problem sending your message."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      suppressHydrationWarning
      id="contact-form"
      className="bg-white py-24"
    >
      <div className="container mx-auto px-6">

        <SectionTitle
          badge="Send an Inquiry"
          title="Let's Discuss Your Project"
          subtitle="Fill out the form below and our engineering team will contact you within one business day."
          center
        />

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-16 max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-2">
                      {/* Full Name */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Full Name *
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="John Smith"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />
              </div>

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Company */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Company Name
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="ABC Engineering Pvt. Ltd."
                  {...register("company")}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Email Address *
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Phone Number *
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />
              </div>

              {errors.phone && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Inquiry Type */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Inquiry Type *
              </label>

              <select
                {...register("inquiryType", {
                  required: "Please select an inquiry type",
                })}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              >
                <option value="">
                  Select Inquiry Type
                </option>

                {inquiryTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              {errors.inquiryType && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.inquiryType.message}
                </p>
              )}
            </div>

            {/* Subject */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Subject *
              </label>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Need quotation for SSIpro machined parts"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                />
              </div>

              {errors.subject && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>
                        {/* Message */}

            <div className="lg:col-span-2">
              <label className="mb-2 block font-semibold text-slate-900">
                Message *
              </label>

              <textarea
                rows={7}
                placeholder="Tell us about your project requirements, machining process, quantity, delivery timeline, technical questions, or any additional information..."
                {...register("message", {
                  required: "Please enter your message",
                  minLength: {
                    value: 20,
                    message: "Message should contain at least 20 characters",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-orange-500"
              />

              {errors.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Attachment Upload */}

            <div className="lg:col-span-2">
              <label className="mb-4 block font-semibold text-slate-900">
                Attach Files (Optional)
              </label>

              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
                  isDragActive
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
                }`}
              >
                <input {...getInputProps()} />

                <Upload
                  size={60}
                  className="mx-auto text-orange-500"
                />

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {isDragActive
                    ? "Drop your files here"
                    : "Drag & Drop Attachments"}
                </h3>

                <p className="mt-3 text-gray-600">
                  or click to browse files
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {[
                    "PDF",
                    "JPG",
                    "PNG",
                    "ZIP",
                    "STEP",
                    "STP",
                    "DWG",
                    "DXF",
                    "STL",
                  ].map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Maximum 5 files • Maximum size 15 MB each
                </p>
              </div>
            </div>

            {/* Uploaded Files */}

            {files.length > 0 && (
              <div className="lg:col-span-2">
                <h3 className="mb-5 text-xl font-bold text-slate-900">
                  Attached Files
                </h3>

                <div className="space-y-4">
                  {files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-orange-100 p-3">
                          <File
                            size={24}
                            className="text-orange-600"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {file.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
                    {/* Privacy Notice */}

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Privacy & Confidentiality
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  We respect your privacy. Any information, drawings,
                  documents, or files shared through this contact form
                  are treated as strictly confidential and are used only
                  for evaluating your inquiry and communicating with you.
                  We never disclose your information to third parties
                  without your permission.
                </p>
              </div>
            </div>

            {/* Terms & Consent */}

            <div className="lg:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 accent-orange-500"
                />

                <span className="text-sm leading-7 text-slate-600">
                  I agree that the information provided above is accurate
                  and consent to being contacted regarding my inquiry. I
                  understand that my uploaded files and personal details
                  will only be used to respond to this request.
                </span>
              </label>
            </div>

            {/* Submit Button */}

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? "Sending Message..."
                  : "Send Message"}
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                Our engineering team typically replies within
                <span className="font-semibold text-slate-700">
                  {" "}24 business hours
                </span>
                .
              </p>
            </div>

          </div>
        </motion.form>
      </div>
    </section>
  );
}