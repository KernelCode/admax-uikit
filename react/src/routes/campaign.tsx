import { ChevronDown, Link2, Pause, Play, Plus, Square } from "lucide-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { BarsChart, Sparkline } from "../components/charts";
import { StatusPill } from "../components/badge";
import { PageHeader } from "../components/page-header";
import { useI18n } from "../i18n";
import { cn } from "../lib/cn";

const barsUp = [
  { value: 30, up: true },
  { value: 52, up: true },
  { value: 40, up: false },
  { value: 64, up: true },
  { value: 48, up: true },
];
const insightUp = [10, 14, 11, 18, 15, 22];
const insightDown = [22, 16, 18, 12, 14, 9];

const statusLabel: Record<string, "running" | "paused" | "expired"> = {
  running: "running",
  paused: "paused",
  expired: "expired",
};

export function Campaign() {
  const { t } = useI18n();
  const c = t.common;

  return (
    <>
      <PageHeader
        title={t.campaign.title}
        subtitle={t.campaign.subtitle}
        actions={
          <>
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-card px-4 text-sm font-bold border border-border">
              {c.newest}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <Button>
              <Plus className="h-4 w-4" />
              {t.campaign.newCampaign}
            </Button>
          </>
        }
      />

      <div className="space-y-3">
        {t.campaign.items.map((item, i) => {
          const status = statusLabel[item.status] ?? "running";
          const up = i % 3 !== 0;
          return (
            <Card key={item.id} className="p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* identity */}
                <div className="min-w-0 lg:w-72">
                  <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-[color:var(--color-soft-foreground)]">
                    {item.id}
                  </span>
                  <div className="mt-2 truncate font-display font-bold">{item.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    ✓ {c.publishedOn} January 25, 2026
                  </div>
                </div>

                {/* mini candlestick + target */}
                <div className="flex items-center gap-4">
                  <div className="w-28">
                    <BarsChart data={barsUp} height={48} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-extrabold tabular-nums">45,324</div>
                    <div className="text-xs text-muted-foreground">{c.targetReached}</div>
                  </div>
                </div>

                {/* insight sparkline */}
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Sparkline
                      data={up ? insightUp : insightDown}
                      color={up ? "var(--color-success)" : "var(--color-danger)"}
                      area={false}
                    />
                  </div>
                  <div>
                    <div className={cn("font-display text-sm font-bold", up ? "text-success" : "text-danger")}>
                      {up ? "+2%" : "-2%"}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.userInsight}</div>
                  </div>
                </div>

                {/* link */}
                <a
                  href="#"
                  className="hidden items-center gap-1.5 truncate text-xs font-medium text-muted-foreground hover:text-foreground xl:flex"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  https://admax.io/campaign...
                </a>

                {/* status + controls */}
                <div className="flex items-center gap-2 lg:ms-auto">
                  <StatusPill status={status}>
                    {status === "running" ? c.running : status === "paused" ? c.paused : c.expired}
                  </StatusPill>
                  <div className="flex items-center gap-1">
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="Play">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="Pause">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="Stop">
                      <Square className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
