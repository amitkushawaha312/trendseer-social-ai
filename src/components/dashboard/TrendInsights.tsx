
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendInsight } from "@/types";

interface TrendInsightsProps {
  insights: TrendInsight[];
}

export function TrendInsights({ insights }: TrendInsightsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Top Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary font-medium text-sm px-2 py-1 rounded-full">
                    {insight.impactScore}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
