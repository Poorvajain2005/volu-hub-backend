import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Sparkles, UserPlus, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
              <Heart className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight">
              Make a Difference
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our community of passionate volunteers and interns working together to create positive change. 
              Your skills, time, and dedication can help transform lives and build a better future.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl transition-all duration-300">
              <Link to="/register" className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
              <Link to="/admin" className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join VolunteerHub?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide meaningful opportunities for volunteers and interns to grow, learn, and make a real impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-blue-200/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-blue-700">
                Connect with like-minded individuals who share your passion for making a difference. 
                Build lasting relationships and expand your network.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50/50 to-green-100/50 border-green-200/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-green-900">Gain Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-green-700">
                Develop valuable skills, gain hands-on experience, and enhance your resume 
                while contributing to meaningful causes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50/50 to-purple-100/50 border-purple-200/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-purple-900">Create Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-purple-700">
                See the direct impact of your work on individuals and communities. 
                Every contribution matters and creates positive change.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to volunteer your time or gain internship experience, 
              we have opportunities that match your interests and schedule.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow">
                <Link to="/register">Register as Volunteer</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/register">Apply for Internship</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
