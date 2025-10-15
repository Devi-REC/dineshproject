import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ApplianceFormProps {
  onAddAppliance: (appliance: { name: string; wattage: number; hours: number }) => void;
}

export const ApplianceForm = ({ onAddAppliance }: ApplianceFormProps) => {
  const [name, setName] = useState("");
  const [wattage, setWattage] = useState("");
  const [hours, setHours] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && wattage && hours) {
      onAddAppliance({
        name,
        wattage: parseFloat(wattage),
        hours: parseFloat(hours),
      });
      setName("");
      setWattage("");
      setHours("");
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add Appliance
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Appliance Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., LED Bulb"
            required
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wattage">Power (Watts)</Label>
          <Input
            id="wattage"
            type="number"
            step="0.1"
            value={wattage}
            onChange={(e) => setWattage(e.target.value)}
            placeholder="e.g., 10"
            required
            className="bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hours">Usage (Hours/Day)</Label>
          <Input
            id="hours"
            type="number"
            step="0.1"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 5"
            required
            className="bg-background"
          />
        </div>
        <Button type="submit" className="w-full bg-gradient-eco hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Add Appliance
        </Button>
      </form>
    </Card>
  );
};
