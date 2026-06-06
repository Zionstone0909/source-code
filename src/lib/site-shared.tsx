import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Eye, Github, Mail, MapPin, Phone, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import projBizzsup from "@/assets/proj-bizzsup.jpg";
import projEvent from "@/assets/proj-event.jpg";
import projWnMobile from "@/assets/proj-wn-mobile.png";
import projCar from "@/assets/proj-car.jpg";
import projFairytale from "@/assets/proj-fairytale.jpg";
import projOdu from "@/assets/proj-odu.png";
import projAllie from "@/assets/proj-allie.png";
import projJojo from "@/assets/proj-jojo.png";
import projJireh from "@/assets/proj-jireh.png";
import projGhl from "@/assets/proj-ghl.png";
import projAutomation from "@/assets/proj-automation.png";
import projVoks from "@/assets/proj-voks.png";
import projOgw from "@/assets/proj-ogw.png";
import projGym from "@/assets/proj-gym.jpg";
import projRestaurantWeb from "@/assets/proj-restaurant-web.jpg";
import projTravel from "@/assets/proj-travel.jpg";
import projFlight from "@/assets/proj-flight-wego.png";
import projNote from "@/assets/proj-note.jpg";
import projCalc from "@/assets/proj-calc.jpg";
import projTreasure from "@/assets/proj-treasure.jpg";
import projQr from "@/assets/proj-qr.jpg";
import projOduBackend from "@/assets/proj-odu-backend.jpg";
import projHykerGuide from "@/assets/hyker-guide.png";
import projHykerz from "@/assets/hykerz.png";
import projHykers from "@/assets/hykers.png";

const cvUrl = "/cv.pdf";

export type Category = "All" | "Frontend" | "Backend" | "Mobile" | "Full-Stack" | "GoHighLevel";
export type Project = {
  num: string;
  title: string;
  stack: string;
  blurb: string;
  image: string;
  category: Exclude<Category, "All">;
  year: string;
  link?: string;
};

