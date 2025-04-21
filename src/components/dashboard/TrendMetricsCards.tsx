
import { Card, CardContent } from "@/components/ui/card";
import { TrendData } from "@/types";
import { getMomentumScore, sentimentTrend } from "@/utils/predictions";

interface TrendMetricsCardsProps {
  trend: TrendData;
}

export function TrendMetricsCards({ trend }: TrendMetricsCardsProps) {
  const momentum = getMomentumScore(trend);
  const sentiment = trend.sentiment;
  const sentimentStatus = sentimentTrend(trend);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Popularity Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Popularity</h3>
            <div className="text-4xl font-bold mb-1">{trend.popularity}</div>
            <div className={`text-sm ${trend.growth >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {trend.growth >= 0 ? '↑' : '↓'} {Math.abs(trend.growth)}% in last 30 days
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Momentum Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Momentum Score</h3>
            <div className="text-4xl font-bold mb-1">{momentum}</div>
            <div className="text-sm text-muted-foreground">
              Prediction confidence: {trend.sentiment > 70 ? 'High' : trend.sentiment > 50 ? 'Medium' : 'Low'}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Sentiment Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Sentiment Analysis</h3>
            <div className="text-4xl font-bold mb-1">{sentiment}</div>
            <div className={`text-sm font-medium ${
              sentimentStatus === 'positive' ? 'text-green-500' : 
              sentimentStatus === 'negative' ? 'text-red-500' : 
              'text-yellow-500'
            }`}>
              {sentimentStatus === 'positive' ? 'Positive' : 
               sentimentStatus === 'negative' ? 'Negative' : 
               'Neutral'} sentiment
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
