import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../SessionProvider";
import AdminNavbar from "./_components/Navbar";

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
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <SessionProvider value={session}>
      <div className="mx-auto flex min-h-screen flex-col">
        <AdminNavbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
