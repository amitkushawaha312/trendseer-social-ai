
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentGaugeProps {
  sentiment: number;
}

export function SentimentGauge({ sentiment }: SentimentGaugeProps) {
  // Calculate the rotation based on the sentiment value (0-100)
  const rotation = -90 + (sentiment / 100) * 180;
  
  // Determine the color based on the sentiment value
  const getColor = () => {
    if (sentiment < 40) return "#f72585"; // Red for negative
    if (sentiment < 60) return "#ffbe0b"; // Yellow for neutral
    return "#4cc9f0"; // Blue for positive
  };
  
  // Get sentiment text
  const getSentimentText = () => {
    if (sentiment < 30) return "Negative";
    if (sentiment < 45) return "Somewhat Negative";
    if (sentiment < 55) return "Neutral";
    if (sentiment < 70) return "Somewhat Positive";
    return "Positive";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-40 h-20 mt-4 mb-4 relative overflow-hidden">
          {/* Gauge Background */}
          <div className="absolute top-0 w-full h-full rounded-t-full bg-gray-100"></div>
          
          {/* Gauge Sections */}
          <div className="absolute top-0 w-full h-full rounded-t-full overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full bg-red-400 h-1/2" style={{ transform: "rotate(-90deg)", transformOrigin: "bottom center" }}></div>
            <div className="absolute bottom-0 left-0 w-full bg-yellow-400 h-1/2" style={{ transform: "rotate(-45deg)", transformOrigin: "bottom center" }}></div>
            <div className="absolute bottom-0 left-0 w-full bg-green-400 h-1/2" style={{ transform: "rotate(0deg)", transformOrigin: "bottom center" }}></div>
            <div className="absolute bottom-0 left-0 w-full bg-blue-400 h-1/2" style={{ transform: "rotate(45deg)", transformOrigin: "bottom center" }}></div>
          </div>
          
          {/* Gauge Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-16 bg-gray-800 rounded-t-full" 
            style={{ 
              transform: `translateX(-50%) rotate(${rotation}deg)`, 
              transformOrigin: "bottom center" 
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gray-800"></div>
          </div>
          
          {/* Center Point */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 w-4 h-4 rounded-full bg-white border-2 border-gray-800"></div>
        </div>
        
        {/* Sentiment Value */}
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: getColor() }}>
            {sentiment}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {getSentimentText()}
          </div>
        </div>
        
        {/* Min/Max Labels */}
        <div className="w-full flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
      </CardContent>
    </Card>
  );
}
