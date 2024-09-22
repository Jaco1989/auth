"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  getPendingPermits,
  PendingPermit,
  PendingPermitsResult,
} from "./actions";

type DayCount = {
  [key in
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"]: number;
};

const PendingTracker: React.FC = () => {
  const [pendingCounts, setPendingCounts] = useState<DayCount>({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [totalPending, setTotalPending] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingPermits = async () => {
      const result: PendingPermitsResult = await getPendingPermits();
      if (Array.isArray(result)) {
        const counts = processPendingPermits(result);
        setPendingCounts(counts);
        setTotalPending(result.length);
      } else if ("error" in result) {
        setError(result.error);
      }
    };

    fetchPendingPermits();
  }, []);

  const processPendingPermits = (permits: PendingPermit[]): DayCount => {
    const counts: DayCount = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    permits.forEach((permit) => {
      const date = new Date(permit.createdAt);
      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
      }) as keyof DayCount;
      counts[day]++;
    });

    return counts;
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Pending Permits Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(pendingCounts).map(([day, count]) => (
          <div key={day} className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{day}</span>
              <span>
                {count} (
                {totalPending > 0
                  ? ((count / totalPending) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
            <Progress
              value={totalPending > 0 ? (count / totalPending) * 100 : 0}
              className="h-2"
            />
          </div>
        ))}
        <div className="mt-4 text-right">
          <span className="font-bold">Total Pending: {totalPending}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTracker;
