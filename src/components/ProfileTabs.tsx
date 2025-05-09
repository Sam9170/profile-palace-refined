
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import PersonalInformation from "./PersonalInformation";
import Preferences from "./Preferences";
import ServiceAvailability from "./ServiceAvailability";
import SecuritySettings from "./SecuritySettings";
import { User, Globe, ShieldCheck, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfileTabs = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("personal");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs 
      defaultValue="personal" 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <TabsTrigger value="personal" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {!isMobile && "Personal Info"}
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {!isMobile && "Preferences"}
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          {!isMobile && "Services"}
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          {!isMobile && "Security"}
        </TabsTrigger>
      </TabsList>
      
      <Card className={`p-6 transition-opacity duration-300 ${isAnimating ? 'opacity-90' : 'opacity-100'}`}>
        <TabsContent value="personal" className="mt-0">
          <PersonalInformation />
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0">
          <Preferences />
        </TabsContent>
        
        <TabsContent value="services" className="mt-0">
          <ServiceAvailability />
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <SecuritySettings />
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default ProfileTabs;
