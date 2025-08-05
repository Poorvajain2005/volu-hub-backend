import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Shield } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              VolunteerHub
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            
            <Button
              variant={isActive("/register") ? "default" : "ghost"}
              asChild
            >
              <Link to="/register" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </Button>
            
            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              asChild
            >
              <Link to="/admin" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;