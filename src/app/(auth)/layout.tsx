import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

// Define the routes for each role
enum UserRole {
  SKIPPER = "SKIPPER",
  DRIVER = "DRIVER",
  MONITOR = "MONITOR",
  ADMIN = "ADMIN",
}

const roleRoutes: Record<UserRole, string> = {
  [UserRole.SKIPPER]: "/skipper/dashboard",
  [UserRole.DRIVER]: "/driver/dashboard",
  [UserRole.MONITOR]: "/monitor/dashboard",
  [UserRole.ADMIN]: "/admin/dashboard",
};

function toUserRole(role: string): UserRole | undefined {
  return Object.values(UserRole).includes(role as UserRole)
    ? (role as UserRole)
    : undefined;
}

export default async function RoleBasedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) {
    const userRole = toUserRole(user.role);

    if (userRole && userRole in roleRoutes) {
      redirect(roleRoutes[userRole]);
    } else {
      // Fallback route if role is not recognized
      console.warn(`Unrecognized user role: ${user.role}`);
      redirect("/");
    }
  }

  return <>{children}</>;
}
