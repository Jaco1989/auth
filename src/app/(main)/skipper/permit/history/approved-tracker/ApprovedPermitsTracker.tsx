"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ApprovedPermit,
  ApprovedPermitsResult,
  getApprovedPermits,
} from "./action";

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

const ApprovedPermitsTracker: React.FC = () => {
  const [approvedCounts, setApprovedCounts] = useState<DayCount>({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [totalApproved, setTotalApproved] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedPermits = async () => {
      const result: ApprovedPermitsResult = await getApprovedPermits();
      if (Array.isArray(result)) {
        const counts = processApprovedPermits(result);
        setApprovedCounts(counts);
        setTotalApproved(result.length);
      } else if ("error" in result) {
        setError(result.error);
      }
    };

    fetchApprovedPermits();
  }, []);

  const processApprovedPermits = (permits: ApprovedPermit[]): DayCount => {
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
      const date = new Date(permit.updatedAt);
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
        <CardTitle>Approved Permits Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(approvedCounts).map(([day, count]) => (
          <div key={day} className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{day}</span>
              <span>
                {count} (
                {totalApproved > 0
                  ? ((count / totalApproved) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
            <Progress
              value={totalApproved > 0 ? (count / totalApproved) * 100 : 0}
              className="h-2"
            />
          </div>
        ))}
        <div className="mt-4 text-right">
          <span className="font-bold">Total Approved: {totalApproved}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovedPermitsTracker;
