import { useState } from "react";
import { Search, Bell, ChevronDown, Globe, TestTube, Languages, User, Shield, Key, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export function TopBar() {
  const [environment, setEnvironment] = useState(() => {
    return localStorage.getItem('environment') || 'production';
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const { toast } = useToast();

  const handleEnvironmentChange = (newEnv: string) => {
    setEnvironment(newEnv);
    toast({
      title: "Environment Changed",
      description: `Switched to ${newEnv === 'production' ? 'Production' : 'Sandbox'} environment`,
    });
    // Store in localStorage to persist the choice
    localStorage.setItem('environment', newEnv);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('environmentChanged', { detail: newEnv }));
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    toast({
      title: "Language Changed",
      description: `Interface language changed to ${getLanguageName(newLang)}`,
    });
    // Store language preference
    localStorage.setItem('language', newLang);
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'sk': 'Slovenčina',
      'cs': 'Čeština',
      'hu': 'Magyar'
    };
    return languages[code] || code;
  };

  const handleProfileAction = (action: string) => {
    switch (action) {
      case 'profile':
        toast({
          title: "Profile Settings",
          description: "Opening profile settings...",
        });
        break;
      case 'security':
        toast({
          title: "Security Settings",
          description: "Opening security settings...",
        });
        break;
      case 'api-keys':
        toast({
          title: "API Keys",
          description: "Opening API keys management...",
        });
        break;
      case 'logout':
        toast({
          title: "Signing Out",
          description: "You have been signed out successfully.",
        });
        // In a real app, this would clear auth tokens and redirect
        break;
      default:
        break;
    }
  };

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      {/* Left section - Environment and Language */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select value={environment} onValueChange={handleEnvironmentChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg z-50">
              <SelectItem value="production">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Production
                </div>
              </SelectItem>
              <SelectItem value="sandbox">
                <div className="flex items-center gap-2">
                  <TestTube className="w-3 h-3" />
                  Sandbox
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg z-50">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="sk">Slovenčina</SelectItem>
              <SelectItem value="cs">Čeština</SelectItem>
              <SelectItem value="hu">Magyar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions, customers, or settings..."
            className="pl-10 bg-muted/30 border-border focus:bg-background"
          />
        </div>
      </div>

      {/* Right section - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-error text-error-foreground text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-background border border-border shadow-lg z-50">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start p-4 cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">SLA Breach Alert</span>
                <Badge variant="outline" className="text-xs bg-error-light text-error">
                  Critical
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Manual review queue has 15 transactions exceeding 24h SLA
              </p>
              <span className="text-xs text-muted-foreground mt-2">5 min ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start p-4 cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">High Failure Rate</span>
                <Badge variant="outline" className="text-xs bg-warning-light text-warning">
                  Warning
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                OCR failure rate increased to 15% in the last hour
              </p>
              <span className="text-xs text-muted-foreground mt-2">12 min ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg z-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileAction('profile')} className="cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileAction('security')} className="cursor-pointer">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileAction('api-keys')} className="cursor-pointer">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileAction('logout')} className="cursor-pointer text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}