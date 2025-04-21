
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendData } from "@/types";
import { categories } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CategoryDistributionProps {
  trends: TrendData[];
}

export function CategoryDistribution({ trends }: CategoryDistributionProps) {
  // Calculate category distribution
  const categoryCounts: Record<string, number> = {};
  
  trends.forEach(trend => {
    categoryCounts[trend.category] = (categoryCounts[trend.category] || 0) + 1;
  });
  
  // Prepare data for the bar chart
  const chartData = Object.entries(categoryCounts)
    .map(([categoryId, count]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        name: category?.name || categoryId,
        value: count,
        color: category?.color || "#888888",
      };
    })
    .sort((a, b) => b.value - a.value); // Sort by count (descending)
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip 
                formatter={(value) => [`${value} trends`, "Count"]}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
