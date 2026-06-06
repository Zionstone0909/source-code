import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/akanni-portrait.jpg";
import { SiteNav, SiteFooter, Reveal } from "@/lib/site-shared";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Akanni Hannah Ibukun" },
      { name: "description", content: "Full-stack developer bridging frontend, backend, mobile, and GoHighLevel automation." },
      { property: "og:title", content: "About Akanni Hannah Ibukun" },
      { property: "og:description", content: "5+ years building reliable, scalable apps." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans">
      <SiteNav />
      <main className="pt-32">
        {/* Hero / Bio Section — Editorial Spread */}
        <section className="px-6 md:px-10 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Portrait + caption */}
            <Reveal className="lg:col-span-5">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <div className="aspect-[4/5] bg-surface overflow-hidden relative border border-surface">
                    <img
                      src={portrait}
                      alt="Portrait of Akanni Hannah Ibukun"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* magazine inset border */}
                    <div className="absolute inset-0 border-[12px] border-canvas pointer-events-none" />
                  </div>
                  <div className="mt-6 flex items-start gap-4">
                    <div className="w-8 h-px bg-accent mt-2.5 shrink-0" />
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/50 leading-relaxed">
                      Currently /
                      <br />
                      <span className="text-ink">Building in Lagos, NG</span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Editorial content */}
            <div className="lg:col-span-7 flex flex-col">
              <Reveal>
                <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-10 block">
                  About me
                </span>

                <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[0.85] mb-12 lg:-ml-28 relative z-10">
                  Bridging frontend, backend, automation, and AI-powered solutions.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-6">
                    <p className="text-[15px] leading-relaxed text-ink/80">
                      I'm Akanni Hannah, a Full-Stack Developer and Automation Specialist with over 5 years of experience building modern web applications, scalable backend systems, and business automation solutions. My passion lies in transforming ideas into digital products that are not only visually appealing but also efficient, reliable, and built for growth.
                    </p>
                    <p className="text-[15px] leading-relaxed text-ink/80">
                      I work across the entire development lifecycle—from designing intuitive user interfaces to developing robust APIs, databases, and automated workflows. Whether it's SaaS platforms, business management systems, custom web applications, or AI-powered solutions, I focus on delivering technology that solves real-world problems and creates measurable impact.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[15px] leading-relaxed text-ink/80">
                      Over the years, I've worked with startups, entrepreneurs, agencies, and organizations to develop applications that streamline operations, improve customer experiences, and accelerate business growth. My expertise extends beyond traditional software development into workflow automation, CRM implementation, and no-code/low-code solutions using platforms such as GoHighLevel, n8n, Make, and AI-powered builders like Lovable.
                    </p>
                    <p className="text-[15px] leading-relaxed text-ink/80">
                      I believe great software is more than just code—it's about understanding people, solving meaningful problems, and creating experiences that drive results. Every project I take on is approached with a commitment to clean architecture, scalability, performance, and long-term maintainability.
                    </p>
                  </div>
                </div>

                <div className="mt-20 pt-16 border-t border-surface">
                  <div className="max-w-3xl mx-auto text-center">
                    <blockquote className="font-serif italic text-3xl md:text-5xl text-accent leading-[1.15] mb-10 text-center">
                      "I strive to build technology that empowers businesses, simplifies processes, and creates meaningful impact."
                    </blockquote>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-[2px] bg-accent" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        <section className="px-6 md:px-10 py-20 border-t border-b border-ink/10">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <span className="block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Services</span>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-10">What I do</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Full-Stack Web Development",
                "SaaS & MVP Development",
                "React & Next.js Applications",
                "Backend API Development",
                "Database Design & Optimization",
                "AI-Powered Web Applications",
                "GoHighLevel CRM & Automation",
                "Workflow Automation (n8n, Make)",
                "Business Process Automation",
                "WordPress & Website Migration",
                "Cloud Deployment & DevOps",
                "Performance Optimization",
              ].map((s, i) => (
                <Reveal key={s} delay={i * 0.05}>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-ink/[0.03] hover:bg-ink/[0.06] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Core Technologies Section */}
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <span className="block text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Stack</span>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-10">Core technologies</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI"] },
                { label: "Backend", items: ["Node.js", "NestJS", "Express.js", "Django", "Flask", "Laravel"] },
                { label: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
                { label: "Automation & AI", items: ["GoHighLevel", "n8n", "Make", "OpenAI APIs", "Lovable", "AI Workflow Design"] },
                { label: "Cloud & DevOps", items: ["Docker", "AWS", "Vercel", "Netlify", "Git & GitHub"] },
              ].map((g, i) => (
                <Reveal key={g.label} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-ink/[0.03] h-full">
                    <span className="block uppercase tracking-widest mb-5 text-ink/40 text-xs">{g.label}</span>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li key={it} className="px-3 py-1.5 rounded-lg bg-canvas text-sm font-medium border border-ink/10">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
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
