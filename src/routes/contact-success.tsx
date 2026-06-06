import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter, Reveal } from "@/lib/site-shared";

export const Route = createFileRoute("/contact-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
    email: typeof search.email === "string" ? search.email : "",
    subject: typeof search.subject === "string" ? search.subject : "",
    message: typeof search.message === "string" ? search.message : "",
  }),
  head: () => ({
    meta: [
      { title: "Contact sent — Akanni Hannah Ibukun" },
      { name: "description", content: "Your message was sent successfully and is on its way." },
      { property: "og:title", content: "Contact sent — Akanni Hannah Ibukun" },
      { property: "og:description", content: "Thanks for your message. I'll reply as soon as possible." },
    ],
  }),
  component: ContactSuccessPage,
});

function ContactSuccessPage() {
  const { name, email, subject, message } = Route.useSearch();
  const hasResponse = Boolean(name || email || subject || message);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans">
      <SiteNav />
      <main className="pt-32 px-6 md:px-10 pb-24">
        <section className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-ink/5 p-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Message received</span>
            <h1 className="text-5xl md:text-6xl font-serif mt-3 mb-4">Thanks{ name ? `, ${name}` : "" }.</h1>
            <p className="text-ink/70 text-lg mb-10">
              Your message is on its way. Below is the information I received from the form.
            </p>
          </Reveal>

          {hasResponse ? (
            <div className="grid gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Name</div>
                <div className="text-lg text-ink">{name || "—"}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Email</div>
                <div className="text-lg text-ink">{email || "—"}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Subject</div>
                <div className="text-lg text-ink">{subject || "No subject provided."}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Message</div>
                <div className="whitespace-pre-line text-lg text-ink">{message || "No message provided."}</div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-lg text-ink/70">No form response was provided. Please submit the contact form first or return home.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/" search={{}} className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-glow">
              Home
            </Link>
            <Link to="/contact" search={{}} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">
              Send another message
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
