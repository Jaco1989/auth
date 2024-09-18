import React from "react";
import { PermitData } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, BuildingIcon, UserIcon } from "lucide-react";

interface SkipperPermitProps {
  permit: PermitData;
}

const SkipperPermit: React.FC<SkipperPermitProps> = ({ permit }) => {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{permit.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {permit.type}
            </CardDescription>
          </div>
          <Badge className={permit.approved ? "bg-green-500" : "bg-gray-500"}>
            {permit.approved ? "Approved" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
          <span>{permit.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BuildingIcon className="h-5 w-5 text-gray-400" />
          <span>{permit.companyName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <span>
            {permit.user.displayName} (@{permit.user.username})
          </span>
        </div>
        <p className="text-sm text-gray-600">{permit.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="h-4 w-4" />
          <span>Created: {permit.createdAt.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarIcon className="h-4 w-4" />
          <span>Updated: {permit.updatedAt.toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkipperPermit;
