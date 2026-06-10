import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BarChart3,
  TrendingUp,
  Download,
} from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AnalyticsPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get("/appointments")
      .then((res) => {
        setAppointments(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading analytics:", err);
        toast.error("Gagal memuat data analitik");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 1. Calculate Monthly Revenue for the last 6 months
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthLabel = d.toLocaleString("id-ID", { month: "short" });
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    last6Months.push({ label: monthLabel, yearMonth, revenue: 0 });
  }

  appointments.forEach((apt) => {
    if (apt.status === "completed" || apt.status === "confirmed") {
      const ym = apt.date?.substring(0, 7); // e.g. "2024-01"
      const match = last6Months.find((m) => m.yearMonth === ym);
      if (match) {
        match.revenue += apt.price || 0;
      }
    }
  });

  const revenueData = last6Months.map((m) => ({
    month: m.label,
    revenue: m.revenue,
  }));

  // 2. Calculate Service Popularity
  const serviceCounts: { [key: string]: number } = {};
  appointments.forEach((apt) => {
    if (apt.status === "completed" || apt.status === "confirmed") {
      const svcName = apt.service?.name || "Unknown Service";
      serviceCounts[svcName] = (serviceCounts[svcName] || 0) + 1;
    }
  });

  const totalValidApts = Object.values(serviceCounts).reduce((sum, count) => sum + count, 0);

  const servicePopularity = Object.entries(serviceCounts)
    .map(([name, count]) => ({
      name,
      percentage: totalValidApts > 0 ? Math.round((count / totalValidApts) * 100) : 0,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // 3. Recent Activity from appointments
  // Sort by date/time or ID descending
  const recentActivities = [...appointments]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)
    .map((apt) => {
      let action = "New appointment created";
      let type = "info";

      if (apt.status === "completed") {
        action = "Service completed";
        type = "success";
      } else if (apt.status === "confirmed") {
        action = "Appointment confirmed";
        type = "success";
      } else if (apt.status === "cancelled") {
        action = "Appointment cancelled";
        type = "warning";
      }

      return {
        action,
        user: apt.customer?.name || "Guest Customer",
        time: `${apt.date} ${apt.time}`,
        type,
      };
    });

  const handleExport = () => {
    // Basic export as JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appointments, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "report_analytics.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Laporan berhasil diekspor!");
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Memuat data analitik...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* MONTHLY REVENUE */}
          <Card className="p-6 bg-card border-border/40">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Monthly Revenue
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis
                    dataKey="month"
                    stroke="#888"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#888"
                    fontSize={12}
                    tickFormatter={(v) =>
                      `Rp ${(v / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      `Rp ${value.toLocaleString("id-ID")}`
                    }
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                  <Bar
                    dataKey="revenue"
                    radius={[6, 6, 0, 0]}
                    fill="#3b82f6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* SERVICE POPULARITY */}
          <Card className="p-6 bg-card border-border/40">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Service Popularity
            </h3>

            <div className="space-y-3">
              {servicePopularity.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Belum ada data layanan populer.
                </div>
              ) : (
                servicePopularity.map(({ name, percentage }) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{name}</span>
                      <span className="text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* RECENT ACTIVITY */}
          <Card className="p-6 bg-card border-border/40 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Recent Activity
              </h3>

              <Button variant="outline" size="sm" onClick={handleExport} disabled={appointments.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>

            <div className="space-y-3">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Belum ada aktivitas tercatat.
                </div>
              ) : (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Customer: {activity.user}
                      </p>
                    </div>

                    <span className="text-xs text-muted-foreground shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
