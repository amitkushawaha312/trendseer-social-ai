
export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface TrendData {
  id: string;
  name: string;
  platform: string;
  category: string;
  popularity: number;
  growth: number;
  sentiment: number;
  timeframe: string;
  history: TimeSeriesPoint[];
  forecast: TimeSeriesPoint[];
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface CategoryData {
  id: string;
  name: string;
  color: string;
}

export interface PredictionMetrics {
  accuracy: number;
  confidence: number;
  sampleSize: number;
}

export interface TrendInsight {
  id: string;
  trendId: string;
  title: string;
  description: string;
  impactScore: number;
  relatedTrends: string[];
}

export interface FilterState {
  platforms: string[];
  categories: string[];
  timeframe: string;
  sortBy: string;
}

export type TimeframeOption = '1d' | '7d' | '30d' | '90d';
