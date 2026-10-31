"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Upload,
  File,
  Trash2,
  User,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle";

interface RFQFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  material: string;
  quantity: string;
  process: string;
  tolerance: string;
  surfaceFinish: string;
  deliveryTime: string;
  projectDescription: string;
}

const materials = [
  "Aluminium",
  "Stainless Steel",
  "Mild Steel",
  "Brass",
  "Copper",
  "Titanium",
  "Plastic",
  "Other",
];

const processes = [
  "SSIpro Milling",
  "SSIpro Turning",
  "5-Axis Machining",
  "Surface Grinding",
  "Drilling",
  "Custom Manufacturing",
];

const tolerances = [
  "±0.005 mm",
  "±0.01 mm",
  "±0.05 mm",
  "±0.1 mm",
  "As Per Drawing",
];

const deliveryOptions = [
  "Urgent (<7 Days)",
  "1-2 Weeks",
  "2-4 Weeks",
  "Flexible",
];

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RFQFormData>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 10,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
      "application/octet-stream": [
        ".step",
        ".stp",
        ".iges",
        ".igs",
        ".dwg",
        ".dxf",
        ".stl",
        ".sldprt",
      ],
    },
  });

  const onSubmit = async (data: RFQFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "RFQ Submission",
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit RFQ.");
      }

      alert("RFQ Submitted Successfully!");
      reset();
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "There was a problem submitting your RFQ."
      );
    }
  };

  return (
    <section
      id="upload-form"
      className="bg-white py-20"
    >
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Request For Quotation"
          title="Upload Your Engineering Drawings"
          description="Complete the form below and upload your CAD drawings or technical documents. Our engineering team will review your project and respond within 24 hours."
        />

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl lg:p-12"
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
                  placeholder="ABC Engineering Pvt Ltd"
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

            {/* Material */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Material
              </label>

              <select
                {...register("material")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              >
                <option value="">Select Material</option>

                {materials.map((material) => (
                  <option
                    key={material}
                    value={material}
                  >
                    {material}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturing Process */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Manufacturing Process
              </label>

              <select
                {...register("process")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              >
                <option value="">Select Process</option>

                {processes.map((process) => (
                  <option
                    key={process}
                    value={process}
                  >
                    {process}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Quantity
              </label>

              <input
                type="number"
                min={1}
                placeholder="100"
                {...register("quantity")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Delivery Timeline */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Delivery Timeline
              </label>

              <select
                {...register("deliveryTime")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              >
                <option value="">
                  Select Delivery Timeline
                </option>

                {deliveryOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Tolerance */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Required Tolerance
              </label>

              <select
                {...register("tolerance")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              >
                <option value="">
                  Select Tolerance
                </option>

                {tolerances.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Surface Finish */}

            <div>
              <label className="mb-2 block font-semibold text-slate-900">
                Surface Finish
              </label>

              <input
                type="text"
                placeholder="Anodized, Powder Coating, Polished..."
                {...register("surfaceFinish")}
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500"
              />
            </div>
                        {/* Project Description */}

            <div className="lg:col-span-2">
              <label className="mb-2 block font-semibold text-slate-900">
                Project Description
              </label>

              <textarea
                rows={6}
                placeholder="Describe your project requirements, machining details, material specifications, tolerances, quantity, special instructions, etc."
                {...register("projectDescription")}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Drawing Upload */}

            <div className="lg:col-span-2">
              <label className="mb-4 block font-semibold text-slate-900">
                Upload CAD Drawings / Documents
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
                    : "Drag & Drop CAD Files"}
                </h3>

                <p className="mt-3 text-gray-600">
                  or click to browse files from your computer
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {[
                    "STEP",
                    "STP",
                    "IGES",
                    "DWG",
                    "DXF",
                    "PDF",
                    "STL",
                    "SLDPRT",
                  ].map((format) => (
                    <span
                      key={format}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Maximum 10 files • Maximum file size: 25 MB each
                </p>
              </div>
            </div>

            {/* Uploaded Files */}

            {files.length > 0 && (
              <div className="lg:col-span-2">
                <h3 className="mb-5 text-xl font-bold text-slate-900">
                  Uploaded Files
                </h3>

                <div className="space-y-4">
                  {files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-orange-100 p-3">
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
                        {/* NDA Notice */}

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Confidentiality & NDA
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Your engineering drawings, CAD files, and project
                  information remain strictly confidential. We never
                  share your files with third parties and can sign a
                  Non-Disclosure Agreement (NDA) upon request.
                </p>
              </div>
            </div>

            {/* Terms */}

            <div className="lg:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 accent-orange-500"
                />

                <span className="text-sm leading-7 text-gray-600">
                  I confirm that the information provided is accurate,
                  and I agree to be contacted regarding this quotation
                  request. I understand my uploaded files will be used
                  solely for quotation and manufacturing purposes.
                </span>
              </label>
            </div>

            {/* Submit */}

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? "Submitting RFQ..."
                  : "Submit RFQ Request"}
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Our engineering team will review your project and
                respond with a quotation within 24 business hours.
              </p>
            </div>

          </div>
        </motion.form>
      </div>
    </section>
  );
}