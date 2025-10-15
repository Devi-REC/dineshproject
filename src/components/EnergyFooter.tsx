import { Card } from "@/components/ui/card";
import { Lightbulb, Leaf, Recycle, Droplets } from "lucide-react";

const energyTips = [
  "Turn off lights when leaving a room to save up to 10% on your electricity bill",
  "Use LED bulbs - they consume 75% less energy than traditional incandescent bulbs",
  "Unplug devices when not in use to eliminate phantom power consumption",
  "Set your AC to 24°C instead of 20°C to reduce energy consumption by 30%",
  "Use natural light during the day and open curtains to reduce lighting needs",
  "Install solar panels to reduce dependency on grid electricity and save up to 70% on bills",
  "Use 5-star rated appliances for maximum energy efficiency",
  "Run washing machines and dishwashers only with full loads",
  "Regular maintenance of AC filters can improve efficiency by 15%",
  "Switch to inverter technology appliances for better power management",
];

const sustainabilityGoals = [
  {
    icon: Leaf,
    title: "Clean Energy Transition",
    description: "Switch to renewable energy sources like solar and wind power to reduce carbon footprint",
  },
  {
    icon: Recycle,
    title: "Circular Economy",
    description: "Reduce, reuse, and recycle electronic waste to minimize environmental impact",
  },
  {
    icon: Droplets,
    title: "Resource Conservation",
    description: "Optimize water and energy usage to preserve natural resources for future generations",
  },
];

export const EnergyFooter = () => {
  const randomTip = energyTips[Math.floor(Math.random() * energyTips.length)];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-eco shadow-medium border-0 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">💡 Energy Saving Tip</h3>
            <p className="text-white/95 leading-relaxed">{randomTip}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-sm text-white/80">🌍 Save Energy, Save Earth</p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          Sustainable Development Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sustainabilityGoals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.title}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-eco flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{goal.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
