import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BarChart3,
  TrendingUp,
  Download,
} from "lucide-react";

const AnalyticsPage = () => {
  const services = [
    {
      id: 1,
      name: "Classic Haircut",
      price: "Rp 50.000",
      duration: "30 min",
      category: "Haircut",
      status: "active",
    },
    {
      id: 2,
      name: "Premium Haircut",
      price: "Rp 75.000",
      duration: "45 min",
      category: "Haircut",
      status: "active",
    },
    {
      id: 3,
      name: "Beard Grooming",
      price: "Rp 35.000",
      duration: "20 min",
      category: "Grooming",
      status: "active",
    },
    {
      id: 4,
      name: "Hair Coloring",
      price: "Rp 200.000",
      duration: "90 min",
      category: "Styling",
      status: "active",
    },
    {
      id: 5,
      name: "Kids Haircut",
      price: "Rp 40.000",
      duration: "25 min",
      category: "Haircut",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* MONTHLY REVENUE */}
        <Card className="p-6 bg-card border-border/40">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Monthly Revenue
          </h3>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              Chart visualization here
            </p>
          </div>
        </Card>

        {/* SERVICE POPULARITY */}
        <Card className="p-6 bg-card border-border/40">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Service Popularity
          </h3>

          <div className="space-y-3">
            {services.slice(0, 5).map((service, index) => {
              const percentage = 85 - index * 10;

              return (
                <div key={service.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {service.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card className="p-6 bg-card border-border/40 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Recent Activity
            </h3>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                action: "New appointment created",
                user: "Ahmad Rizki",
                time: "5 min ago",
                type: "success",
              },
              {
                action: "Service completed",
                user: "Budi Santoso",
                time: "15 min ago",
                type: "info",
              },
              {
                action: "Customer registered",
                user: "Candra Wijaya",
                time: "1 hour ago",
                type: "success",
              },
              {
                action: "Appointment cancelled",
                user: "Doni Prakoso",
                time: "2 hours ago",
                type: "warning",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
