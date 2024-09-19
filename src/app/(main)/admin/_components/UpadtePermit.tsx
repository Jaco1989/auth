import React from "react";
import { PermitData } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface UpdatePermitProps {
  permits: PermitData[];
}

const UpdatePermit: React.FC<UpdatePermitProps> = ({ permits }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Update Permits</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {permits.map((permit) => (
          <div
            key={permit.id}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                {permit.title}
              </h2>
              <p className="mb-2 text-sm font-medium text-gray-600">
                <span className="mr-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  {permit.type}
                </span>
                <span className="mr-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  {permit.location}
                </span>
              </p>
              <p className="mb-3 text-sm text-gray-600">
                <span className="font-medium">Company:</span>{" "}
                {permit.companyName}
              </p>
              <p className="mb-4 text-sm text-gray-500">{permit.description}</p>
              <div className="flex gap-3">
                <Button className="flex-1 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-600">
                  Approve
                </Button>
                <Button className="flex-1 rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-600">
                  Decline
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatePermit;
