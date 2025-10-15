import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Refrigerator, Wind, AirVent, Tv, Zap, Trash2 } from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hours: number;
}

interface ApplianceListProps {
  appliances: Appliance[];
  onRemoveAppliance: (id: string) => void;
}

const getApplianceIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("bulb") || lowerName.includes("light")) return Lightbulb;
  if (lowerName.includes("fridge") || lowerName.includes("refrigerator")) return Refrigerator;
  if (lowerName.includes("fan")) return Wind;
  if (lowerName.includes("ac") || lowerName.includes("air")) return AirVent;
  if (lowerName.includes("tv") || lowerName.includes("television")) return Tv;
  return Zap;
};

export const ApplianceList = ({ appliances, onRemoveAppliance }: ApplianceListProps) => {
  if (appliances.length === 0) {
    return (
      <Card className="p-8 bg-gradient-card shadow-soft border-border/50 text-center">
        <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground">No appliances added yet. Start by adding your first appliance!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {appliances.map((appliance) => {
        const Icon = getApplianceIcon(appliance.name);
        const dailyKwh = (appliance.wattage * appliance.hours) / 1000;

        return (
          <Card
            key={appliance.id}
            className="p-4 bg-gradient-card shadow-soft border-border/50 hover:shadow-medium transition-all duration-300 animate-slide-up"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{appliance.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    <span>{appliance.wattage}W</span>
                    <span>•</span>
                    <span>{appliance.hours}h/day</span>
                    <span>•</span>
                    <span className="font-medium text-primary">{dailyKwh.toFixed(2)} kWh/day</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveAppliance(appliance.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
