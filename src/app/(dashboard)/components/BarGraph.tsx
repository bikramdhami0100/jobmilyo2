"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

export function BarGraph() {
  const [totalData, setTotalData] = useState<any>(null);

  const fetchData = async (adminId: any) => {
    const res = await axios.get("/api/dashboard/", {
      params: { adminId: adminId },
    });
    setTotalData(res.data.data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminId = localStorage.getItem("adminId");
      fetchData(adminId);
    }
    return () => {
      setTotalData(null);
    };
  }, []);

  const chartData = [
    { label: "Total Users", value: totalData?.totaluser || 0 },
    { label: "Total Jobs", value: totalData?.totaljob || 0 },
    { label: "Applied Jobs", value: totalData?.totalAppliedjob || 0 },
    { label: "Contacted Users", value: totalData?.totalContactuser || 0 },
  ];

  return (
    <Card className="mt-10 bg-background lg:w-[90%] lg:m-auto shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Dashboard Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ bar: { label: "Bar Chart", color: "hsl(var(--primary))" } }}>
          <BarChart
            width={700}
            height={350}
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="hsl(var(--muted-foreground))"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              className="text-sm fill-muted-foreground"
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              className="text-sm fill-muted-foreground"
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted)/0.1)" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.9}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              )}
            />
            {/* Gradient for beautiful color in light/dark mode */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
