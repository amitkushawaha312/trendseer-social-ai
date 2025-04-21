
import { Card, CardContent } from "@/components/ui/card";
import { TrendData } from "@/types";
import { platforms, categories } from "@/data/mockData";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface TrendCardProps {
  trend: TrendData;
  onClick?: () => void;
}

export function TrendCard({ trend, onClick }: TrendCardProps) {
  const platform = platforms.find(p => p.id === trend.platform);
  const category = categories.find(c => c.id === trend.category);
  
  // Combine history and forecast for the chart
  const chartData = [...trend.history.slice(-14), ...trend.forecast.slice(1)];
  
  // Find the index where forecast starts (for the gradient)
  const forecastStartIndex = trend.history.length > 14 ? 14 : trend.history.length;
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{trend.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center">
                {platform?.icon} {platform?.name}
              </span>
              <span className="inline-flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: category?.color }}
                ></span>
                {category?.name}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{trend.popularity}</div>
            <div className={`text-sm ${trend.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend.growth > 0 ? '+' : ''}{trend.growth}%
            </div>
          </div>
        </div>
        
        <div className="h-16 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${trend.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset={forecastStartIndex / chartData.length} stopColor="#4361ee" stopOpacity={0.8} />
                  <stop offset={forecastStartIndex / chartData.length} stopColor="#7209b7" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={`url(#gradient-${trend.id})`}
                strokeWidth={2}
                dot={false}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow-sm text-xs">
                        <p>{payload[0].payload.date}</p>
                        <p className="font-medium">Value: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Past 30 days</span>
          <span>Forecast →</span>
        </div>
      </CardContent>
    </Card>
  );
}
