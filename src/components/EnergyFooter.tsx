import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const energyTips = [
  "Turn off lights when leaving a room to save up to 10% on your electricity bill",
  "Use LED bulbs - they consume 75% less energy than traditional incandescent bulbs",
  "Unplug devices when not in use to eliminate phantom power consumption",
  "Set your AC to 24°C instead of 20°C to reduce energy consumption by 30%",
  "Use natural light during the day and open curtains to reduce lighting needs",
];

export const EnergyFooter = () => {
  const randomTip = energyTips[Math.floor(Math.random() * energyTips.length)];

  return (
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
  );
};
