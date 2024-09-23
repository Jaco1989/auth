import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAllDrivers } from "../drivers/actions";

const DriversTable = async () => {
  const result = await fetchAllDrivers();

  if ("error" in result) {
    return <div className="text-red-500">{result.error}</div>;
  }

  const { drivers } = result;

  if (!drivers || drivers.length === 0) {
    return <div className="text-gray-500">No driver users found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      {/* Desktop view */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={driver.avatarUrl || undefined}
                      alt={driver.displayName}
                    />
                    <AvatarFallback>
                      {driver.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{driver.username}</TableCell>
                <TableCell>{driver.displayName}</TableCell>
                <TableCell>{driver.email || "N/A"}</TableCell>
                <TableCell>
                  {driver.bio ? driver.bio.slice(0, 50) + "..." : "No bio"}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(driver.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="space-y-4 md:hidden">
        {drivers.map((driver) => (
          <Card key={driver.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={driver.avatarUrl || undefined}
                    alt={driver.displayName}
                  />
                  <AvatarFallback>
                    {driver.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{driver.displayName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Username:</span>{" "}
                  {driver.username}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {driver.email || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Bio:</span>{" "}
                  {driver.bio ? driver.bio.slice(0, 50) + "..." : "No bio"}
                </div>
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(driver.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriversTable;
