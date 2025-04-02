
import { useState } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface AudienceChartProps {
  audiences: Audience[];
}

const AudienceChart = ({ audiences }: AudienceChartProps) => {
  const [chartType, setChartType] = useState("radar");
  
  // Transform data for radar chart
  const radarChartData = audiences.map((audience) => ({
    name: audience.name,
    "Match Rate": audience.matchRate,
    "Conversion Potential": audience.conversionPotential,
    "Cost Efficiency": audience.costEfficiency,
  }));
  
  // Prepare data for bar chart
  const metrics = ["Match Rate", "Conversion Potential", "Cost Efficiency"];
  const barChartData = metrics.map(metric => {
    const dataPoint: Record<string, any> = { name: metric };
    audiences.forEach(audience => {
      const value = audience[metric.toLowerCase().replace(" ", "") as keyof typeof audience];
      dataPoint[audience.name] = value;
    });
    return dataPoint;
  });
  
  const colors = ["#0575E6", "#64748b", "#94a3b8"];

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="radar" value={chartType} onValueChange={setChartType} className="mb-4">
        <TabsList className="grid grid-cols-2 w-64">
          <TabsTrigger value="radar">Radar View</TabsTrigger>
          <TabsTrigger value="bar">Bar Graph</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex-1">
        <TabsContent value="radar" className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              
              <Radar 
                name="Match Rate" 
                dataKey="Match Rate" 
                stroke={colors[0]} 
                fill={colors[0]} 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Conversion Potential" 
                dataKey="Conversion Potential" 
                stroke={colors[1]} 
                fill={colors[1]} 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Cost Efficiency" 
                dataKey="Cost Efficiency" 
                stroke={colors[2]} 
                fill={colors[2]} 
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="bar" className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {audiences.map((audience, index) => (
                <Bar 
                  key={audience.id}
                  dataKey={audience.name} 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </div>
    </div>
  );
};

export default AudienceChart;
