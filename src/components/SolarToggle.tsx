import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun } from "lucide-react";

interface SolarToggleProps {
  isSolarMode: boolean;
  onToggle: (checked: boolean) => void;
}

export const SolarToggle = ({ isSolarMode, onToggle }: SolarToggleProps) => {
  return (
    <Card className="p-6 bg-gradient-solar shadow-medium border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <div>
            <Label htmlFor="solar-mode" className="text-lg font-semibold text-white cursor-pointer">
              Switch to Solar
            </Label>
            <p className="text-sm text-white/90 mt-1">
              {isSolarMode ? "Solar mode active - saving energy!" : "Enable solar to see potential savings"}
            </p>
          </div>
        </div>
        <Switch
          id="solar-mode"
          checked={isSolarMode}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </Card>
  );
};
