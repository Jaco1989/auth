"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PermitData } from "@/lib/types";
import { relativeDate } from "@/lib/utils";
import { Briefcase, MapPin, Clock, Ship } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PermitStatus from "./PermitStatus";
import { fetchPermits } from "../actions";

const PAGE_SIZE = 10; // You can adjust this value

const Permits: React.FC = () => {
  const [permits, setPermits] = useState<PermitData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPermits = async () => {
      setIsLoading(true);
      const result = await fetchPermits(currentPage, PAGE_SIZE);
      setIsLoading(false);

      if ("error" in result) {
        setError(result.error);
      } else {
        setPermits(result.permits);
        setTotalCount(result.totalCount);
      }
    };

    loadPermits();
  }, [currentPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {permits.map((permit) => (
          <Link
            key={permit.id}
            href={`/skipper/permit/${permit.id}`}
            className="block overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <PermitStatus
                approved={permit.approved}
                createdAt={permit.createdAt}
                updatedAt={permit.updatedAt}
              />

              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                {permit.title}
              </h2>

              <div className="mb-4 flex items-center text-gray-600">
                <Ship size={18} className="mr-2" />
                <span className="font-medium">{permit.companyName}</span>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Briefcase size={18} className="mr-2 text-blue-500" />
                  <span>{permit.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 text-red-500" />
                  <span>{permit.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {permit.type}
                </Badge>
                <span className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  Issued {relativeDate(permit.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          className="mr-2 rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage * PAGE_SIZE >= totalCount}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Permits;
