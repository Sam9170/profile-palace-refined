
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ServiceAvailability = () => {
  const { toast } = useToast();
  const [services, setServices] = useState({
    ocr: true,
    analytics: true,
    eligibility: true,
    claimStatus: false,
    claimSubmission: true,
    bulkEligibility: false,
    bulkClaim: false,
  });

  const handleServiceToggle = (service: string) => {
    setServices(prev => ({ ...prev, [service]: !prev[service as keyof typeof services] }));
  };

  const handleSaveServices = () => {
    toast({
      title: "Services Updated",
      description: "Your service availability settings have been saved.",
      duration: 3000,
    });
  };

  const ServiceRow = ({ id, label, description, enabled }: { id: string, label: string, description: string, enabled: boolean }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Switch
              id={id}
              checked={enabled}
              onCheckedChange={() => handleServiceToggle(id)}
              className="animate-pulse-light"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{enabled ? "Enabled" : "Disabled"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in animation-delay-300">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Service Availability</h3>
        <p className="text-sm text-muted-foreground">
          Enable or disable specific services for your account.
        </p>
      </div>

      <div className="space-y-1">
        <ServiceRow 
          id="ocr"
          label="OCR (Optical Character Recognition)"
          description="Extract text from images and documents"
          enabled={services.ocr}
        />

        <ServiceRow 
          id="analytics"
          label="Analytics"
          description="Access to detailed analytics and reports"
          enabled={services.analytics}
        />

        <ServiceRow 
          id="eligibility"
          label="Eligibility"
          description="Check eligibility status for services"
          enabled={services.eligibility}
        />

        <ServiceRow 
          id="claimStatus"
          label="Claim Status"
          description="View status updates for submitted claims"
          enabled={services.claimStatus}
        />

        <ServiceRow 
          id="claimSubmission"
          label="Claim Submission"
          description="Submit new claims through the platform"
          enabled={services.claimSubmission}
        />

        <ServiceRow 
          id="bulkEligibility"
          label="Bulk Eligibility"
          description="Process multiple eligibility checks at once"
          enabled={services.bulkEligibility}
        />

        <ServiceRow 
          id="bulkClaim"
          label="Bulk Claim"
          description="Submit multiple claims simultaneously"
          enabled={services.bulkClaim}
        />
      </div>

      <Button onClick={handleSaveServices}>Save Service Settings</Button>
    </div>
  );
};

export default ServiceAvailability;
