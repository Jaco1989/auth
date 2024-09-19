import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { relativeDate } from "@/lib/utils";

interface PermitStatusProps {
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PermitStatus: React.FC<PermitStatusProps> = ({
  approved,
  createdAt,
  updatedAt,
}) => {
  const isPending = createdAt.getTime() === updatedAt.getTime();

  const getStatusDetails = () => {
    if (isPending) {
      return { color: "bg-blue-100 text-blue-800", text: "Pending" };
    } else if (approved) {
      return { color: "bg-green-100 text-green-800", text: "Approved" };
    } else {
      return { color: "bg-red-100 text-red-800", text: "Declined" };
    }
  };

  const { color, text } = getStatusDetails();

  return (
    <div className="mb-4 flex items-center justify-between gap-5">
      <div className="flex items-center">
        <Badge
          className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
        >
          {text}
        </Badge>
      </div>
      <span className="flex items-center text-sm text-gray-500">
        <Clock size={14} className="mr-1" />
        {relativeDate(createdAt)}
      </span>
    </div>
  );
};

export default PermitStatus;
