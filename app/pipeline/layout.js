import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PipelineLayout({ children }) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/user/login");
  }
  return <div className="h-full p-2">{children}</div>;
}
