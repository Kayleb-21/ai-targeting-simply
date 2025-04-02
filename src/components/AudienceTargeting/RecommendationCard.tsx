
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, MapPin, Tag } from "lucide-react";

type Audience = {
  id: number;
  name: string;
  matchRate: number;
  conversionPotential: number;
  reachSize: number;
  costEfficiency: number;
  interests: string[];
  demographics: {
    ageRange: string;
    gender: string;
    location: string;
  };
};

interface RecommendationCardProps {
  audience: Audience;
}

const RecommendationCard = ({ audience }: RecommendationCardProps) => {
  const getBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "outline";
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-gray-400";
  };

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: audience.matchRate >= 80 ? '#0575E6' : '#64748b' }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-900">{audience.name}</h3>
          <Badge variant={getBadgeVariant(audience.matchRate)}>
            {audience.matchRate}% Match
          </Badge>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>{audience.demographics.ageRange} age range • {audience.demographics.gender}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{audience.demographics.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="h-4 w-4" />
            <div className="flex flex-wrap gap-1">
              {audience.interests.map((interest, index) => (
                <span key={index} className="bg-gray-100 px-2 py-0.5 text-xs rounded">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Conversion Potential</span>
              <span className="font-medium">{audience.conversionPotential}%</span>
            </div>
            <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${getScoreColor(audience.conversionPotential)}`} 
                style={{ width: `${audience.conversionPotential}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Cost Efficiency</span>
              <span className="font-medium">{audience.costEfficiency}%</span>
            </div>
            <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${getScoreColor(audience.costEfficiency)}`} 
                style={{ width: `${audience.costEfficiency}%` }}
              />
            </div>
          </div>
          
          <div className="pt-2 text-xs">
            <span className="text-gray-500">Estimated reach:</span> <span className="font-medium">{audience.reachSize.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
