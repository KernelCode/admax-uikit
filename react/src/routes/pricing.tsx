import { Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { PageHeader } from "../components/page-header";
import { Switch } from "../components/switch";
import { useI18n } from "../i18n";
import { cn } from "../lib/cn";

export function Pricing() {
  const { t } = useI18n();
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <PageHeader title={t.pricing.title} subtitle={t.pricing.subtitle} />

      <div className="mb-8 flex items-center justify-center gap-3 text-sm font-bold">
        <span className={cn(!yearly && "text-foreground", yearly && "text-muted-foreground")}>{t.pricing.monthly}</span>
        <Switch checked={yearly} onChange={setYearly} aria-label="Toggle billing period" />
        <span className={cn(yearly && "text-foreground", !yearly && "text-muted-foreground")}>{t.pricing.yearly}</span>
        <Badge variant="success">-20%</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {t.pricing.plans.map((plan, i) => {
          const popular = i === 1;
          return (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col p-6",
                popular && "ring-2 ring-primary",
              )}
            >
              {popular && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-[var(--radius-sm)] brand-fill px-3 py-1 text-xs font-bold text-white rtl:translate-x-1/2">
                  {t.pricing.mostPopular}
                </span>
              )}
              <h3 className="font-display text-lg font-extrabold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="mb-1 text-sm text-muted-foreground">{t.pricing.perMonth}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={popular ? "primary" : "outline"} className="mt-6 w-full">
                {t.pricing.cta}
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
}
