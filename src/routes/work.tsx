import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteNav, SiteFooter, Reveal, projects, type Category } from "@/lib/site-shared";

const CATEGORIES: Category[] = ["All", "Frontend", "Backend", "Mobile", "Full-Stack", "GoHighLevel"];

type WorkSearch = { category: Category };

export const Route = createFileRoute("/work")({
  validateSearch: (search: Record<string, unknown>): WorkSearch => {
    const c = search.category as Category | undefined;
    return { category: c && CATEGORIES.includes(c) ? c : "All" };
  },
  head: () => ({
    meta: [
      { title: "Work — Akanni Hannah Ibukun" },
      { name: "description", content: "Selected projects across frontend, backend, mobile, full-stack, and GoHighLevel automation." },
      { property: "og:title", content: "Selected Work — Akanni Hannah Ibukun" },
      { property: "og:description", content: "Recent web, mobile, and automation projects." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { category: filter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setFilter = (c: Category) =>
    navigate({ search: { category: c }, replace: true, resetScroll: false });
  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : filter === "Frontend" || filter === "Backend"
          ? projects.filter((p) => p.category === filter || p.category === "Mobile")
          : projects.filter((p) => p.category === filter),
    [filter],
  );


  return (
    <div className="min-h-screen bg-canvas text-ink font-sans">
      <SiteNav />
      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Selected Projects</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-3">Recent work.</h1>
              </div>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-all ${
                      filter === c ? "bg-accent text-white border-accent" : "border-white/15 hover:border-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => p.link && window.open(p.link, "_blank", "noopener,noreferrer")}
                >
                  <div className="relative w-full aspect-[4/3] bg-ink/5 overflow-hidden rounded-2xl">
                    <img src={p.image} alt={`${p.title} project visual`} loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-canvas/90 backdrop-blur text-xs font-mono">
                      {p.category} · {p.year}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-serif">
                        <span className="text-ink/40 mr-2 font-mono text-sm align-middle">{p.num}</span>
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-accent transition-colors">
                            {p.title}
                          </a>
                        ) : p.title}
                      </h3>
                      <p className="text-ink/60 mt-1 text-sm font-mono">{p.stack}</p>
                      <p className="text-ink/70 mt-2 text-sm leading-relaxed">{p.blurb}</p>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
