import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/user/login");
  }

  return (
    <div className="flex h-full w-full justify-center p-2">{children}</div>
  );
}
