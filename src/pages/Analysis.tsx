
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryDistribution } from "@/components/visualization/CategoryDistribution";
import { PlatformDistribution } from "@/components/visualization/PlatformDistribution";
import { generateTrends, platforms, categories } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from "recharts";
import { TrendData } from "@/types";

const Analysis = () => {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");
  const [isLoading, setIsLoading] = useState(true);
  
  // Load trend data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const trendData = generateTrends();
      setTrends(trendData);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Get top growing trends
  const topGrowingTrends = [...trends]
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 5);
  
  // Get top popular trends
  const topPopularTrends = [...trends]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);
  
  // Prepare category performance data
  const categoryPerformance = categories.map(category => {
    const categoryTrends = trends.filter(trend => trend.category === category.id);
    const avgGrowth = categoryTrends.length > 0
      ? categoryTrends.reduce((sum, trend) => sum + trend.growth, 0) / categoryTrends.length
      : 0;
    const avgPopularity = categoryTrends.length > 0
      ? categoryTrends.reduce((sum, trend) => sum + trend.popularity, 0) / categoryTrends.length
      : 0;
    
    return {
      name: category.name,
      growth: parseFloat(avgGrowth.toFixed(1)),
      popularity: parseFloat(avgPopularity.toFixed(1)),
      color: category.color,
    };
  }).sort((a, b) => b.growth - a.growth);
  
  // Prepare platform performance data
  const platformPerformance = platforms.map(platform => {
    const platformTrends = trends.filter(trend => trend.platform === platform.id);
    const avgGrowth = platformTrends.length > 0
      ? platformTrends.reduce((sum, trend) => sum + trend.growth, 0) / platformTrends.length
      : 0;
    const avgPopularity = platformTrends.length > 0
      ? platformTrends.reduce((sum, trend) => sum + trend.popularity, 0) / platformTrends.length
      : 0;
    
    return {
      name: platform.name,
      growth: parseFloat(avgGrowth.toFixed(1)),
      popularity: parseFloat(avgPopularity.toFixed(1)),
      color: platform.color,
    };
  }).sort((a, b) => b.popularity - a.popularity);
  
  // Aggregate trends by date for time series
  const getTimeSeriesData = () => {
    const dateMap: Record<string, { date: string; avgPopularity: number; trendCount: number }> = {};
    
    trends.forEach(trend => {
      trend.history.forEach(point => {
        if (!dateMap[point.date]) {
          dateMap[point.date] = {
            date: point.date,
            avgPopularity: 0,
            trendCount: 0,
          };
        }
        
        dateMap[point.date].avgPopularity += point.value;
        dateMap[point.date].trendCount += 1;
      });
    });
    
    return Object.values(dateMap)
      .map(item => ({
        date: item.date,
        value: item.trendCount > 0 ? item.avgPopularity / item.trendCount : 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const timeSeriesData = getTimeSeriesData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trend Analysis</h1>
            <p className="text-muted-foreground">
              Deep dive into social media trend patterns and predictions
            </p>
          </div>
          
          {/* Timeframe Selector */}
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Timeframe:</span>
            <div className="flex gap-2">
              <Button
                variant={timeframe === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("7d")}
                className="text-xs"
              >
                7 Days
              </Button>
              <Button
                variant={timeframe === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("30d")}
                className="text-xs"
              >
                30 Days
              </Button>
              <Button
                variant={timeframe === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("90d")}
                className="text-xs"
              >
                90 Days
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading analysis data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Trends Analyzed</h3>
                      <div className="text-4xl font-bold">{trends.length}</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Across {platforms.length} platforms
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Growth Rate</h3>
                      <div className="text-4xl font-bold">
                        {parseFloat((trends.reduce((sum, trend) => sum + trend.growth, 0) / trends.length).toFixed(1))}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Over the last 30 days
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Growing Category</h3>
                      <div className="text-4xl font-bold">
                        {categoryPerformance[0]?.name}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {categoryPerformance[0]?.growth}% avg. growth
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Trend History Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Overall Trend Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timeSeriesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={formatDate}
                          interval={Math.ceil(timeSeriesData.length / 8)}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${parseFloat(value.toString()).toFixed(1)}`, 'Average Popularity']}
                          labelFormatter={(label) => formatDate(label as string)}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#4361ee" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Trends */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Growing Trends */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Top Growing Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topGrowingTrends.map(trend => ({
                            name: trend.name,
                            growth: trend.growth,
                            platform: platforms.find(p => p.id === trend.platform)?.name,
                            color: categories.find(c => c.id === trend.category)?.color,
                          }))}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" domain={[0, 'dataMax + 5']} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            width={100}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Growth Rate']}
                            labelFormatter={(name) => `${name}`}
                          />
                          <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
                            {topGrowingTrends.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={categories.find(c => c.id === entry.category)?.color || '#888'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Top Popular Trends */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Most Popular Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topPopularTrends.map(trend => ({
                            name: trend.name,
                            popularity: trend.popularity,
                            platform: platforms.find(p => p.id === trend.platform)?.name,
                            color: categories.find(c => c.id === trend.category)?.color,
                          }))}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            width={100}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}`, 'Popularity Score']}
                            labelFormatter={(name) => `${name}`}
                          />
                          <Bar dataKey="popularity" radius={[0, 4, 4, 0]}>
                            {topPopularTrends.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={categories.find(c => c.id === entry.category)?.color || '#888'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Category Performance */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Category Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryPerformance}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          name="Avg. Growth Rate (%)" 
                          dataKey="growth" 
                          radius={[4, 4, 0, 0]}
                        >
                          {categoryPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                        <Bar 
                          name="Avg. Popularity Score" 
                          dataKey="popularity" 
                          radius={[4, 4, 0, 0]}
                          opacity={0.6}
                        >
                          {categoryPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Platform Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PlatformDistribution trends={trends} />
                <CategoryDistribution trends={trends} />
              </div>
              
              {/* Technical Overview */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Technical Methodology</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Data Collection</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        The system collects data from major social media platforms using their APIs, performing sentiment analysis, engagement metrics tracking, and content categorization.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Machine Learning Models</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trend predictions use ensemble methods combining linear regression, ARIMA time-series models, and neural networks to forecast future popularity based on historical patterns.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Evaluation Metrics</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Model performance is evaluated using Mean Absolute Error (MAE), Mean Absolute Percentage Error (MAPE), and R² score to ensure prediction accuracy.
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border mt-4">
                      <h3 className="font-semibold mb-2">Implementation Notes</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Social media data collection requires valid API keys and adherence to rate limits</li>
                        <li>• Sentiment analysis uses pretrained NLP models fine-tuned on social media content</li>
                        <li>• Prediction confidence scores are calculated based on historical accuracy</li>
                        <li>• The system refreshes data every 24 hours to maintain prediction accuracy</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
