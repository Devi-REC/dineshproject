import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun } from "lucide-react";
import { ApplianceForm } from "@/components/ApplianceForm";
import { ApplianceList } from "@/components/ApplianceList";
import { SummaryCards } from "@/components/SummaryCards";
import { EnergyChart } from "@/components/EnergyChart";
import { SolarToggle } from "@/components/SolarToggle";
import { EnergyFooter } from "@/components/EnergyFooter";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hours: number;
}

const Index = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [isSolarMode, setIsSolarMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadAppliances(session.user.id);
        loadProfile(session.user.id);
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadAppliances(session.user.id);
        loadProfile(session.user.id);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name, email")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
    } else if (data) {
      setProfile(data);
    }
  };

  const loadAppliances = async (userId: string) => {
    const { data, error } = await supabase
      .from("appliances")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading appliances",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setAppliances(data);
    }
  };

  const handleAddAppliance = async (appliance: { name: string; wattage: number; hours: number }) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("appliances")
      .insert({
        user_id: user.id,
        name: appliance.name,
        wattage: appliance.wattage,
        hours: appliance.hours,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding appliance",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setAppliances([data, ...appliances]);
      toast({
        title: "Appliance added",
        description: `${appliance.name} has been added successfully.`,
      });
    }
  };

  const handleRemoveAppliance = async (id: string) => {
    const { error } = await supabase
      .from("appliances")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error removing appliance",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setAppliances(appliances.filter((a) => a.id !== id));
      toast({
        title: "Appliance removed",
        description: "The appliance has been removed successfully.",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const calculations = useMemo(() => {
    const totalKwh = appliances.reduce((sum, app) => sum + (app.wattage * app.hours) / 1000, 0);
    const costPerKwh = 10;
    const dailyCost = totalKwh * costPerKwh;
    const monthlyCost = dailyCost * 30;
    const monthlyKwh = totalKwh * 30;
    const carbonEmissionFactor = 0.82;
    const carbonEmitted = monthlyKwh * carbonEmissionFactor;
    const solarSavings = isSolarMode ? monthlyCost * 0.7 : 0;
    const carbonSaved = isSolarMode ? carbonEmitted * 0.7 : 0;

    return { totalKwh, dailyCost, monthlyCost, solarSavings, carbonEmitted, carbonSaved };
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            {profile && (
              <ProfileDropdown
                userName={profile.name || "User"}
                userEmail={profile.email || ""}
                onLogout={handleLogout}
              />
            )}
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
            carbonEmitted={calculations.carbonEmitted}
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
