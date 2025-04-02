
import TargetingDashboard from "@/components/AudienceTargeting/TargetingDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Audience Targeting AI</h1>
            <div className="bg-gradient-to-r from-brand-blue to-brand-teal p-[2px] rounded-md">
              <button className="bg-white px-4 py-2 rounded-md text-brand-darkblue font-medium text-sm">
                New Campaign
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TargetingDashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;
