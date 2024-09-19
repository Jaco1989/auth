"use client";
import React from "react";
import Link from "next/link";
import { PermitData } from "@/lib/types";
import { relativeDate } from "@/lib/utils";
import { Briefcase, MapPin, Clock, Ship } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PermitStatus from "./PermitStatus";

interface PermitProps {
  permit: PermitData;
}

const Permits: React.FC<PermitProps> = ({ permit }) => {
  return (
    <Link
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
  );
};

export default Permits;
