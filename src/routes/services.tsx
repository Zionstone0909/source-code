import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Palette, Smartphone, Sparkles, Zap } from "lucide-react";
import { SiteNav, SiteFooter, Reveal, type Category } from "@/lib/site-shared";

const services: { icon: typeof Code2; title: string; desc: string; category: Exclude<Category, "All"> }[] = [
  { icon: Code2, title: "Frontend Engineering", desc: "React, Next.js, TypeScript, Tailwind — accessible, SEO-ready interfaces.", category: "Frontend" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Flutter, React Native & Kotlin apps that feel native on both platforms.", category: "Mobile" },
  { icon: Palette, title: "Backend & APIs", desc: "Node, Express, Nest, Laravel, Django — secure REST APIs and databases.", category: "Backend" },
  { icon: Zap, title: "Automation (GoHighLevel)", desc: "Workflows for client management, sales tracking, and marketing ops.", category: "GoHighLevel" },
  { icon: Sparkles, title: "Lovable AI Development", desc: "AI-powered rapid prototyping and full-stack app builds with Lovable.", category: "Full-Stack" },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Akanni Hannah Ibukun" },
      { name: "description", content: "Frontend, mobile, backend & GoHighLevel automation services." },
      { property: "og:title", content: "Services — Akanni Hannah Ibukun" },
      { property: "og:description", content: "Tailored to ship fast and scale." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans">
      <SiteNav />
      <main className="pt-32">
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-16">
                <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">What I do</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 max-w-3xl leading-[1.05]">
                  Services tailored to <span className="italic text-accent">ship fast</span> and scale.
                </h1>
                <p className="mt-5 text-ink/60 max-w-2xl">Click a service to see related projects in my portfolio.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <Link
                    to="/work"
                    search={{ category: s.category }}
                    className="group block p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent hover:bg-accent/5 transition-all h-full relative"
                  >
                    <div className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-accent group-hover:border-accent transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <s.icon className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-serif mb-3">{s.title}</h3>
                    <p className="text-ink/60 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
                      View {s.category} work
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
