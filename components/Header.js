import { signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/ThemeButton";

export default async function Header() {
  return (
    <div className="bg-background flex flex-row-reverse gap-4 px-4 py-2">
      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
      <ThemeButton />
    </div>
  );
}
