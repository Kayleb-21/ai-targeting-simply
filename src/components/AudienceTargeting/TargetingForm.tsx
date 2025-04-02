
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

interface TargetingFormProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const TargetingForm = ({ onSubmit, isLoading }: TargetingFormProps) => {
  const [formData, setFormData] = useState({
    campaignName: "",
    industry: "",
    campaignObjective: "awareness",
    targetLocation: "",
    ageRange: [25, 45],
    budget: "medium",
    interests: "",
    productDescription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (value: number[]) => {
    setFormData({ ...formData, ageRange: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    placeholder="Summer Product Launch"
                    value={formData.campaignName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                    required
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Campaign Objective</Label>
                <RadioGroup
                  value={formData.campaignObjective}
                  onValueChange={(value) => handleSelectChange("campaignObjective", value)}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="awareness" id="awareness" />
                    <Label htmlFor="awareness" className="font-normal">Brand Awareness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consideration" id="consideration" />
                    <Label htmlFor="consideration" className="font-normal">Consideration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conversion" id="conversion" />
                    <Label htmlFor="conversion" className="font-normal">Conversion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retention" id="retention" />
                    <Label htmlFor="retention" className="font-normal">Retention</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetLocation">Target Location</Label>
                <Input
                  id="targetLocation"
                  name="targetLocation"
                  placeholder="Country, region, or city"
                  value={formData.targetLocation}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Target Age Range</Label>
                  <span className="text-sm text-gray-500">
                    {formData.ageRange[0]} - {formData.ageRange[1]} years
                  </span>
                </div>
                <Slider
                  defaultValue={[25, 45]}
                  value={formData.ageRange}
                  min={18}
                  max={65}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="py-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Level</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange("budget", value)}
                >
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Conservative</SelectItem>
                    <SelectItem value="medium">Moderate</SelectItem>
                    <SelectItem value="high">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Audience Interests</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  placeholder="Marketing, technology, fitness, etc. (comma separated)"
                  value={formData.interests}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productDescription">Product or Service Description</Label>
                <Textarea
                  id="productDescription"
                  name="productDescription"
                  placeholder="Brief description of your product or service"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-brand-blue to-brand-teal hover:from-brand-blue/90 hover:to-brand-teal/90">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Audience Insights
              </>
            ) : (
              "Generate AI Audience Recommendations"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TargetingForm;
