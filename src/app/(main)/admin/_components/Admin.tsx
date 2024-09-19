"use client";

import React from "react";
import { useSession } from "../../SessionProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fish, Users, BarChart3, Settings } from "lucide-react";

const Dashboard = () => {
  const session = useSession();

  const stats = [
    { title: "Total Catches", value: "1,234", icon: Fish },
    { title: "Active Users", value: "567", icon: Users },
    { title: "Species Tracked", value: "42", icon: BarChart3 },
    { title: "System Health", value: "98%", icon: Settings },
  ];

  const dailyCatchesData = [
    { name: "Mon", catches: 12 },
    { name: "Tue", catches: 19 },
    { name: "Wed", catches: 3 },
    { name: "Thu", catches: 5 },
    { name: "Fri", catches: 2 },
    { name: "Sat", catches: 15 },
    { name: "Sun", catches: 10 },
  ];

  const catchDistributionData = [
    { name: "Trout", value: 400 },
    { name: "Bass", value: 300 },
    { name: "Salmon", value: 300 },
    { name: "Catfish", value: 200 },
  ];

  const maxCatches = Math.max(...dailyCatchesData.map((d) => d.catches));

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          Welcome, {session.user.role}!
        </h1>
        {/* Stats cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Daily Catches Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Catches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Debug: maxCatches = {maxCatches}
                </p>
                {dailyCatchesData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-10 text-xs">{day.name}</span>
                    <div className="h-6 flex-grow overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(day.catches / maxCatches) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="w-10 text-right text-xs">
                      {day.catches}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Catch Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Catch Distribution by Species</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {catchDistributionData.map((species, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-20 text-sm">{species.name}</span>
                    <div className="h-4 flex-grow overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${(species.value / Math.max(...catchDistributionData.map((d) => d.value))) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{species.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here you can display recent catches or user activities.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
