import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1e3a5f]">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <span className="text-white font-semibold text-lg">INNOVATRICS</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm text-white/80">
            <span>Solutions</span>
            <span>Technology</span>
            <span>News</span>
            <span>References</span>
            <span>For Developers</span>
            <span>About Us</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm">
            Contact Us
          </Button>
          <span className="text-white/80 text-sm">Partners</span>
          <div className="w-6 h-6 border border-white/30 rounded flex items-center justify-center">
            <span className="text-white/80 text-xs">🔍</span>
          </div>
          <span className="text-white/80 text-sm">ES</span>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center px-6 py-16 lg:px-12">
          {/* Left Content */}
          <div>
            <Badge className="bg-white/20 text-white/80 border-white/30 text-xs px-3 py-1 mb-6 uppercase tracking-wider">
              IDENTITY VERIFICATION SERVICE
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Trusted identity verification you can start using <span className="text-blue-300">today</span>
            </h1>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Our effective, ready-made identity verification service is tuned for a seamless user experience, 
              powered by best-performing biometrics and AI. It is designed for rapid deployment and reliable 
              performance at any volume, with no-commitment pricing.
            </p>
            
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium"
                asChild
              >
                <Link to="/login">Get Started</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium bg-transparent"
                asChild
              >
                <a href="https://verify-identity.innovatrics.com/demo-iframe" target="_blank" rel="noopener noreferrer">
                  Try demo
                </a>
              </Button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/7a963833-37c2-46de-a493-e3526cd623c0.png" 
              alt="Person using tablet for identity verification"
              className="w-full h-auto rounded-lg"
            />
            
            {/* Floating UI Elements */}
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                Rapid deployment
              </div>
            </div>
            
            <div className="absolute top-32 right-0 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                Omnichannel
              </div>
            </div>
            
            <div className="absolute bottom-32 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                Seamless UX
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-16 lg:px-12">
          <Card className="bg-transparent border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs uppercase tracking-wider text-blue-400">EFFORTLESS</span>
              </div>
              <CardTitle className="text-xl mb-4">Out-of-the-box SaaS</CardTitle>
              <CardDescription className="text-white/70 text-sm leading-relaxed">
                Our identity verification can be launched in minutes with low-code integration. The universal 
                verification process keeps setup light and UX clean.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-teal-400 hover:text-teal-300 text-sm">
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs uppercase tracking-wider text-blue-400">SCALABLE</span>
              </div>
              <CardTitle className="text-xl mb-4">Elastic by design</CardTitle>
              <CardDescription className="text-white/70 text-sm leading-relaxed">
                Whether you verify hundreds or millions, performance and uptime remain steady on our 
                fully-managed, cloud-hosted infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-teal-400 hover:text-teal-300 text-sm">
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs uppercase tracking-wider text-blue-400">FLEXIBLE</span>
              </div>
              <CardTitle className="text-xl mb-4">Pay-as-you-go</CardTitle>
              <CardDescription className="text-white/70 text-sm leading-relaxed">
                Transparent, commitment-free pricing with zero implementation or hosting fees. 
                You only pay for all finished checks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-teal-400 hover:text-teal-300 text-sm">
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-white/10 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs uppercase tracking-wider text-blue-400">USER-FRIENDLY</span>
              </div>
              <CardTitle className="text-xl mb-4">Omnichannel experience</CardTitle>
              <CardDescription className="text-white/70 text-sm leading-relaxed">
                Our identity verification process is designed for the best user experience. A low-friction, 
                smooth cross‑device flow lifts completion rates and satisfaction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-teal-400 hover:text-teal-300 text-sm">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
