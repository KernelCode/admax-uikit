import { Bell, Flame, Info, Search, Users } from "lucide-react";
import * as React from "react";
import { Avatar } from "../components/avatar";
import { Badge, StatusPill } from "../components/badge";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { BarsChart, Donut, LineChart, Sparkline } from "../components/charts";
import { Input, SearchInput } from "../components/input";
import { PageHeader } from "../components/page-header";
import {
  Checkbox,
  Pagination,
  Progress,
  RadioGroup,
  Select,
  Skeleton,
  Tabs,
  Textarea,
  Tooltip,
} from "../components/primitives";
import { StatCard } from "../components/stat-card";
import { Switch } from "../components/switch";
import { Table, TBody, TD, TH, THead, TR } from "../components/table";
import { useI18n } from "../i18n";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-extrabold tracking-tight">{title}</h2>
      <Card className="p-6">{children}</Card>
    </section>
  );
}

const brandScale: [string, string][] = [
  ["50", "#fff8e6"],
  ["100", "#ffefc2"],
  ["200", "#ffe095"],
  ["300", "#ffcd55"],
  ["400", "#fbb828"],
  ["500", "#f59e0b"],
  ["600", "#e2820a"],
  ["700", "#b9650a"],
  ["800", "#934f0e"],
  ["900", "#78410f"],
];
const statusScale = [
  { name: "accent", v: "var(--color-accent)" },
  { name: "success", v: "var(--color-success)" },
  { name: "danger", v: "var(--color-danger)" },
  { name: "info", v: "var(--color-info)" },
  { name: "grape", v: "var(--color-grape)" },
];

