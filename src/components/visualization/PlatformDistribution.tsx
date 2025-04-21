
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendData } from "@/types";
import { platforms } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PlatformDistributionProps {
  trends: TrendData[];
}

export function PlatformDistribution({ trends }: PlatformDistributionProps) {
  // Calculate platform distribution
  const platformCounts: Record<string, number> = {};
  
  trends.forEach(trend => {
    platformCounts[trend.platform] = (platformCounts[trend.platform] || 0) + 1;
  });
  
  // Prepare data for the pie chart
  const chartData = Object.entries(platformCounts).map(([platformId, count]) => {
    const platform = platforms.find(p => p.id === platformId);
    return {
      name: platform?.name || platformId,
      value: count,
      color: platform?.color || "#888888",
    };
  });
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} trends`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {chartData.map((platform) => (
            <div key={platform.name} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: platform.color }}
              ></div>
              <span className="text-xs">{platform.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
