import {
  BarChart3,
  ChevronDown,
  Download,
  Eye,
  Facebook,
  Heart,
  Instagram,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Twitter,
} from "lucide-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { SearchInput } from "../components/input";
import { PageHeader } from "../components/page-header";
import { useI18n } from "../i18n";
import { cn } from "../lib/cn";

const networkMeta = [
  { icon: null, color: "var(--color-success)", active: true },
  { icon: Instagram, color: "#e1306c" },
  { icon: Facebook, color: "var(--color-info)" },
  { icon: Twitter, color: "#1da1f2" },
];

export function Social() {
  const { t } = useI18n();
  const c = t.common;

  const metrics = [
    { icon: BarChart3, label: c.conversion, value: "$63.04", color: "var(--color-brand-500)" },
    { icon: Eye, label: c.engagement, value: "5,412k", color: "var(--color-info)" },
    { icon: Heart, label: c.likes, value: "4,625k", color: "var(--color-danger)" },
    { icon: MessageCircle, label: c.comments, value: "2,512", color: "var(--color-success)" },
  ];

  return (
    <>
      <PageHeader
        title={t.social.title}
        actions={
          <>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 text-primary" />
              {c.viewAnalytics}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 text-success" />
              {c.downloadPdf}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* filters */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-base font-bold">{t.social.searchMedia}</h3>
            <div className="mt-4">
              <SearchInput placeholder={t.topbar.search} icon={<Search className="h-[18px] w-[18px]" />} />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-bold">
              <button className="text-muted-foreground hover:text-foreground">{c.reset}</button>
              <button className="text-primary">{c.search}</button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold">{t.social.viewBy}</h3>
            <div className="mt-4 space-y-2.5">
              {t.social.networks.map((n, i) => {
                const meta = networkMeta[i]!;
                const Icon = meta.icon;
                return (
                  <button
                    key={n.name}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[var(--radius-md)] border p-2.5 text-start transition-colors",
                      meta.active ? "border-success/40 bg-success/10" : "border-border hover:bg-muted",
                    )}
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] text-white"
                      style={{ background: meta.color }}
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : <span className="text-lg font-bold">✓</span>}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{n.name}</span>
                      <span className="block text-xs text-muted-foreground">{n.count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-end gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] bg-card border border-border">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-md)] bg-card px-3.5 text-sm font-semibold border border-border hover:bg-muted">
              {c.newest}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <span className="rounded-[var(--radius-sm)] bg-soft px-2 py-0.5 text-xs font-bold text-[color:var(--color-soft-foreground)]">
                    #AD-00124{i + 1}
                  </span>
                  <div className="mt-2 truncate font-display font-bold">{t.social.adTitle}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">✓ {c.publishedOn} January 25, 2026</div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 md:gap-x-6">
                  {metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <m.icon className="h-4 w-4 shrink-0" style={{ color: m.color }} />
                      <div>
                        <div className="text-sm font-bold tabular-nums leading-none">{m.value}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
