import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface EnergyChartProps {
  data: Array<{ hour: string; consumption: number; solarOffset?: number }>;
  isSolarMode: boolean;
}

export const EnergyChart = ({ data, isSolarMode }: EnergyChartProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-medium border-border/50">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        Energy Consumption Over 24 Hours
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="hour"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            label={{ value: "kWh", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Grid Power"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
          {isSolarMode && (
            <Line
              type="monotone"
              dataKey="solarOffset"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              name="Solar Power"
              dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
