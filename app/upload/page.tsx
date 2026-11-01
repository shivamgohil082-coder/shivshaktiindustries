import { permanentRedirect } from "next/navigation";

// Keep CAD uploads disabled and send visitors to the working inquiry form.
// To re-enable, restore the original file contents from version control.
export default function UploadPage() {
  permanentRedirect("/contact");
}