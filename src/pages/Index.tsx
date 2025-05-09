
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import UserManagement from "@/components/UserManagement";

const Index = () => {
  const [showUserManagement, setShowUserManagement] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl py-12 px-4 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold animate-slide-in">User Profile</h1>
          <Button 
            className="flex items-center gap-2 animate-fade-in" 
            onClick={() => setShowUserManagement(!showUserManagement)}
          >
            <UserCog className="h-4 w-4" />
            {showUserManagement ? "Back to Profile" : "Manage Users"}
          </Button>
        </div>
        
        {showUserManagement ? (
          <UserManagement />
        ) : (
          <>
            <ProfileHeader />
            
            <div className="mt-8">
              <ProfileTabs />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
