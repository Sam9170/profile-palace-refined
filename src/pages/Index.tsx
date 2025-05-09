
import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl py-12 px-4 space-y-8">
        <h1 className="text-3xl font-bold mb-8 animate-slide-in">User Profile</h1>
        
        <ProfileHeader />
        
        <div className="mt-8">
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
};

export default Index;