export const projects: Project[] = [
  { num: "01", title: "Jireh Fishes", stack: "PHP · MySQL · JS · XAMPP", blurb: "Auth web app for fish farm staff & auditors — role-based access, real-time inventory, ledger control. Built while working at Voks Technologies.", image: projJireh, category: "Full-Stack", year: "2025", link: "https://jirehfishes.com.ng/auth/login.php" },
  { num: "02", title: "BizzSup", stack: "PHP · MySQL · JS · XAMPP", blurb: "Online customer support system with ticketing, dynamic interactions, and admin dashboard.", image: projBizzsup, category: "Full-Stack", year: "2023", link: "https://github.com/Zionstone0909" },
  { num: "03", title: "Fortizon Digital Solution", stack: "GoHighLevel · Automation", blurb: "Android web app automating marketing campaigns, lead tracking, and customer relationships.", image: projGhl, category: "GoHighLevel", year: "2025", link: "https://github.com/Zionstone0909" },
  { num: "04", title: "FairyTalePlanner", stack: "MERN · Google Maps API", blurb: "Wedding planning platform — budget tracker, vendor discovery, admin-approved listings.", image: projFairytale, category: "Full-Stack", year: "2023", link: "https://github.com/Zionstone0909" },
  { num: "05", title: "Event.lk", stack: "Java · JSP · Servlets · MySQL · Tomcat", blurb: "MVC event management platform with registration, listings, and dynamic interactivity.", image: projEvent, category: "Backend", year: "2022", link: "https://github.com/Zionstone0909" },
  { num: "06", title: "Gym Management System", stack: "MERN · Tailwind · Material UI", blurb: "Manages members, schedules, staff, finances, and personalized coaching features.", image: projGym, category: "Full-Stack", year: "2024", link: "https://github.com/Zionstone0909" },
  { num: "07", title: "WN Restaurant — Web", stack: "MERN · Tailwind CSS", blurb: "Restaurant management with menu browsing, ordering, payments, and admin functions.", image: projRestaurantWeb, category: "Full-Stack", year: "2024", link: "https://github.com/Zionstone0909" },
  { num: "08", title: "WN Restaurant — Mobile", stack: "React Native · Expo · Node · MongoDB", blurb: "User-facing mobile counterpart — browse, cart, pay, and update profile on Android.", image: projWnMobile, category: "Mobile", year: "2024", link: "https://github.com/Zionstone0909" },
  { num: "09", title: "Travel Management Platform", stack: "Spring Boot · React · MongoDB · Firebase", blurb: "Plan trips, join groups, chat via WebSocket, share blog-style posts and quizzes.", image: projTravel, category: "Full-Stack", year: "2023", link: "https://github.com/Zionstone0909" },
  { num: "10", title: "Car Rental App", stack: "Flutter · Firebase Firestore", blurb: "Cross-platform car rental with real-time data, BLoC architecture, Android/iOS/Web.", image: projCar, category: "Mobile", year: "2022", link: "https://github.com/Zionstone0909" },
  { num: "11", title: "Flight Booking Website", stack: "React · Tailwind · Amadeus API", blurb: "Search flights, book tickets, step-by-step booking flow with auth and animations.", image: projFlight, category: "Frontend", year: "2024", link: "https://www.wego.com.ng/flights" },
  { num: "12", title: "Note App", stack: "Kotlin · Android · ConstraintLayout", blurb: "Android task manager with reminders, alarms, and Pomodoro-style focus timer.", image: projNote, category: "Mobile", year: "2023", link: "https://github.com/Zionstone0909" },
  { num: "13", title: "WN QR Scanner", stack: "Flutter · Mobile", blurb: "Scan & generate QR codes — text, URLs, contacts, sharing and saving.", image: projQr, category: "Mobile", year: "2022", link: "https://github.com/Zionstone0909" },
  { num: "14", title: "Calculator App", stack: "Kotlin · Android", blurb: "Arithmetic with parentheses, error handling, mXparser expression evaluation.", image: projCalc, category: "Mobile", year: "2021", link: "https://github.com/Zionstone0909" },
  { num: "15", title: "Treasurer Hunter", stack: "Python · Turtle Graphics", blurb: "Maze-navigation game with obstacles, scoring, multiplayer, and collectible eggs.", image: projTreasure, category: "Backend", year: "2021", link: "https://github.com/Zionstone0909" },

  { num: "16", title: "Allie Burke Photography", stack: "GoHighLevel · Automation · Web", blurb: "Luxury photography site with GoHighLevel-powered booking, lead capture, and client workflow automation.", image: projAllie, category: "GoHighLevel", year: "2025", link: "https://www.allieburkephotography.com/" },
  { num: "17", title: "Jo-Jo Photography", stack: "GoHighLevel · Funnels · Automation", blurb: "Newborn, maternity & family photography site in Swindon — GoHighLevel-powered booking, lead capture, and client nurture flows.", image: projJojo, category: "GoHighLevel", year: "2025", link: "https://www.jojophotos.co.uk/" },
  { num: "18", title: "Voks Technologies", stack: "PHP · MySQL · JS · Bootstrap", blurb: "Corporate site for a software dev & IT services company — products, services, and lead capture. Built while working at Voks Technologies.", image: projVoks, category: "Full-Stack", year: "2025", link: "https://vokstechnologies.com.ng/" },
  { num: "19", title: "ODU: A Journal of West African Studies", stack: "React · TypeScript · Tailwind · Responsive UI", blurb: "Open-access academic journal site for OAU Press — frontend with journal browsing, advanced article search UI, and submission flows.", image: projOdu, category: "Frontend", year: "2026", link: "https://odujournalofarts.com/" },
  { num: "20", title: "ODU Journal — Backend", stack: "Node · REST API · Search · Auth", blurb: "Backend services powering ODU Journal — article indexing, author submissions, subscriber auth, and publishing workflows.", image: projOduBackend, category: "Backend", year: "2026", link: "https://odujournalofarts.com/" },
  { num: "21", title: "GoHighLevel Workflow Automation", stack: "GoHighLevel · Workflows · CRM", blurb: "End-to-end client workflow automations — triggers, opportunity creation, contact tagging, and email sequences powering hands-off lead nurture.", image: projAutomation, category: "GoHighLevel", year: "2026", link: "https://github.com/Zionstone0909" },
  { num: "22", title: "Only God Is Wise Nig Ltd", stack: "React · TypeScript · Tailwind · Responsive UI", blurb: "Corporate site for a diversified Nigerian enterprise spanning agriculture, logistics, hospitality & trade — subsidiaries, leadership, and gallery sections.", image: projOgw, category: "Frontend", year: "2026", link: "https://onlygodiswise.com" },
  { num: "23", title: "Hyker Guide", stack: "Android · Travel & Local · Play Store", blurb: "Travel companion app by The Learning Craft Limited — published on Google Play Store in the Travel & Local category.", image: projHykerGuide, category: "Mobile", year: "2026", link: "https://play.google.com/store/apps/details?id=com.hykerz.hykerz" },
  { num: "24", title: "Hykerz", stack: "Android · Travel & Local · Play Store", blurb: "Travel app by Hykerz Inc with 10k+ installs — published on Google Play Store in the Travel & Local category.", image: projHykerz, category: "Mobile", year: "2026", link: "https://play.google.com/store/apps/details?id=com.hykerz.hykerz" },
  { num: "25", title: "Hykers", stack: "Android · Travel & Local · Play Store", blurb: "Travel & Local app by The Learning Craft Limited — published on Google Play Store and live in production.", image: projHykers, category: "Mobile", year: "2026", link: "https://play.google.com/store/apps/details?id=com.hykerz.hykerz" },
];



