
import AudienceChart from "./AudienceChart";
import RecommendationCard from "./RecommendationCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share2 } from "lucide-react";

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

interface AudienceInsightsProps {
  audiences: Audience[];
}

const AudienceInsights = ({ audiences }: AudienceInsightsProps) => {
  const totalReach = audiences.reduce((sum, audience) => sum + audience.reachSize, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Audience Recommendations</h2>
          <p className="text-gray-500">Based on your targeting parameters, we've identified optimal audience segments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Audience Segments</CardDescription>
            <CardTitle className="text-2xl">{audiences.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Potential Reach</CardDescription>
            <CardTitle className="text-2xl">{(totalReach).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Match Rate</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(audiences.reduce((sum, audience) => sum + audience.matchRate, 0) / audiences.length)}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Conv. Potential</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(audiences.reduce((sum, audience) => sum + audience.conversionPotential, 0) / audiences.length)}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segment Comparison</CardTitle>
              <CardDescription>
                Analysis of your recommended audience segments across key performance metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AudienceChart audiences={audiences} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Audience Recommendations</CardTitle>
              <CardDescription>Ranked by AI model match score.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="primary">Primary</TabsTrigger>
                  <TabsTrigger value="secondary">Secondary</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-4">
                  {audiences.map((audience) => (
                    <RecommendationCard key={audience.id} audience={audience} />
                  ))}
                </TabsContent>
                <TabsContent value="primary" className="mt-4 space-y-4">
                  {audiences.filter(a => a.matchRate > 80).map((audience) => (
                    <RecommendationCard key={audience.id} audience={audience} />
                  ))}
                </TabsContent>
                <TabsContent value="secondary" className="mt-4 space-y-4">
                  {audiences.filter(a => a.matchRate <= 80).map((audience) => (
                    <RecommendationCard key={audience.id} audience={audience} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-brand-lightblue border border-brand-blue/20 rounded-md">
            <h4 className="font-medium text-brand-darkblue mb-2">Strategic Targeting Recommendations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <Badge variant="outline" className="bg-brand-blue/5 text-brand-blue">Primary</Badge>
                <span>Focus on the primary segment for highest conversion potential and efficient budget allocation.</span>
              </li>
              <li className="flex gap-2">
                <Badge variant="outline" className="bg-brand-blue/5 text-brand-blue">Secondary</Badge>
                <span>Test the secondary audience segment with a smaller budget allocation to evaluate performance.</span>
              </li>
              <li className="flex gap-2">
                <Badge variant="outline" className="bg-brand-blue/5 text-brand-blue">Expansion</Badge>
                <span>Consider the expansion segment for brand awareness campaigns with broader reach objectives.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Audience Characteristics</h4>
            <p className="text-gray-600">
              Your ideal audience shows strong interest in technology and digital marketing, with a focus on professional development.
              The 25-44 age bracket represents the highest conversion potential with urban and suburban areas
              delivering the strongest engagement metrics.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Messaging Strategy</h4>
            <p className="text-gray-600">
              Based on the audience analysis, your messaging should emphasize innovation, efficiency, and professional growth. 
              Highlight how your product or service helps users achieve their business objectives and improve their workflow.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-brand-blue to-brand-teal hover:from-brand-blue/90 hover:to-brand-teal/90">
          Apply These Audience Segments
        </Button>
      </div>
    </div>
  );
};

export default AudienceInsights;
