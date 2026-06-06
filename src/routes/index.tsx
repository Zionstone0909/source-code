import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Code2, MapPin, Sparkles, Workflow, Zap } from "lucide-react";
import portrait from "@/assets/akanni-portrait.jpg";
import projFairytale from "@/assets/proj-fairytale.jpg";
import projOdu from "@/assets/proj-odu.png";
import { SiteNav, SiteFooter, Reveal, CVPreviewButton } from "@/lib/site-shared";

export const Route = createFileRoute("/")({
  component: Index,
});

const testimonials = [
  { quote: "Hannah turned our messy Figma into a production app in two weeks. Code is clean, animations are buttery.", name: "Adaeze O.", role: "Product Manager · FinTech" },
  { quote: "Rare combination of design taste and engineering rigor. She caught accessibility issues we didn't even know existed.", name: "Marcus T.", role: "CTO · Startup" },
  { quote: "Shipped our mobile MVP under budget and on time. Would hire again in a heartbeat.", name: "Sade A.", role: "Founder · EdTech" },
];




function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-accent selection:text-white">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-glow to-coral origin-left z-[60]"
      />

      <SiteNav />

      <main id="top">
        {/* HERO — BENTO GRID */}
        <section className="relative pt-28 md:pt-32 pb-20 px-6 md:px-10 overflow-hidden">
          <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/20 blur-[140px] -z-10" />
          <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-coral/10 blur-[120px] -z-10" />

          <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-[0.2em] text-ink/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-[0.2em] text-ink/70">
                <MapPin className="w-3 h-3" /> Lagos · Nigeria
              </span>
            </motion.div>

            <div className="grid grid-cols-12 auto-rows-[minmax(120px,auto)] gap-4 md:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-12 lg:col-span-8 row-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Akanni Hannah Ibukun</span>
                  <h1 className="font-serif text-[12vw] md:text-[7vw] lg:text-[5.2vw] leading-[0.95] mt-4 mb-6">
                    <span className="block italic text-accent">full stack</span>
                    developer
                  </h1>
                  <p className="max-w-xl text-base md:text-lg leading-relaxed text-ink/70 mb-8">
                    Senior full-stack developer with 5+ years shipping production web, mobile, and automation systems for founders, agencies, and growing teams.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/work" search={{} as any} className="group inline-flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-glow transition-colors">
                      View selected work
                      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </Link>
                    <Link to="/contact" search={{}} className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">
                      Book intro call
                    </Link>
                    <CVPreviewButton label="Preview CV" className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 rounded-full text-sm font-medium hover:bg-white/5 transition-colors" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-2 rounded-3xl border border-white/10 overflow-hidden relative group glow-ring"
              >
                <img src={portrait} alt="Akanni Hannah Ibukun" className="w-full h-full object-cover min-h-[320px] group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ink/60 mb-1">Currently</div>
                    <div className="font-serif italic text-xl">Building in Lagos</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </motion.div>

              <Reveal className="col-span-6 lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 h-full flex flex-col justify-between">
                  <Code2 className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-serif text-5xl md:text-6xl leading-none">5<span className="text-accent">+</span></div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60 mt-2">Years shipping</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05} className="col-span-6 lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 h-full flex flex-col justify-between">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-serif text-5xl md:text-6xl leading-none">30<span className="text-accent">+</span></div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60 mt-2">Projects delivered</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 h-full">
                  <Zap className="w-5 h-5 text-accent mb-4" />
                  <div className="font-serif italic text-xl mb-1">Full-stack</div>
                  <div className="text-xs text-ink/60 leading-relaxed">React · Next · Node · Postgres · Supabase</div>
                </div>
              </Reveal>

              <Reveal delay={0.15} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="rounded-3xl border border-white/10 bg-accent/10 p-6 h-full">
                  <Workflow className="w-5 h-5 text-accent mb-4" />
                  <div className="font-serif italic text-xl mb-1">Automation</div>
                  <div className="text-xs text-ink/70 leading-relaxed">GoHighLevel · n8n · Make · OpenAI</div>
                </div>
              </Reveal>

            </div>
          </motion.div>
        </section>


        {/* MARQUEE */}
        <section className="border-y border-white/5 py-5 overflow-hidden bg-white/[0.02]">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 px-6 text-xl md:text-2xl font-serif italic text-ink/80">
                <span className="not-italic font-semibold text-accent text-xs uppercase tracking-[0.25em]">Frontend</span>
                {["React", "Next.js", "TypeScript", "Tailwind", "Vue", "Vite"].map((t) => (
                  <span key={t + i} className="flex items-center gap-10">{t}<span className="w-1 h-1 rounded-full bg-accent" /></span>
                ))}
                <span className="not-italic font-semibold text-accent text-xs uppercase tracking-[0.25em]">Backend</span>
                {["Node.js", "NestJS", "Django", "Laravel", "PostgreSQL", "Supabase"].map((t) => (
                  <span key={t + i} className="flex items-center gap-10">{t}<span className="w-1 h-1 rounded-full bg-accent" /></span>
                ))}
                <span className="not-italic font-semibold text-accent text-xs uppercase tracking-[0.25em]">Mobile</span>
                {["Flutter", "React Native", "Kotlin", "Expo"].map((t) => (
                  <span key={t + i} className="flex items-center gap-10">{t}<span className="w-1 h-1 rounded-full bg-accent" /></span>
                ))}
                <span className="not-italic font-semibold text-accent text-xs uppercase tracking-[0.25em]">Automation</span>
                {["GoHighLevel", "n8n", "Make", "OpenAI", "Zapier"].map((t) => (
                  <span key={t + i} className="flex items-center gap-10">{t}<span className="w-1 h-1 rounded-full bg-accent" /></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ODU CASE STUDY */}
        <section className="px-6 md:px-10 py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -translate-y-1/2 -z-10" />
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-16 max-w-3xl">
                <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Featured case study</span>
                <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-6 leading-[1.05]">
                  ODU: A Journal of <span className="italic text-accent">West African</span> Studies.
                </h2>
                <p className="text-lg leading-relaxed text-ink/70">
                  An open-access academic journal platform for Obafemi Awolowo University Press.
                  I built the frontend for browsing journals, advanced article search, and submission
                  flows — delivering a scholarly experience that feels modern, fast, and accessible.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-12 gap-8 mb-16">
              <Reveal className="col-span-12 md:col-span-7">
                <div>
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-canvas/10">
                    <img src={projOdu} alt="ODU Journal of West African Studies — academic journal platform" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="col-span-12 md:col-span-5">
                <div className="flex flex-col justify-between gap-8 h-full">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Client</span>
                    <div className="font-serif text-2xl mb-6">OAU Press</div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Stack</span>
                    <div className="text-ink/80 mb-6">React · TypeScript · Tailwind · Responsive UI</div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Timeline</span>
                    <div className="text-ink/80">6 weeks · launched 2026</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://odujournalofarts.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-glow transition">
                      Visit live site <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <Link to="/contact" search={{}} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:border-accent transition">
                      Start a similar build
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { kpi: "40+", label: "Journal issues digitized" },
                { kpi: "3x", label: "Faster article discovery" },
                { kpi: "100%", label: "Responsive across devices" },
                { kpi: "<2s", label: "Average page load time" },
              ].map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent transition-colors h-full">
                    <div className="text-4xl md:text-5xl font-serif text-accent mb-2">{m.kpi}</div>
                    <div className="text-sm text-ink/60 leading-snug">{m.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Journal browsing", desc: "Clean, categorized browsing for past and current journal issues with cover previews and metadata." },
                { title: "Advanced article search", desc: "Fast, filterable search across titles, authors, keywords, and abstracts with instant results." },
                { title: "Author submission flows", desc: "Guided submission interface for authors with step-by-step uploads, formatting checks, and status tracking." },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 h-full">
                    <h3 className="font-serif text-xl mb-3">{b.title}</h3>
                    <p className="text-ink/70 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GOHIGHLEVEL CASE STUDY */}
        <section className="px-6 md:px-10 py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -translate-y-1/2 -z-10" />
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-16 max-w-3xl">
                <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Featured case study</span>
                <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-6 leading-[1.05]">
                  GoHighLevel for <span className="italic text-accent">Allie Burke</span> Photography.
                </h2>
                <p className="text-lg leading-relaxed text-ink/70">
                  A luxury photography brand needed a polished booking experience plus a back-office
                  that nurtures every inquiry. I designed and shipped a GoHighLevel build covering the
                  funnel, CRM pipeline, and end-to-end automation — from first lead to delivered gallery.
                </p>
              </div>
            </Reveal>


            <div className="grid grid-cols-12 gap-8 mb-16">
              <Reveal className="col-span-12 md:col-span-7">
                <div>
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-canvas/10">
                    <img src={projFairytale} alt="Allie Burke Photography — GoHighLevel build" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="col-span-12 md:col-span-5">
                <div className="flex flex-col justify-between gap-8 h-full">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Client</span>
                    <div className="font-serif text-2xl mb-6">Allie Burke Photography</div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Stack</span>
                    <div className="text-ink/80 mb-6">GoHighLevel · Funnels · Workflows · Pipelines · SMS &amp; Email</div>
                    <span className="block text-xs uppercase tracking-widest text-ink/40 mb-3">Timeline</span>
                    <div className="text-ink/80">3 weeks · launched 2024</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.allieburkephotography.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-glow transition">
                      Visit live site <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <Link to="/contact" search={{}} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:border-accent transition">
                      Start a similar build
                    </Link>
                  </div>
                </div>
              </Reveal>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { kpi: "+138%", label: "Qualified leads in 90 days" },
                { kpi: "4.2x", label: "Faster inquiry response" },
                { kpi: "92%", label: "Booking workflow automated" },
                { kpi: "12 hrs", label: "Saved per week on admin" },
              ].map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent transition-colors h-full">
                    <div className="text-4xl md:text-5xl font-serif text-accent mb-2">{m.kpi}</div>
                    <div className="text-sm text-ink/60 leading-snug">{m.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Lead capture funnel", desc: "High-converting booking funnel with calendar embed, qualifying questions, and instant confirmation." },
                { title: "CRM pipeline", desc: "Stages from new inquiry → consult → booked → shoot → delivered, with task automation at each step." },
                { title: "Nurture automation", desc: "SMS + email sequences for follow-ups, reminders, review requests, and post-shoot upsells." },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 h-full">
                    <h3 className="font-serif text-xl mb-3">{b.title}</h3>
                    <p className="text-ink/70 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* TESTIMONIALS — SCROLLING REVIEWS */}
        <section className="px-6 md:px-10 py-24 border-t border-ink/10 overflow-hidden">
          <div className="max-w-7xl mx-auto mb-12">
            <Reveal>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Kind words</span>
                <h2 className="text-4xl md:text-6xl font-serif mt-3">Trusted by teams.</h2>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-canvas to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-canvas to-transparent z-10" />

            <div className="flex animate-scroll-reviews gap-6 w-max">
              {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <figure
                  key={t.name + i}
                  className="w-[340px] md:w-[420px] shrink-0 p-8 rounded-2xl border border-ink/10 bg-canvas hover:border-accent transition-colors"
                >
                  <div className="text-4xl font-serif text-accent leading-none mb-4">"</div>
                  <blockquote className="text-ink/80 leading-relaxed mb-6">{t.quote}</blockquote>
                  <figcaption>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-ink/60 mt-1">{t.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
