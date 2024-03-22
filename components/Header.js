import { signOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";

export default async function Header() {
  return (
    <div className="flex flex-row-reverse px-4 py-2">
      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
}
