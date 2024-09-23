"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, Users, FileText } from "lucide-react";
import { getOldPermits, OldPermitResult } from "./actions";

export default function ExpiredPermits() {
  const [page, setPage] = useState(1); // Current page number
  const [permitsData, setPermitsData] = useState<{
    permits: OldPermitResult[];
    total: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const pageSize = 4; // 4 permits per page
  const totalPages = permitsData ? Math.ceil(permitsData.total / pageSize) : 1;

  // Fetch permits for the current page
  async function fetchPermits(page: number) {
    setIsLoading(true); // Set loading state to true when fetching begins
    const result = await getOldPermits(page, pageSize);
    if (!("error" in result)) {
      setPermitsData(result);
    } else {
      console.error(result.error);
    }
    setIsLoading(false); // Set loading state to false when fetching ends
  }

  // Fetch permits when the component mounts or page changes
  useEffect(() => {
    fetchPermits(page);
  }, [page]);

  if (isLoading && !permitsData) {
    return <div>Loading...</div>; // Display loading message when first page is being loaded
  }

  const { permits } = permitsData || { permits: [], total: 0 };

  if (!permits.length) {
    return (
      <div className="p-4 text-center text-red-500">
        No expired permits found.
      </div>
    );
  }

  // Pagination controls
  const handleNext = () => {
    if (page < totalPages && !isLoading) setPage(page + 1); // Ensure loading check before setting next page
  };

  const handlePrevious = () => {
    if (page > 1 && !isLoading) setPage(page - 1); // Ensure loading check before setting previous page
  };

  return (
    <div className="container z-0 mx-auto">
      <h1 className="mb-6 text-center text-3xl font-bold text-muted-foreground">
        Expired Permits
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {permits.map((permit) => (
          <div
            key={permit.id}
            className="z-0 transform transition duration-300 hover:scale-105"
          >
            <Card className="h-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="truncate text-xl font-semibold text-black">
                    {permit.title}
                  </h2>
                  <Badge variant="destructive">Expired</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 py-4">
                <p className="flex items-center text-gray-600">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {permit.type}
                </p>
                <p className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {permit.location}
                </p>
                <p className="flex items-center text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  {permit.companyName}
                </p>
                <p className="line-clamp-3 flex items-center text-gray-600">
                  <FileText className="mr-2 h-4 w-4" />
                  {permit.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 text-sm text-gray-500">
                <p className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {new Date(permit.createdAt).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Updated: {new Date(permit.updatedAt).toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1 || isLoading} // Disable while loading
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-300"
        >
          Previous
        </button>

        {/* Render page numbers with the active page highlighted in blue */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => !isLoading && setPage(pageNumber)} // Prevent clicking when loading
              className={`rounded px-4 py-2 transition-colors ${
                page === pageNumber
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              } ${isLoading ? "cursor-not-allowed" : ""}`}
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          onClick={handleNext}
          disabled={page === totalPages || isLoading} // Disable while loading
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Loading indicator when changing pages */}
      {isLoading && <div className="text-center text-blue-500">Loading...</div>}
    </div>
  );
}
