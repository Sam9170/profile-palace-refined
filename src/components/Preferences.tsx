
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Language, Globe, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Preferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "usd",
    timezone: "UTC-8"
  });

  const handleChange = (name: string, value: string) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preference settings have been saved.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in animation-delay-200">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize your account preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Language className="h-4 w-4" />
            <Label htmlFor="language">Language</Label>
          </div>
          <Select 
            value={preferences.language} 
            onValueChange={(value) => handleChange("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <Label htmlFor="currency">Currency</Label>
          </div>
          <Select 
            value={preferences.currency} 
            onValueChange={(value) => handleChange("currency", value)}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="jpy">JPY (¥)</SelectItem>
              <SelectItem value="cad">CAD ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <Label htmlFor="timezone">Time Zone</Label>
          </div>
          <Select 
            value={preferences.timezone} 
            onValueChange={(value) => handleChange("timezone", value)}
          >
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
              <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
              <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
              <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
              <SelectItem value="UTC+1">UTC+1 (Paris)</SelectItem>
              <SelectItem value="UTC+8">UTC+8 (Beijing)</SelectItem>
              <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleSave}>Save Preferences</Button>
    </div>
  );
};

export default Preferences;
