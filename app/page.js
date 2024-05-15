import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Github, Linkedin } from "lucide-react";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/user/login");
  }

  return (
    <main className="h-full px-8 py-4">
      <p>
        Streamline your document review process with effortless clarity. Create
        custom pipelines to guide your documents through a seamless approval
        chain. Assign reviewers, track progress, and receive instant
        notifications – all within a beautifully intuitive interface. Never lose
        track of a document again, and ensure every step of your approval
        process is efficient and transparent.
      </p>
      <div className="p-4 space-x-2">
        <Button>
          <a
            href="https://github.com/Devzard/document-tracking-app"
            target="_blank"
          >
            <Github />
          </a>
        </Button>

        <Button>
          <a
            href="https://www.linkedin.com/in/debashish-gogoi-devzard/"
            target="_blank"
          >
            <Linkedin />
          </a>
        </Button>
      </div>
    </main>
  );
}
