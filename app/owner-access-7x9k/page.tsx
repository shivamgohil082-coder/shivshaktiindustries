import { cookies } from "next/headers";
import { verifySessionToken, isAuthorizedOwnerRole, AUTH_COOKIE_NAME } from "@/lib/auth";
import OwnerLoginClient from "./OwnerLoginClient";
import OwnerDashboardClient from "./OwnerDashboardClient";

export default async function OwnerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isAuthenticated = !!(session && isAuthorizedOwnerRole(session.role));

  if (!isAuthenticated) {
    return <OwnerLoginClient />;
  }

  return <OwnerDashboardClient />;
}
