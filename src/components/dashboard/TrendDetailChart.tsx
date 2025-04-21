
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendData } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TrendDetailChartProps {
  trend: TrendData;
}

export function TrendDetailChart({ trend }: TrendDetailChartProps) {
  // Combine history and forecast data for the chart
  const chartData = [...trend.history, ...trend.forecast.slice(1)];
  
  // Find the index where forecast begins
  const forecastIndex = trend.history.length;
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">{trend.name}</h3>
          <p className="text-sm text-muted-foreground">
            Historical data and 14-day forecast prediction
          </p>
        </div>
        
        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4361ee" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7209b7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7209b7" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                interval={Math.ceil(chartData.length / 10)}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Popularity']}
                labelFormatter={formatDate}
              />
              <ReferenceLine 
                x={chartData[forecastIndex - 1]?.date} 
                stroke="#888" 
                strokeDasharray="3 3"
                label={{ value: 'Forecast Start', position: 'insideBottomLeft', fill: '#888', fontSize: 12 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4361ee" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name="Historical"
                isAnimationActive={true}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#7209b7" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 6 }}
                name="Forecast"
                isAnimationActive={true}
                data={chartData.slice(forecastIndex - 1)}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-4 text-xs">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-trend-blue mr-1"></div>
            <span className="text-muted-foreground">Historical Data</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-trend-purple mr-1"></div>
            <span className="text-muted-foreground">Predicted Trend</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
