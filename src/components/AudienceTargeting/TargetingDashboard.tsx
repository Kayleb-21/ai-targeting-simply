
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
              <TabsTrigger value="performance" disabled={audiences.length === 0} className="flex items-center gap-2">
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
            {audiences.length > 0 && <AudienceInsights audiences={audiences} />}
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
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-10">
                  Performance projections will be available after running your campaign with the selected audiences.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TargetingDashboard;
