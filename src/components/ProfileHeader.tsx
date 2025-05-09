
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfileHeader = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const handlePhotoUpload = () => {
    toast({
      title: "Feature not implemented",
      description: "The photo upload functionality would be implemented here.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-6 p-6 bg-white rounded-lg shadow-sm animate-fade-in">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="w-24 h-24 border-2 border-gray-200">
          <AvatarImage src="https://source.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="User Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full transition-opacity duration-200 
            ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          onClick={handlePhotoUpload}
        >
          <Camera className="text-white" size={20} />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-gray-600 mb-4">Account ID: 35492</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={handlePhotoUpload}>
            <Camera className="mr-2 h-4 w-4" /> Change Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
