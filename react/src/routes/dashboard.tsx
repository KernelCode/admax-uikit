import { ChevronDown, ChevronUp, Flame, MoreHorizontal, TrendingUp, Users } from "lucide-react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { BarsChart, Donut, LineChart, Sparkline } from "../components/charts";
import { PageHeader } from "../components/page-header";
import { StatCard } from "../components/stat-card";
import { useI18n } from "../i18n";

const spend = [12, 18, 14, 22, 19, 28, 24, 32];
const income = [18, 16, 22, 20, 26, 24, 30, 34];
const audienceSpark = [8, 12, 9, 14, 11, 16, 13, 18];
const campaignSpark = [14, 10, 16, 12, 18, 15, 20, 17];
const bars = [
  { value: 30, up: true },
  { value: 52, up: true },
  { value: 22, up: false },
  { value: 64, up: true },
  { value: 40, up: false },
  { value: 70, up: true },
  { value: 48, up: true },
];

/** White progress ring with a centred up-arrow + delta label (spends banner). */
function SpendsRing({ pct, label }: { pct: number; label: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center">
      <svg viewBox="0 0 56 56" className="h-16 w-16 -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <ChevronUp className="h-4 w-4" />
        <span className="text-[10px] font-bold">{label}</span>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { t, dir } = useI18n();
  const c = t.common;

  return (
    <>
      <PageHeader
        title={t.dash.title}
        subtitle={t.dash.subtitle}
        actions={
          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-400 px-4 text-sm font-bold text-[#1d2231]">
            {c.thisMonth}
            <ChevronDown className="h-4 w-4" />
          </button>
        }
      />

      {/* KPI strip + spends banner */}
      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          label={t.dash.campaign}
          value="562"
          data={campaignSpark}
          delta={8}
          icon={<Flame className="h-5 w-5" />}
        />
        <StatCard
          label={t.dash.audience}
          value="14,565k"
          data={audienceSpark}
          delta={5}
          color="var(--color-brand-400)"
          icon={<Users className="h-5 w-5" />}
        />
        {/* Spends today / yesterday — orange + slate banner with a diagonal seam */}
        <Card className="relative overflow-hidden p-0 lg:col-span-2">
          <div className="absolute inset-0 bg-ink" />
          <div
            className="absolute inset-y-0 start-0 w-[60%] bg-accent"
            style={{
              clipPath:
                dir === "rtl"
                  ? "polygon(34px 0, 100% 0, 100% 100%, 0 100%)"
                  : "polygon(0 0, calc(100% - 34px) 0, 100% 100%, 0 100%)",
            }}
          />
          <div className="relative grid h-full grid-cols-[58%_42%]">
            <div className="flex items-center gap-4 p-5 text-white">
              <SpendsRing pct={72} label="+5%" />
              <div>
                <div className="text-sm font-medium opacity-90">{t.dash.spendsToday}</div>
                <div className="mt-1 font-display text-3xl font-extrabold">$5,245</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold opacity-90">
                  <TrendingUp className="h-3.5 w-3.5" /> +5% {c.thanLastWeek}
                </div>
              </div>
            </div>
            <div className="p-5 ps-7 text-ink-foreground">
              <div className="flex items-center justify-between gap-2 text-sm font-medium opacity-90">
                {t.dash.spendsYesterday}
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">+6%</span>
              </div>
              <div className="mt-1 font-display text-3xl font-extrabold">$953.55</div>
              <Sparkline data={spend} color="#ffffff" area={false} className="mt-2 opacity-80" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart activity + transaction overview */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-base font-bold">{t.dash.chartActivity}</h3>
              <div className="mt-2 flex items-center gap-4 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" /> {c.spendings}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/70" /> {c.income}
                </span>
              </div>
            </div>
            <Badge variant="brand">+12% {c.fromLastMonth}</Badge>
          </div>
          <LineChart
            labels={t.dash.weeks}
            series={[
              { label: "Spendings", data: spend, color: "var(--color-primary)" },
              { label: "Income", data: income, color: "var(--color-foreground)" },
            ]}
          />
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-bold">{t.dash.transactionOverview}</h3>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-success" /> {c.income}
              </div>
              <div className="mt-1 font-display text-xl font-extrabold">$85.66k</div>
            </div>
            <div className="text-end">
              <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground">
                {c.expense} <span className="h-2.5 w-2.5 rounded-full bg-danger" />
              </div>
              <div className="mt-1 font-display text-xl font-extrabold">$32.40k</div>
            </div>
          </div>
          <BarsChart data={bars} className="mt-4" />
        </Card>
      </div>

      {/* Goal summary + social stats + target stats */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="font-display text-base font-bold">{t.dash.campaignGoal}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.dash.goalDesc}</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Instagram", v: 78, color: "var(--color-danger)" },
              { label: "Facebook", v: 64, color: "var(--color-info)" },
              { label: "Twitter", v: 45, color: "var(--color-brand-400)" },
            ].map((g) => (
              <div key={g.label}>
                <div className="mb-1.5 flex justify-between text-sm font-semibold">
                  <span>{g.label}</span>
                  <span className="text-muted-foreground">{g.v}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${g.v}%`, background: g.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-base font-bold">{t.dash.socialStats}</h3>
          <div className="mt-5 space-y-3">
            {[
              { name: "Instagram", value: "5,412k", up: 8, color: "var(--color-danger)" },
              { name: "Facebook", value: "4,625k", up: 5, color: "var(--color-info)" },
              { name: "Twitter", value: "2,512k", up: -2, color: "var(--color-brand-400)" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-[var(--radius-md)] bg-muted/50 p-3">
                <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: s.color }} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.value} {c.engagement}</div>
                </div>
                <Badge variant={s.up >= 0 ? "success" : "danger"}>
                  {s.up >= 0 ? "+" : ""}
                  {s.up}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-base font-bold">{t.dash.targetStats}</h3>
          <div className="mt-4 flex flex-col items-center">
            <Donut
              segments={[
                { value: 42, color: "var(--color-info)" },
                { value: 28, color: "var(--color-success)" },
                { value: 18, color: "var(--color-grape)" },
                { value: 12, color: "var(--color-accent)" },
              ]}
            >
              <div className="text-center">
                <div className="font-display text-xl font-extrabold">67%</div>
                <div className="text-[11px] text-muted-foreground">{c.targetReached}</div>
              </div>
            </Donut>
            <div className="mt-4 grid w-full grid-cols-2 gap-2 text-xs font-semibold">
              {[
                { l: "Main Card", c: "var(--color-info)" },
                { l: "Orange Card", c: "var(--color-accent)" },
                { l: "Purple Card", c: "var(--color-grape)" },
                { l: "Green Card", c: "var(--color-success)" },
              ].map((x) => (
                <span key={x.l} className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.c }} /> {x.l}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Click summary + most performed */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-base font-bold">{t.dash.clickSummary}</h3>
              <div className="mt-2 font-display text-3xl font-extrabold">867,123k</div>
              <Badge variant="success" className="mt-2">
                +9% {c.fromLastMonth}
              </Badge>
            </div>
            <Button variant="soft" size="sm">
              {c.downloadCsv}
            </Button>
          </div>
          <Sparkline data={[20, 28, 24, 36, 30, 44, 38, 52, 46, 60]} className="mt-4 h-16" strokeWidth={3} />
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-base font-bold">{t.dash.mostPerformed}</h3>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {t.campaign.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-soft text-[color:var(--color-soft-foreground)]">
                  <Flame className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.id}</div>
                </div>
                <span className="text-sm font-bold text-success">$63.04</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