export function Showcase() {
  const { t } = useI18n();
  const s = t.components.sections;

  return (
    <>
      <PageHeader title={t.components.title} subtitle={t.components.subtitle} />

      <div className="space-y-10">
        <Section title={s.buttons}>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="success">Success</Button>
            <Button variant="ink">Ink</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="icon"><Bell className="h-4 w-4" /></Button>
          </div>
        </Section>

        <Section title={s.badges}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="slate">Slate</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StatusPill status="running">{t.common.running}</StatusPill>
            <StatusPill status="paused">{t.common.paused}</StatusPill>
            <StatusPill status="expired">{t.common.expired}</StatusPill>
          </div>
        </Section>

        <Section title={s.inputs}>
          <div className="grid max-w-xl gap-4">
            <Input placeholder="Default input" />
            <SearchInput placeholder={t.topbar.search} icon={<Search className="h-[18px] w-[18px]" />} />
          </div>
        </Section>

        <Section title={s.forms}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Select defaultValue="growth">
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="agency">Agency</option>
              </Select>
              <Textarea placeholder="Write a note…" />
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <Checkbox label="Email notifications" defaultChecked />
                <Checkbox label="SMS alerts" />
              </div>
              <RadioGroup
                defaultValue="all"
                options={[
                  { label: "All", value: "all" },
                  { label: "Running", value: "running" },
                  { label: "Paused", value: "paused" },
                ]}
              />
            </div>
          </div>
        </Section>

        <Section title={s.avatars}>
          <div className="flex flex-wrap items-center gap-5">
            <Avatar name="Louis Anderson" online />
            <Avatar name="Sara Khan" />
            <Avatar name="Admax Team" size={56} online />
            <div className="flex items-center gap-3">
              <Switch defaultChecked aria-label="on" />
              <Switch aria-label="off" />
            </div>
          </div>
        </Section>

        <Section title={s.cards}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label={t.dash.campaign} value="562" data={[14, 10, 16, 12, 18, 15, 20]} delta={8} icon={<Flame className="h-5 w-5" />} />
            <StatCard label={t.dash.audience} value="14,565k" data={[8, 12, 9, 14, 11, 16, 13]} delta={-3} color="var(--color-info)" icon={<Users className="h-5 w-5" />} />
            <Card className="p-5">
              <div className="text-sm text-muted-foreground">{t.dash.clickSummary}</div>
              <div className="mt-1 font-display text-2xl font-extrabold">867,123k</div>
              <Sparkline data={[20, 28, 24, 36, 30, 44, 38, 52]} className="mt-3" />
            </Card>
          </div>
        </Section>

        <Section title={s.charts}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-bold text-muted-foreground">LineChart</p>
              <LineChart
                labels={t.dash.weeks.slice(0, 6)}
                series={[
                  { label: "A", data: [12, 18, 14, 22, 19, 28], color: "var(--color-primary)" },
                  { label: "B", data: [18, 16, 22, 20, 26, 24], color: "var(--color-foreground)" },
                ]}
                height={180}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-muted-foreground">BarsChart</p>
              <BarsChart
                data={[
                  { value: 30, up: true },
                  { value: 52, up: true },
                  { value: 22, up: false },
                  { value: 64, up: true },
                  { value: 40, up: false },
                  { value: 70, up: true },
                ]}
              />
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="mb-2 text-sm font-bold text-muted-foreground">Donut</p>
                <Donut
                  segments={[
                    { value: 42, color: "var(--color-info)" },
                    { value: 28, color: "var(--color-success)" },
                    { value: 18, color: "var(--color-grape)" },
                    { value: 12, color: "var(--color-accent)" },
                  ]}
                >
                  <span className="font-display text-lg font-extrabold">67%</span>
                </Donut>
              </div>
              <div className="flex-1">
                <p className="mb-2 text-sm font-bold text-muted-foreground">Sparkline</p>
                <Sparkline data={[8, 14, 10, 18, 13, 22, 17, 26]} className="h-16" strokeWidth={3} />
              </div>
            </div>
          </div>
        </Section>

        <Section title={s.table}>
          <Table>
            <THead>
              <TR className="border-b">
                <TH>{t.spending.cols.adId}</TH>
                <TH>{t.spending.cols.date}</TH>
                <TH className="text-end">{t.spending.cols.total}</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {t.campaign.items.slice(0, 3).map((row, i) => (
                <TR key={row.id}>
                  <TD className="font-bold">{row.id}</TD>
                  <TD className="text-muted-foreground">January 25, 2026</TD>
                  <TD className="text-end tabular-nums font-bold">${(872.33 - i * 90).toFixed(2)}</TD>
                  <TD>
                    <StatusPill status={row.status as "running" | "paused" | "expired"}>
                      {row.status === "running" ? t.common.running : row.status === "paused" ? t.common.paused : t.common.expired}
                    </StatusPill>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Pagination page={1} total={3} />
          </div>
        </Section>

        <Section title={s.feedback}>
          <div className="space-y-6">
            <Tabs
              tabs={[
                { id: "overview", label: "Overview", content: "Overview tab content." },
                { id: "activity", label: "Activity", content: "Activity tab content." },
                { id: "reports", label: "Reports", content: "Reports tab content." },
              ]}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground">Progress</p>
                <Progress value={72} />
                <Progress value={38} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground">Skeleton</p>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip label="More info">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
                  <Info className="h-4 w-4" /> Hover me
                </span>
              </Tooltip>
            </div>
          </div>
        </Section>

        <Section title={s.colors}>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {brandScale.map(([n, hex]) => (
                <div key={n}>
                  <div className="h-12 rounded-[var(--radius-sm)] border border-border" style={{ background: hex }} />
                  <div className="mt-1 text-center text-[11px] font-medium text-muted-foreground">{n}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {statusScale.map((c) => (
                <div key={c.name} className="text-center">
                  <div className="h-12 w-20 rounded-[var(--radius-sm)]" style={{ background: c.v }} />
                  <div className="mt-1 text-[11px] font-medium text-muted-foreground">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title={s.typography}>
          <div className="space-y-2">
            <p className="font-display text-4xl font-extrabold tracking-tight">Display / Extrabold</p>
            <p className="font-display text-2xl font-bold">Heading / Bold</p>
            <p className="text-base">Body — Plus Jakarta Sans renders the interface text.</p>
            <p className="text-sm text-muted-foreground">Muted — secondary helper copy.</p>
            <p className="font-mono text-sm">mono — JetBrains Mono 1234.56</p>
          </div>
        </Section>
      </div>
    </>
  );
}
