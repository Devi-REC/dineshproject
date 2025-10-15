import { useState, useMemo } from "react";
import { Sun } from "lucide-react";
import { ApplianceForm } from "@/components/ApplianceForm";
import { ApplianceList } from "@/components/ApplianceList";
import { SummaryCards } from "@/components/SummaryCards";
import { EnergyChart } from "@/components/EnergyChart";
import { SolarToggle } from "@/components/SolarToggle";
import { EnergyFooter } from "@/components/EnergyFooter";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hours: number;
}

const Index = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [isSolarMode, setIsSolarMode] = useState(false);

  const handleAddAppliance = (appliance: { name: string; wattage: number; hours: number }) => {
    const newAppliance: Appliance = {
      id: Date.now().toString(),
      ...appliance,
    };
    setAppliances([...appliances, newAppliance]);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const calculations = useMemo(() => {
    const totalKwh = appliances.reduce((sum, app) => sum + (app.wattage * app.hours) / 1000, 0);
    const costPerKwh = 10;
    const dailyCost = totalKwh * costPerKwh;
    const monthlyCost = dailyCost * 30;
    const solarSavings = isSolarMode ? monthlyCost * 0.7 : 0;
    const carbonSaved = isSolarMode ? totalKwh * 30 * 0.7 : 0;

    return { totalKwh, dailyCost, monthlyCost, solarSavings, carbonSaved };
  }, [appliances, isSolarMode]);

  const chartData = useMemo(() => {
    const hourlyData = [];
    const peakFactor = calculations.totalKwh > 0 ? calculations.totalKwh / 24 : 0;

    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0") + ":00";
      let consumption = peakFactor;

      if (i >= 6 && i <= 9) consumption *= 1.5;
      if (i >= 18 && i <= 22) consumption *= 1.8;
      if (i >= 0 && i <= 5) consumption *= 0.3;

      const solarOffset = isSolarMode ? consumption * 0.7 : 0;

      hourlyData.push({
        hour,
        consumption: Number(consumption.toFixed(3)),
        solarOffset: Number(solarOffset.toFixed(3)),
      });
    }

    return hourlyData;
  }, [calculations.totalKwh, isSolarMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-eco shadow-medium sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Smart Energy Dashboard</h1>
                <p className="text-white/90 text-sm">Track, analyze & optimize your power consumption</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Solar Toggle */}
        <div className="animate-fade-in">
          <SolarToggle isSolarMode={isSolarMode} onToggle={setIsSolarMode} />
        </div>

        {/* Summary Cards */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <SummaryCards
            totalKwh={calculations.totalKwh}
            dailyCost={calculations.dailyCost}
            monthlyCost={calculations.monthlyCost}
            solarSavings={calculations.solarSavings}
            carbonSaved={calculations.carbonSaved}
            isSolarMode={isSolarMode}
          />
        </div>

        {/* Chart */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <EnergyChart data={chartData} isSolarMode={isSolarMode} />
        </div>

        {/* Input and List Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="lg:col-span-1">
            <ApplianceForm onAddAppliance={handleAddAppliance} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Your Appliances</h2>
            <ApplianceList appliances={appliances} onRemoveAppliance={handleRemoveAppliance} />
          </div>
        </div>

        {/* Footer with Tips */}
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <EnergyFooter />
        </div>
      </main>
    </div>
  );
};

export default Index;
