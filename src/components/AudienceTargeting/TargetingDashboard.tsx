
import { useState } from "react";
import TargetingForm from "./TargetingForm";
import AudienceInsights from "./AudienceInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, LineChart } from "lucide-react";

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

const TargetingDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [activeTab, setActiveTab] = useState("targeting");
  const [hasAppliedAudiences, setHasAppliedAudiences] = useState(false);

  const handleFormSubmit = (formData: any) => {
    setIsLoading(true);
    
    // Simulate API call to AI model
    setTimeout(() => {
      const generatedAudiences = generateMockAudiences(formData);
      setAudiences(generatedAudiences);
      setIsLoading(false);
      setActiveTab("insights");
    }, 2000);
  };
  
  const handleApplyAudiences = () => {
    setActiveTab("performance");
    setHasAppliedAudiences(true);
  };

  const generateMockAudiences = (formData: any): Audience[] => {
    // Mock data generation based on form input
    const interests = formData.interests?.split(',').map((i: string) => i.trim()) || [];
    
    return [
      {
        id: 1,
        name: "Primary Target Segment",
        matchRate: 92,
        conversionPotential: 87,
        reachSize: 250000,
        costEfficiency: 85,
        interests: [...interests, "Technology", "Digital Marketing"],
        demographics: {
          ageRange: "25-34",
          gender: "Mixed",
          location: "Urban Areas"
        }
      },
      {
        id: 2,
        name: "Secondary Target Segment",
        matchRate: 78,
        conversionPotential: 72,
        reachSize: 420000,
        costEfficiency: 68,
        interests: [...interests, "Business News", "Productivity"],
        demographics: {
          ageRange: "35-44",
          gender: "Mixed",
          location: "Suburban Areas"
        }
      },
      {
        id: 3,
        name: "Expansion Opportunity",
        matchRate: 64,
        conversionPotential: 58,
        reachSize: 850000,
        costEfficiency: 74,
        interests: [...interests, "Professional Development"],
        demographics: {
          ageRange: "45-54",
          gender: "Mixed",
          location: "Mixed Areas"
        }
      }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Tabs defaultValue="targeting" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-6 py-2">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
              <TabsTrigger value="targeting" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Targeting Setup</span>
              </TabsTrigger>
              <TabsTrigger value="insights" disabled={audiences.length === 0} className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Audience Insights</span>
              </TabsTrigger>
              <TabsTrigger value="performance" disabled={!hasAppliedAudiences} className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="targeting" className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900">Define Your Target Audience</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Provide details about your campaign and target audience to receive AI-powered targeting recommendations.
                </p>
              </div>
              
              <TargetingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="p-6">
            {audiences.length > 0 && <AudienceInsights audiences={audiences} onApplyAudiences={handleApplyAudiences} />}
            {audiences.length === 0 && (
              <Card>
                <CardContent className="py-10">
                  <div className="text-center">
                    <p className="text-gray-500">No audience insights yet. Complete the targeting setup first.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="performance" className="p-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Campaign Performance Projections</CardTitle>
              </CardHeader>
              <CardContent>
                {!hasAppliedAudiences ? (
                  <p className="text-gray-500 text-center py-10">
                    Performance projections will be available after running your campaign with the selected audiences.
                  </p>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Expected CTR</p>
                        <p className="text-2xl font-bold text-gray-900">3.8%</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <span>+0.7%</span>
                          <span>vs. industry average</span>
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Est. Conversion Rate</p>
                        <p className="text-2xl font-bold text-gray-900">2.1%</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <span>+0.4%</span>
                          <span>vs. previous campaigns</span>
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Projected ROAS</p>
                        <p className="text-2xl font-bold text-gray-900">3.7x</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <span>+0.8x</span>
                          <span>vs. previous campaigns</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">AI Performance Insights</h3>
                      <div className="bg-brand-lightblue border border-brand-blue/20 rounded-md p-4">
                        <p className="text-sm text-gray-700">
                          Based on your selected audience segments and historical campaign performance, 
                          we project a significant improvement in key metrics. The Primary Target Segment 
                          shows the highest potential for conversions, while the Secondary Target Segment 
                          offers the best opportunity for expanded reach. We recommend allocating 60% of 
                          your budget to the Primary segment, 30% to the Secondary segment, and 10% to 
                          testing the Expansion Opportunity segment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TargetingDashboard;
