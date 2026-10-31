"use client";

import { ArrowRight, Upload } from "lucide-react";
import Button from "@/components/common/Button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">

      <Button
        disabled
        className="group opacity-50 cursor-not-allowed"
      >
        Request a Quote

        <ArrowRight
          size={18}
          className="ml-2 transition group-hover:translate-x-1"
        />

      </Button>

      <Button
        disabled
        variant="secondary"
        className="opacity-50 cursor-not-allowed"
      >
        <Upload size={18} className="mr-2" />

        Upload Drawing

      </Button>

    </div>
  );
}