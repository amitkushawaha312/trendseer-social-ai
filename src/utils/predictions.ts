
import { TrendData, TimeSeriesPoint } from "@/types";

// Simple moving average
export function calculateSMA(data: TimeSeriesPoint[], period: number): number[] {
  const sma: number[] = [];
  
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].value;
    }
    sma.push(sum / period);
  }
  
  return sma;
}

// Exponential moving average
export function calculateEMA(data: TimeSeriesPoint[], period: number): number[] {
  const ema: number[] = [];
  const k = 2 / (period + 1);
  
  // Start with SMA for the first value
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i].value;
  }
  
  ema.push(sum / period);
  
  // Calculate EMA for the rest
  for (let i = period; i < data.length; i++) {
    ema.push(data[i].value * k + ema[ema.length - 1] * (1 - k));
  }
  
  return ema;
}

// Linear regression for trend prediction
export function linearRegression(data: TimeSeriesPoint[]): { slope: number; intercept: number } {
  const n = data.length;
  
  // Convert dates to numerical x values (days since start)
  const xValues: number[] = [];
  const startDate = new Date(data[0].date);
  
  for (let i = 0; i < n; i++) {
    const date = new Date(data[i].date);
    const daysDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    xValues.push(daysDiff);
  }
  
  const yValues = data.map(point => point.value);
  
  // Calculate means
  const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
  const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
    denominator += Math.pow(xValues[i] - xMean, 2);
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - (slope * xMean);
  
  return { slope, intercept };
}

// Predict future values using linear regression
export function predictFutureValues(
  data: TimeSeriesPoint[], 
  days: number
): TimeSeriesPoint[] {
  const { slope, intercept } = linearRegression(data);
  
  const lastDate = new Date(data[data.length - 1].date);
  const predictions: TimeSeriesPoint[] = [];
  
  // Start with the last actual data point
  predictions.push(data[data.length - 1]);
  
  // Calculate predictions for future days
  for (let i = 1; i <= days; i++) {
    const date = new Date(lastDate);
    date.setDate(date.getDate() + i);
    
    const x = data.length - 1 + i; // Days since start + future days
    const predictedValue = slope * x + intercept;
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, parseFloat(predictedValue.toFixed(2))),
    });
  }
  
  return predictions;
}

// Calculate trend growth rate
export function calculateGrowthRate(data: TimeSeriesPoint[]): number {
  if (data.length < 2) return 0;
  
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  
  if (firstValue === 0) return 0; // Avoid division by zero
  
  const growthRate = ((lastValue - firstValue) / firstValue) * 100;
  return parseFloat(growthRate.toFixed(1));
}

// Get predicted momentum score
export function getMomentumScore(trend: TrendData): number {
  const growth = calculateGrowthRate(trend.history);
  const recentGrowth = calculateGrowthRate(trend.history.slice(-7));
  const acceleration = recentGrowth - growth;
  
  // Weighted score based on current popularity, growth, and acceleration
  const momentumScore = (
    (trend.popularity * 0.4) + 
    (growth * 0.3) + 
    (acceleration * 0.3)
  );
  
  return parseFloat(momentumScore.toFixed(1));
}

// Calculate sentiment trend
export function sentimentTrend(trend: TrendData): "positive" | "negative" | "neutral" {
  if (trend.sentiment >= 75) return "positive";
  if (trend.sentiment <= 40) return "negative";
  return "neutral";
}

// Find correlated trends
export function findCorrelatedTrends(mainTrend: TrendData, allTrends: TrendData[]): TrendData[] {
  return allTrends.filter(trend => {
    if (trend.id === mainTrend.id) return false;
    
    // Check for same category or similar growth patterns
    return trend.category === mainTrend.category || 
           Math.abs(trend.growth - mainTrend.growth) < 10;
  }).slice(0, 3); // Return top 3 correlated trends
}
