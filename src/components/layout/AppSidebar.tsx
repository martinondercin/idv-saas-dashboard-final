import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Settings,
  Activity,
  FileCheck,
  Workflow,
  Monitor,
  CreditCard,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Transactions",
    url: "/transactions",
    icon: Activity,
    items: [
      { title: "Real-time Feed", url: "/transactions/feed" },
      { title: "Failed Transactions", url: "/transactions/failed" },
    ],
  },
  {
    title: "Case Management",
    url: "/cases",
    icon: FileCheck,
    items: [
      { title: "Manual Review Queue", url: "/cases/review" },
      { title: "Escalation Rules", url: "/cases/escalation" },
    ],
  },
  {
    title: "Workflow Settings",
    url: "/workflows",
    icon: Workflow,
    items: [
      { title: "Workflow Overview", url: "/workflows/risk-scoring" },
    ],
  },
  {
    title: "Monitoring",
    url: "/monitoring",
    icon: Monitor,
    items: [
      { title: "System Status", url: "/monitoring/status" },
    ],
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
    items: [
      { title: "Usage & Billing", url: "/billing/usage" },
      { title: "Payment Methods", url: "/billing/payment-methods" },
      { title: "Invoice History", url: "/billing/invoices" },
    ],
  },
  {
    title: "Users & Access",
    url: "/users",
    icon: Users,
    items: [
      { title: "Role Management", url: "/users/roles" },
      { title: "SSO & MFA", url: "/users/sso" },
      { title: "Audit Log", url: "/users/audit" },
    ],
  },
  {
    title: "Integration & Configuration",
    url: "/integration",
    icon: Settings,
    items: [
      { title: "API Keys & Webhooks", url: "/integration/api-keys" },
      { title: "Endpoint Configuration", url: "/integration/endpoints" },
      { title: "Environment Settings", url: "/integration/environments" },
      { title: "No-Code Verification", url: "/integration/no-code" },
      { title: "Integration Guide", url: "/integration/guide" },
    ],
  },
];

export function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  const hasActiveChild = (items: { url: string }[]) => {
    return items.some(item => isActiveRoute(item.url));
  };

  // Auto-expand section if it contains the active route
  const getDefaultExpandedSections = () => {
    return navigationItems
      .filter(section => isActiveRoute(section.url) || hasActiveChild(section.items || []))
      .map(section => section.title);
  };

  return (
    <Sidebar className={cn("border-r border-sidebar-border bg-sidebar")}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/dashboard" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            title="Go to Dashboard Overview"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-sidebar-foreground">
                  VerifyID
                </h2>
                <p className="text-xs text-sidebar-foreground/70">
                  Identity Dashboard
                </p>
              </div>
            )}
          </NavLink>
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(true)}
              className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {!isCollapsed ? (
          <Accordion 
            type="multiple" 
            defaultValue={getDefaultExpandedSections()}
            className="w-full"
          >
            {navigationItems.map((section) => (
              <AccordionItem key={section.title} value={section.title} className="border-none">
                <AccordionTrigger className="py-2 px-3 hover:no-underline hover:bg-sidebar-accent/50 rounded-md [&[data-state=open]>div>svg]:rotate-180">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <SidebarMenu>
                    {section.items && (
                      <>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              size="sm"
                              className={cn(
                                "w-full justify-start transition-colors ml-7",
                                isActiveRoute(item.url)
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/30"
                              )}
                            >
                              <NavLink to={item.url} className="text-sm">
                                {item.title}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </>
                    )}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          // Collapsed sidebar - show only icons with expand hint at top
          <div className="space-y-2">
            <div className="px-2 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className="w-full h-10 flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent group transition-all duration-200"
                title="Expand sidebar to see full menu"
              >
                <div className="relative">
                  <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-primary rounded-full animate-pulse group-hover:animate-none" />
                </div>
              </Button>
              <p className="text-center text-xs text-sidebar-foreground/50 mt-1 leading-tight">
                Click to expand
              </p>
            </div>
            {navigationItems.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        className={cn(
                          "w-full justify-center transition-colors h-10",
                          isActiveRoute(section.url) || hasActiveChild(section.items || [])
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <NavLink 
                          to={section.url} 
                          className="flex items-center justify-center"
                          title={section.title}
                        >
                          <section.icon className="h-4 w-4" />
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        )}
      </SidebarContent>

      {!isCollapsed && (
        <SidebarFooter className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Collapse
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}