import { Card } from "@/components/ui/card";
import { Zap, DollarSign, TrendingDown, Leaf } from "lucide-react";

interface SummaryCardsProps {
  totalKwh: number;
  dailyCost: number;
  monthlyCost: number;
  solarSavings: number;
  carbonSaved: number;
  isSolarMode: boolean;
}

export const SummaryCards = ({
  totalKwh,
  dailyCost,
  monthlyCost,
  solarSavings,
  carbonSaved,
  isSolarMode,
}: SummaryCardsProps) => {
  const cards = [
    {
      title: "Total Consumption",
      value: `${totalKwh.toFixed(2)} kWh`,
      subtitle: "per day",
      icon: Zap,
      gradient: "bg-gradient-eco",
    },
    {
      title: "Daily Cost",
      value: `₹${dailyCost.toFixed(2)}`,
      subtitle: "at ₹10/kWh",
      icon: DollarSign,
      gradient: "bg-gradient-sky",
    },
    {
      title: "Monthly Cost",
      value: `₹${monthlyCost.toFixed(2)}`,
      subtitle: "estimated",
      icon: DollarSign,
      gradient: "bg-gradient-solar",
    },
  ];

  if (isSolarMode) {
    cards.push(
      {
        title: "Solar Savings",
        value: `₹${solarSavings.toFixed(2)}`,
        subtitle: "per month",
        icon: TrendingDown,
        gradient: "bg-gradient-eco",
      },
      {
        title: "Carbon Saved",
        value: `${carbonSaved.toFixed(1)} kg`,
        subtitle: "CO₂ per month",
        icon: Leaf,
        gradient: "bg-gradient-solar",
      }
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="p-6 bg-gradient-card shadow-medium border-border/50 hover:shadow-glow transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.gradient} flex items-center justify-center shadow-soft`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-foreground mb-1">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          </Card>
        );
      })}
    </div>
  );
};
