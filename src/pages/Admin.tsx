import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Search, Download, UserCheck, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  experience: string;
  availability: string;
  motivation: string;
  registeredAt: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Load users from localStorage (in production, this would be an API call)
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    setUsers(storedUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || user.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Type", "Experience", "Availability", "Registered"],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.phone,
        user.type,
        user.experience,
        user.availability,
        new Date(user.registeredAt).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registered_users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "volunteer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "intern":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "none":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "some":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "experienced":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent flex items-center">
                <Shield className="h-10 w-10 text-primary mr-3" />
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage registered volunteers and interns
              </p>
            </div>
            
            <Button onClick={handleExport} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Registrations</p>
                    <p className="text-3xl font-bold text-blue-900">{users.length}</p>
                  </div>
                  <Users className="h-12 w-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Volunteers</p>
                    <p className="text-3xl font-bold text-green-900">
                      {users.filter(u => u.type === "volunteer").length}
                    </p>
                  </div>
                  <UserCheck className="h-12 w-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Interns</p>
                    <p className="text-3xl font-bold text-purple-900">
                      {users.filter(u => u.type === "intern").length}
                    </p>
                  </div>
                  <Clock className="h-12 w-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="volunteer">Volunteers</SelectItem>
                    <SelectItem value="intern">Interns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No registrations found</h3>
                <p className="text-muted-foreground">
                  {users.length === 0 
                    ? "No users have registered yet. Encourage people to sign up!"
                    : "No users match your current search criteria."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span>{user.phone}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getTypeColor(user.type)} variant="outline">
                        {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                      </Badge>
                      <Badge className={getExperienceColor(user.experience)} variant="outline">
                        {user.experience.charAt(0).toUpperCase() + user.experience.slice(1)} Experience
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Availability</p>
                      <p className="text-sm">{user.availability}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Registered</p>
                      <p className="text-sm">{new Date(user.registeredAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Motivation</p>
                    <p className="text-sm text-foreground bg-muted/50 p-3 rounded-md">
                      {user.motivation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;