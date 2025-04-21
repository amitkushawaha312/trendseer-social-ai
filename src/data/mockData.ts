
import { CategoryData, SocialPlatform, TimeSeriesPoint, TrendData, TrendInsight } from "@/types";

// Social platforms
export const platforms: SocialPlatform[] = [
  { id: "twitter", name: "Twitter", icon: "🐦", color: "#1DA1F2" },
  { id: "instagram", name: "Instagram", icon: "📷", color: "#C13584" },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "#000000" },
  { id: "youtube", name: "YouTube", icon: "▶️", color: "#FF0000" },
  { id: "facebook", name: "Facebook", icon: "👍", color: "#4267B2" },
];

// Content categories
export const categories: CategoryData[] = [
  { id: "entertainment", name: "Entertainment", color: "#FF6B6B" },
  { id: "technology", name: "Technology", color: "#4CC9F0" },
  { id: "fashion", name: "Fashion", color: "#F72585" },
  { id: "food", name: "Food", color: "#FFBE0B" },
  { id: "fitness", name: "Fitness", color: "#06D6A0" },
  { id: "education", name: "Education", color: "#7209B7" },
  { id: "travel", name: "Travel", color: "#4361EE" },
  { id: "gaming", name: "Gaming", color: "#9B5DE5" },
];

// Generate history data points
const generateHistoryData = (startValue: number, volatility: number, days: number): TimeSeriesPoint[] => {
  const now = new Date();
  const data: TimeSeriesPoint[] = [];
  let currentValue = startValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Apply some randomness to the value
    const change = (Math.random() - 0.48) * volatility;
    currentValue = Math.max(0, currentValue + change);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
};

// Generate forecast data points
const generateForecastData = (historyData: TimeSeriesPoint[], volatility: number, days: number): TimeSeriesPoint[] => {
  const lastPoint = historyData[historyData.length - 1];
  const startDate = new Date(lastPoint.date);
  const data: TimeSeriesPoint[] = [lastPoint]; // Include the last history point for continuity
  
  let currentValue = lastPoint.value;
  const trend = (historyData[historyData.length - 1].value - historyData[0].value) / historyData.length;
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Apply some randomness but maintain overall trend
    const change = trend + (Math.random() - 0.4) * volatility;
    currentValue = Math.max(0, currentValue + change);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
    });
  }
  
  return data;
};

// Generate mock trend data
export const generateTrends = (): TrendData[] => {
  const trends: TrendData[] = [
    {
      id: "1",
      name: "#AIRevolution",
      platform: "twitter",
      category: "technology",
      popularity: 87,
      growth: 23,
      sentiment: 78,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "2",
      name: "Sustainable Fashion",
      platform: "instagram",
      category: "fashion",
      popularity: 76,
      growth: 15,
      sentiment: 92,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "3",
      name: "Plant-Based Recipes",
      platform: "tiktok",
      category: "food",
      popularity: 92,
      growth: 31,
      sentiment: 89,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "4",
      name: "Metaverse Gaming",
      platform: "youtube",
      category: "gaming",
      popularity: 81,
      growth: 28,
      sentiment: 74,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "5",
      name: "Work From Anywhere",
      platform: "twitter",
      category: "technology",
      popularity: 79,
      growth: 18,
      sentiment: 85,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "6",
      name: "15-Minute HIIT",
      platform: "instagram",
      category: "fitness",
      popularity: 85,
      growth: 12,
      sentiment: 88,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "7",
      name: "#LearnOnTikTok",
      platform: "tiktok",
      category: "education",
      popularity: 88,
      growth: 27,
      sentiment: 91,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "8",
      name: "Virtual Travel",
      platform: "youtube",
      category: "travel",
      popularity: 72,
      growth: 9,
      sentiment: 83,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "9",
      name: "Data Privacy",
      platform: "twitter",
      category: "technology",
      popularity: 68,
      growth: 14,
      sentiment: 65,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "10",
      name: "Streetwear 2025",
      platform: "instagram",
      category: "fashion",
      popularity: 91,
      growth: 33,
      sentiment: 87,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "11",
      name: "Cloud Gaming",
      platform: "youtube",
      category: "gaming",
      popularity: 83,
      growth: 22,
      sentiment: 79,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "12",
      name: "#CleanBeauty",
      platform: "instagram",
      category: "fashion",
      popularity: 81,
      growth: 19,
      sentiment: 90,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "13",
      name: "Remote Education",
      platform: "facebook",
      category: "education",
      popularity: 74,
      growth: 11,
      sentiment: 82,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "14",
      name: "Augmented Reality",
      platform: "tiktok",
      category: "technology",
      popularity: 77,
      growth: 25,
      sentiment: 76,
      timeframe: "30d",
      history: [],
      forecast: [],
    },
    {
      id: "15",
      name: "Micro Workouts",
      platform: "instagram",
      category: "fitness",
      popularity: 78,
      growth: 16,
      sentiment: 84,
      timeframe: "30d",
      history: [],
      forecast: [],
    }
  ];

  // Generate history and forecast data for each trend
  return trends.map(trend => {
    const volatility = 5 + Math.random() * 10; // Different volatility for each trend
    const startValue = 30 + Math.random() * 50; // Random starting point
    
    const history = generateHistoryData(startValue, volatility, 30);
    const forecast = generateForecastData(history, volatility * 1.2, 14);
    
    return {
      ...trend,
      history,
      forecast
    };
  });
};

// Mock insights
export const generateInsights = (trends: TrendData[]): TrendInsight[] => {
  return [
    {
      id: "1",
      trendId: "1",
      title: "AI Tools Revolutionizing Content Creation",
      description: "The rapid adoption of AI tools for content generation has created a new paradigm in digital marketing. Brands leveraging these technologies are seeing 40% higher engagement rates.",
      impactScore: 87,
      relatedTrends: ["5", "14"],
    },
    {
      id: "2",
      trendId: "2",
      title: "Ethical Production Dominates Fashion Conversations",
      description: "Consumer awareness about sustainable production methods has reached an all-time high, with 68% of Generation Z stating they research a brand's ethical practices before purchasing.",
      impactScore: 76,
      relatedTrends: ["12"],
    },
    {
      id: "3",
      trendId: "3",
      title: "Plant-Based Diets Mainstream in 2025",
      description: "The plant-based food trend continues to accelerate beyond niche audiences, with recipe searches up 215% year over year and major food chains introducing new plant-based options.",
      impactScore: 82,
      relatedTrends: [],
    },
    {
      id: "4",
      trendId: "4",
      title: "Gaming Merges with Virtual Worlds",
      description: "The line between gaming and virtual socializing continues to blur, with players spending 35% more time in game environments for non-gaming activities compared to last year.",
      impactScore: 79,
      relatedTrends: ["11", "14"],
    },
    {
      id: "5",
      trendId: "7",
      title: "Educational Content Dominates Short-Form Video",
      description: "Educational content creators have seen their follower counts grow 3x faster than entertainment accounts, signaling a significant shift in how people use social platforms for learning.",
      impactScore: 85,
      relatedTrends: ["13"],
    },
  ];
};

// Prediction accuracy metrics
export const predictionMetrics = {
  accuracy: 83.2,
  confidence: 76.5,
  sampleSize: 12500,
};
