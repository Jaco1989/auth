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
import { fetchAllAdmins } from "../admins/actions";

const AdminsTable = async () => {
  const result = await fetchAllAdmins();

  if ("error" in result) {
    return <div className="text-red-500">{result.error}</div>;
  }

  const { admins } = result;

  if (!admins || admins.length === 0) {
    return <div className="text-gray-500">No admin users found.</div>;
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
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">
                  <Avatar>
                    <AvatarImage
                      src={admin.avatarUrl || undefined}
                      alt={admin.displayName}
                    />
                    <AvatarFallback>
                      {admin.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell>{admin.displayName}</TableCell>
                <TableCell>{admin.email || "N/A"}</TableCell>
                <TableCell>
                  {admin.bio ? admin.bio.slice(0, 50) + "..." : "No bio"}
                </TableCell>
                <TableCell className="text-right">
                  {admin.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="space-y-4 md:hidden">
        {admins.map((admin) => (
          <Card key={admin.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={admin.avatarUrl || undefined}
                    alt={admin.displayName}
                  />
                  <AvatarFallback>
                    {admin.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{admin.displayName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Username:</span>{" "}
                  {admin.username}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {admin.email || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Bio:</span>{" "}
                  {admin.bio ? admin.bio.slice(0, 50) + "..." : "No bio"}
                </div>
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {admin.createdAt.toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminsTable;
