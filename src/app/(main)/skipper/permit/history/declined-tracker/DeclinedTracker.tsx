"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DeclinedPermit,
  DeclinedPermitsResult,
  getDeclinedPermits,
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

const DeclinedPermitsTracker: React.FC = () => {
  const [declinedCounts, setDeclinedCounts] = useState<DayCount>({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [totalDeclined, setTotalDeclined] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeclinedPermits = async () => {
      const result: DeclinedPermitsResult = await getDeclinedPermits();
      if (Array.isArray(result)) {
        const counts = processDeclinedPermits(result);
        setDeclinedCounts(counts);
        setTotalDeclined(result.length);
      } else if ("error" in result) {
        setError(result.error);
      }
    };

    fetchDeclinedPermits();
  }, []);

  const processDeclinedPermits = (permits: DeclinedPermit[]): DayCount => {
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
        <CardTitle>Declined Permits Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(declinedCounts).map(([day, count]) => (
          <div key={day} className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{day}</span>
              <span>
                {count} (
                {totalDeclined > 0
                  ? ((count / totalDeclined) * 100).toFixed(1)
                  : "0"}
                %)
              </span>
            </div>
            <Progress
              value={totalDeclined > 0 ? (count / totalDeclined) * 100 : 0}
              className="h-2"
            />
          </div>
        ))}
        <div className="mt-4 text-right">
          <span className="font-bold">Total Declined: {totalDeclined}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeclinedPermitsTracker;
