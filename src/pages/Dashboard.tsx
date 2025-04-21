
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TrendFilters } from "@/components/dashboard/TrendFilters";
import { TrendCard } from "@/components/dashboard/TrendCard";
import { TrendDetailChart } from "@/components/dashboard/TrendDetailChart";
import { TrendMetricsCards } from "@/components/dashboard/TrendMetricsCards";
import { TrendInsights } from "@/components/dashboard/TrendInsights";
import { PredictionMetricsCard } from "@/components/dashboard/PredictionMetricsCard";
import { PlatformDistribution } from "@/components/visualization/PlatformDistribution";
import { CategoryDistribution } from "@/components/visualization/CategoryDistribution";
import { FilterState, TrendData, TrendInsight } from "@/types";
import { generateTrends, generateInsights, predictionMetrics } from "@/data/mockData";

const Dashboard = () => {
  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    categories: [],
    timeframe: "30d",
    sortBy: "popularity",
  });
  
  // Initialize trends data
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [insights, setInsights] = useState<TrendInsight[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load trend data
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const trendData = generateTrends();
      const insightData = generateInsights(trendData);
      
      setTrends(trendData);
      setInsights(insightData);
      setSelectedTrend(trendData[0]); // Select first trend by default
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter trends based on current filters
  const filteredTrends = trends.filter(trend => {
    // Filter by platform
    if (filters.platforms.length > 0 && !filters.platforms.includes(trend.platform)) {
      return false;
    }
    
    // Filter by category
    if (filters.categories.length > 0 && !filters.categories.includes(trend.category)) {
      return false;
    }
    
    // All filters passed
    return true;
  });
  
  // Sort trends based on selected sort option
  const sortedTrends = [...filteredTrends].sort((a, b) => {
    switch (filters.sortBy) {
      case "popularity":
        return b.popularity - a.popularity;
      case "growth":
        return b.growth - a.growth;
      case "sentiment":
        return b.sentiment - a.sentiment;
      default:
        return b.popularity - a.popularity;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Social Media Trend Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze current trends and predict future popularity across social platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-6">
              <TrendFilters 
                filters={filters}
                onChange={setFilters}
              />
              
              <PredictionMetricsCard 
                accuracy={predictionMetrics.accuracy}
                confidence={predictionMetrics.confidence}
                sampleSize={predictionMetrics.sampleSize}
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading trends data...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Overview Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedTrends.slice(0, 6).map(trend => (
                      <TrendCard 
                        key={trend.id} 
                        trend={trend}
                        onClick={() => setSelectedTrend(trend)}
                      />
                    ))}
                  </div>
                  
                  {/* Selected Trend Analysis */}
                  {selectedTrend && (
                    <div className="bg-muted/30 rounded-lg p-6 space-y-6 border">
                      <h2 className="text-xl font-bold">Trend Analysis</h2>
                      
                      <TrendMetricsCards trend={selectedTrend} />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TrendDetailChart trend={selectedTrend} />
                        <TrendInsights 
                          insights={insights.filter(insight => 
                            insight.trendId === selectedTrend.id || 
                            insight.relatedTrends.includes(selectedTrend.id)
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Distribution Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PlatformDistribution trends={trends} />
                    <CategoryDistribution trends={trends} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
