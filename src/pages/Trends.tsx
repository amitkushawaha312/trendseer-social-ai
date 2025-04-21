
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateTrends, platforms, categories } from "@/data/mockData";
import { TrendData } from "@/types";
import { getMomentumScore, sentimentTrend } from "@/utils/predictions";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SentimentGauge } from "@/components/visualization/SentimentGauge";

const Trends = () => {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [filteredTrends, setFilteredTrends] = useState<TrendData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrend, setActiveTrend] = useState<TrendData | null>(null);
  
  // Load trend data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const trendData = generateTrends();
      setTrends(trendData);
      setFilteredTrends(trendData);
      setActiveTrend(trendData[0]);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter trends when search/filters change
  useEffect(() => {
    let results = trends;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(trend => 
        trend.name.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(trend => trend.category === selectedCategory);
    }
    
    // Apply platform filter
    if (selectedPlatform) {
      results = results.filter(trend => trend.platform === selectedPlatform);
    }
    
    setFilteredTrends(results);
    
    // If active trend is filtered out, select first available trend
    if (activeTrend && !results.some(t => t.id === activeTrend.id) && results.length > 0) {
      setActiveTrend(results[0]);
    }
  }, [searchQuery, selectedCategory, selectedPlatform, trends, activeTrend]);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Trend Explorer</h1>
            <p className="text-muted-foreground">
              Discover and analyze trending topics across social media platforms
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-muted/30 p-4 rounded-lg border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search trends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div>
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={selectedPlatform || ""}
                    onChange={(e) => setSelectedPlatform(e.target.value || null)}
                  >
                    <option value="">All Platforms</option>
                    {platforms.map(platform => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedPlatform(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trends data...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trends List */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="font-semibold text-lg">
                  {filteredTrends.length} {filteredTrends.length === 1 ? 'Trend' : 'Trends'} Found
                </h2>
                
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {filteredTrends.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No trends match your search criteria
                    </div>
                  ) : (
                    filteredTrends.map(trend => {
                      const platform = platforms.find(p => p.id === trend.platform);
                      const category = categories.find(c => c.id === trend.category);
                      const isActive = activeTrend?.id === trend.id;
                      
                      return (
                        <Card 
                          key={trend.id}
                          className={`cursor-pointer transition-all ${
                            isActive ? 'border-primary ring-1 ring-primary' : ''
                          }`}
                          onClick={() => setActiveTrend(trend)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{trend.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    {platform?.icon} {platform?.name}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <span 
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: category?.color }}
                                    ></span>
                                    {category?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold">{trend.popularity}</div>
                                <div className={`text-sm ${trend.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {trend.growth > 0 ? '+' : ''}{trend.growth}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
              
              {/* Trend Detail */}
              <div className="lg:col-span-2">
                {activeTrend ? (
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <h2 className="text-2xl font-bold">{activeTrend.name}</h2>
                            
                            <div className="flex flex-wrap gap-3 mt-2">
                              {/* Platform */}
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
                                {platforms.find(p => p.id === activeTrend.platform)?.icon}{' '}
                                {platforms.find(p => p.id === activeTrend.platform)?.name}
                              </div>
                              
                              {/* Category */}
                              <div 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: categories.find(c => c.id === activeTrend.category)?.color }}
                              >
                                {categories.find(c => c.id === activeTrend.category)?.name}
                              </div>
                              
                              {/* Sentiment */}
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                sentimentTrend(activeTrend) === 'positive' ? 'bg-green-100 text-green-800' :
                                sentimentTrend(activeTrend) === 'negative' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {sentimentTrend(activeTrend) === 'positive' ? 'Positive' :
                                 sentimentTrend(activeTrend) === 'negative' ? 'Negative' :
                                 'Neutral'} Sentiment
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold">{activeTrend.popularity}</div>
                              <div className="text-xs text-muted-foreground">Popularity</div>
                            </div>
                            
                            <div className="text-center">
                              <div className={`text-3xl font-bold ${activeTrend.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {activeTrend.growth > 0 ? '+' : ''}{activeTrend.growth}%
                              </div>
                              <div className="text-xs text-muted-foreground">Growth</div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-3xl font-bold">{getMomentumScore(activeTrend)}</div>
                              <div className="text-xs text-muted-foreground">Momentum</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-4">Trend Trajectory</h3>
                            
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                  data={[...activeTrend.history, ...activeTrend.forecast.slice(1)]}
                                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    dataKey="date" 
                                    tickFormatter={formatDate}
                                    interval={Math.ceil(activeTrend.history.length / 6)}
                                  />
                                  <YAxis />
                                  <Tooltip 
                                    formatter={(value) => [`${value}`, 'Value']}
                                    labelFormatter={(label) => formatDate(label as string)}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#4361ee" 
                                    strokeWidth={2}
                                    data={activeTrend.history}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#7209b7" 
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    data={[
                                      activeTrend.history[activeTrend.history.length - 1], 
                                      ...activeTrend.forecast.slice(1)
                                    ]}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <div className="w-3 h-1 bg-trend-blue rounded mr-1"></div>
                                <span>Historical</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-1 bg-trend-purple rounded mr-1 border-dashed"></div>
                                <span>Forecast</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <SentimentGauge sentiment={activeTrend.sentiment} />
                      </div>
                    </div>
                    
                    {/* Trend Insights */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Trend Analysis</h3>
                        
                        <div className="space-y-4 text-sm">
                          <div>
                            <h4 className="font-medium">Growth Trajectory</h4>
                            <p className="text-muted-foreground mt-1">
                              {activeTrend.growth > 25 ? (
                                `This trend is showing explosive growth (${activeTrend.growth}%) and is likely to continue its upward trajectory. It's currently in a viral growth phase.`
                              ) : activeTrend.growth > 10 ? (
                                `This trend has strong momentum with ${activeTrend.growth}% growth rate. It's gaining significant traction and likely to continue growing steadily.`
                              ) : activeTrend.growth > 0 ? (
                                `This trend is showing modest growth at ${activeTrend.growth}%. It has stable interest but isn't experiencing viral uptake.`
                              ) : (
                                `This trend is declining with ${activeTrend.growth}% negative growth. It appears to be past its peak popularity.`
                              )}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Platform Context</h4>
                            <p className="text-muted-foreground mt-1">
                              This trend is performing particularly well on {platforms.find(p => p.id === activeTrend.platform)?.name}, 
                              where it ranks in the top {Math.floor(Math.random() * 20) + 10}% of all content in the 
                              {' '}{categories.find(c => c.id === activeTrend.category)?.name} category.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Prediction Confidence</h4>
                            <p className="text-muted-foreground mt-1">
                              Based on historical performance and current momentum, our prediction model has a
                              {' '}{activeTrend.sentiment > 75 ? 'high' : activeTrend.sentiment > 50 ? 'moderate' : 'low'} confidence
                              {' '}in the projected trajectory for this trend. The forecast takes into account seasonal patterns and platform-specific factors.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Select a trend to view detailed analysis
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trends;
