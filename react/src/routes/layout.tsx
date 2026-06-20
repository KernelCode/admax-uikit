import {
  Bell,
  BookOpen,
  LayoutGrid,
  Mail,
  Megaphone,
  Menu,
  Moon,
  Search,
  Settings,
  Share2,
  Shapes,
  Sun,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Avatar } from "../components/avatar";
import { SearchInput } from "../components/input";
import { useI18n } from "../i18n";
import { cn } from "../lib/cn";

/** The flat amber logo tile + wordmark. */
function Wordmark({ compact }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] brand-fill font-display text-xl font-extrabold text-white">
        a
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-lg font-extrabold tracking-tight">
            {t.brand}
            <span className="text-brand-400">.</span>
          </span>
          <span className="block text-[11px] font-medium text-muted-foreground">{t.tagline}</span>
        </span>
      )}
    </div>
  );
}

function IconBtn({
  children,
  count,
  dot,
  label,
}: {
  children: ReactNode;
  count?: number;
  dot?: "success" | "danger";
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full bg-card text-muted-foreground border border-border transition-colors hover:text-foreground"
    >
      {children}
      {typeof count === "number" && (
        <span className="absolute -top-1 -end-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
      {dot && (
        <span className={cn("absolute end-2 top-2 h-2 w-2 rounded-full", dot === "success" ? "bg-success" : "bg-danger")} />
      )}
    </button>
  );
}

export function Layout() {
  const { t, lang, setLang } = useI18n();
  const [dark, setDark] = useState(() =>
    typeof localStorage !== "undefined" ? localStorage.getItem("admax-theme") === "dark" : false,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("admax-theme", dark ? "dark" : "light");
  }, [dark]);

  const mainNav = [
    { to: "/", label: t.nav.dashboard, icon: LayoutGrid },
    { to: "/campaign", label: t.nav.campaign, icon: Megaphone, badge: t.nav.new },
    { to: "/social", label: t.nav.social, icon: Share2 },
    { to: "/pricing", label: t.nav.pricing, icon: Tag },
    { to: "/components", label: t.nav.components, icon: Shapes },
  ];
  const otherNav = [
    { label: t.nav.guide, icon: BookOpen },
    { label: t.nav.messages, icon: Mail, badge: t.nav.new },
    { label: t.nav.settings, icon: Settings },
  ];

  const NavItem = ({ to, label, icon: Icon, badge }: { to: string; label: string; icon: typeof LayoutGrid; badge?: string }) => (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors",
          isActive
            ? "bg-soft text-[color:var(--color-soft-foreground)]"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute -start-2 h-6 w-1 rounded-full bg-primary" />}
          <Icon className="h-[18px] w-[18px]" />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">{badge}</span>
          )}
        </>
      )}
    </NavLink>
  );

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-5">
      <Wordmark />
      <nav className="flex-1 space-y-6 overflow-y-auto scroll-slim">
        <div className="space-y-1">
          <p className="px-3.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            {t.nav.mainMenu}
          </p>
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
        <div className="space-y-1">
          <p className="px-3.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            {t.nav.others}
          </p>
          {otherNav.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span className="flex-1 text-start">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">{item.badge}!</span>
              )}
            </button>
          ))}
        </div>
      </nav>
      <div className="rounded-[var(--radius-lg)] bg-muted/60 p-3 text-xs">
        <p className="font-bold text-foreground">{t.nav.footer}</p>
        <p className="mt-1 text-muted-foreground">{t.nav.rights}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-72 border-e border-border bg-card lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 start-0 w-72 bg-card border-e border-border">
            <button
              onClick={() => setOpen(false)}
              className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:ps-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-card text-foreground border border-border lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden max-w-sm flex-1 sm:block">
              <SearchInput placeholder={t.topbar.search} icon={<Search className="h-[18px] w-[18px]" />} />
            </div>

            <div className="ms-auto flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center rounded-full bg-card p-0.5 text-xs font-bold border border-border sm:flex">
                <button
                  onClick={() => setLang("en")}
                  className={cn("rounded-full px-2.5 py-1.5", lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ar")}
                  className={cn("rounded-full px-2.5 py-1.5", lang === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
                >
                  ع
                </button>
              </div>
              <IconBtn label="Notifications" count={23}>
                <Bell className="h-[18px] w-[18px]" />
              </IconBtn>
              <IconBtn label="Messages" dot="success">
                <Mail className="h-[18px] w-[18px]" />
              </IconBtn>
              <button
                onClick={() => setDark((d) => !d)}
                className="grid h-10 w-10 place-items-center rounded-full bg-card text-muted-foreground border border-border hover:text-foreground"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>
              <div className="hidden items-center gap-2.5 ps-1 sm:flex">
                <div className="text-end leading-tight">
                  <div className="text-sm font-bold">{t.topbar.user}</div>
                  <div className="text-[11px] text-muted-foreground">{t.topbar.role}</div>
                </div>
                <Avatar name={t.topbar.user} online />
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
