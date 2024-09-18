import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) {
    redirect("/login");
  }

  // Check if the user has an admin role
  if (session.user.role !== "MONITOR") {
    redirect("/unauthorized");
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
