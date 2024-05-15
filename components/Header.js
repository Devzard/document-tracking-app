import { signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/ThemeButton";

import { getUser } from "@/actions/user.action";

export default async function Header({ sessionData }) {
  const user = await getUser(sessionData.user.id);

  return (
    <div className="bg-background justify-end items-center flex h-full flex-row gap-4 px-4 py-2">
      <div className="h-full text-sm flex items-center justify-center">
        <span>
          {user.data?.name} (<em>{user.data?.email}</em>)
        </span>
      </div>

      <ThemeButton />

      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
