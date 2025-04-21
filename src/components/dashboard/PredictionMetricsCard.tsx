
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PredictionMetricsCardProps {
  accuracy: number;
  confidence: number;
  sampleSize: number;
}

export function PredictionMetricsCard({
  accuracy,
  confidence,
  sampleSize,
}: PredictionMetricsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Prediction Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Model Accuracy</span>
              <span className="text-sm font-medium">{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className="text-sm font-medium">{confidence}%</span>
            </div>
            <Progress value={confidence} className="h-2" />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md mt-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-muted-foreground">
                Based on <span className="font-medium text-foreground">{sampleSize.toLocaleString()}</span> data points
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