export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SiteNav() {
  const linkCls = "hover:text-accent transition-colors";
  const activeCls = "text-accent";
  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center backdrop-blur-xl bg-canvas/70 border-b border-white/5">
      <Link to="/" search={{}} className="flex items-center gap-2.5 font-medium tracking-tight text-sm md:text-base">
        <span className="relative flex">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="absolute inset-0 w-2 h-2 rounded-full bg-accent animate-ping" />
        </span>
        <span className="font-serif italic text-base md:text-lg">Akanni Hannah</span>
      </Link>
      <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] text-ink/70">
        <Link to="/" search={{}} className={linkCls} activeProps={{ className: activeCls }}>Home</Link>
        <Link to="/work" search={{} as any} className={linkCls} activeProps={{ className: activeCls }}>Work</Link>
        <Link to="/services" search={{}} className={linkCls} activeProps={{ className: activeCls }}>Services</Link>
        <Link to="/about" search={{}} className={linkCls} activeProps={{ className: activeCls }}>About</Link>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <CVPreviewButton />
        <Link to="/contact" search={{}} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-xs font-medium tracking-wide hover:bg-accent-glow transition-colors">
          Let's talk
          <span aria-hidden>→</span>
        </Link>
      </div>
    </nav>
  );
}

export function CVPreviewButton({ className, label = "CV" }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/15 text-xs font-medium tracking-wide hover:border-accent hover:text-accent transition-colors"
        }
      >
        <Eye className="w-3.5 h-3.5" />
        {label}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 gap-0 bg-canvas border-ink/10 overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between gap-4 px-5 py-3 border-b border-ink/10 space-y-0">
            <DialogTitle className="text-sm font-medium tracking-tight text-ink">
              Akanni Hannah Ibukun — CV
            </DialogTitle>
            <div className="flex items-center gap-2">
              <a
                href={cvUrl}
                download="Akanni-Hannah-Ibukun-CV.pdf"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white text-xs font-medium hover:bg-accent-glow transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-full hover:bg-ink/10 text-ink/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>
          <div className="flex-1 bg-ink/5 h-full">
            <iframe
              src={`${cvUrl}#view=FitH`}
              title="CV preview"
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-10 py-12 border-t border-ink/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-ink/60">
        <span>© 2026 Akanni Hannah Ibukun</span>
        <div className="flex flex-wrap justify-center gap-6">
          <CVPreviewButton className="hover:text-accent flex items-center gap-2 uppercase tracking-widest" label="Preview CV" />
          <a href={cvUrl} download="Akanni-Hannah-Ibukun-CV.pdf" className="hover:text-accent flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Download CV</a>
          <a href="mailto:hannahakanni7@gmail.com" className="hover:text-accent flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</a>
          <a href="https://github.com/Zionstone0909" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</a>
          <a href="tel:+2349030585841" className="hover:text-accent flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 09030585841</a>
          <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Lagos, NG</span>
        </div>
      </div>
    </footer>
  );
}
