import { cookies } from "next/headers";
import { verifySessionToken, isAuthorizedOwnerRole, AUTH_COOKIE_NAME } from "@/lib/auth";
import OwnerDashboardLayoutClient from "./OwnerDashboardLayoutClient";

export default async function OwnerPortalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isAuthenticated = !!(session && isAuthorizedOwnerRole(session.role));

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return <OwnerDashboardLayoutClient>{children}</OwnerDashboardLayoutClient>;
}
