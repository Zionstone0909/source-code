import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Github, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { SiteNav, SiteFooter, Reveal } from "@/lib/site-shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Akanni Hannah Ibukun" },
      { name: "description", content: "Get in touch to start a web, mobile, or automation project." },
      { property: "og:title", content: "Contact Akanni Hannah Ibukun" },
      { property: "og:description", content: "Drop a message — replies within 24h." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!email || email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!message || message.trim() === "") {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    if (!validateForm(fd)) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject") || undefined,
          message: fd.get("message"),
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || response.statusText || "Failed to send message");
      }

      const name = fd.get("name");
      toast.success(`Thanks ${name}! I'll reply within 24h.`);
      navigate({
        to: "/contact-success",
        search: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          subject: String(fd.get("subject") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setErrors({});
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans">
      <SiteNav />
      <main className="pt-32">
        <section className="px-6 md:px-10 py-24 bg-ink text-canvas">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Get in touch</span>
              <h1 className="text-5xl md:text-7xl font-serif mt-3 mb-4">Let's build something.</h1>
              <p className="text-canvas/70 text-lg mb-12">Have a project in mind? Drop a message and I'll get back within 24 hours.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input required name="name" placeholder="Your name" className={`w-full bg-transparent border-b py-3 text-lg focus:border-accent outline-none transition-colors ${errors.name ? "border-red-500" : "border-canvas/20"}`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input required type="email" name="email" placeholder="Email" className={`w-full bg-transparent border-b py-3 text-lg focus:border-accent outline-none transition-colors ${errors.email ? "border-red-500" : "border-canvas/20"}`} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                <input name="subject" placeholder="Project type (e.g. Mobile app)" className="w-full bg-transparent border-b border-canvas/20 py-3 text-lg focus:border-accent outline-none transition-colors" />
                <div>
                  <textarea required name="message" rows={4} placeholder="Tell me about your project…" className={`w-full bg-transparent border-b py-3 text-lg focus:border-accent outline-none transition-colors resize-none ${errors.message ? "border-red-500" : "border-canvas/20"}`} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={isLoading} className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full text-sm font-medium hover:bg-canvas hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "Sending..." : "Send message"}
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
              </form>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
                <a href="mailto:hannahakanni7@gmail.com" className="group flex items-center gap-4 p-5 rounded-2xl border border-canvas/10 hover:border-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-canvas/40 mb-1">Email</div>
                    <div className="text-sm font-medium group-hover:text-accent transition-colors">hannahakanni7@gmail.com</div>
                  </div>
                </a>
                <a href="https://wa.me/2349030585841" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-5 rounded-2xl border border-canvas/10 hover:border-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-canvas/40 mb-1">WhatsApp</div>
                    <div className="text-sm font-medium group-hover:text-accent transition-colors">+234 903 058 5841</div>
                  </div>
                </a>
                <a href="https://github.com/Zionstone0909" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-5 rounded-2xl border border-canvas/10 hover:border-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-canvas/40 mb-1">GitHub</div>
                    <div className="text-sm font-medium group-hover:text-accent transition-colors">Zionstone0909</div>
                  </div>
                </a>
                <a href="tel:+2349030585841" className="group flex items-center gap-4 p-5 rounded-2xl border border-canvas/10 hover:border-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-canvas/40 mb-1">Call</div>
                    <div className="text-sm font-medium group-hover:text-accent transition-colors">09030585841</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
