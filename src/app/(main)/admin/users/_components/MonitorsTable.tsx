import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail } from "lucide-react";
import { fetchAllMonitors } from "../monitors/actions";

const MonitorsTable = async () => {
  const { monitors, error } = await fetchAllMonitors();

  if (error) return <div>Error: {error}</div>;
  if (!monitors || monitors.length === 0) return <div>No monitors found.</div>;

  return (
    <div>
      {/* Card view for small screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {monitors.map((monitor) => (
          <Card key={monitor.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Avatar>
                  {monitor.avatarUrl ? (
                    <AvatarImage
                      src={monitor.avatarUrl}
                      alt={monitor.displayName}
                    />
                  ) : (
                    <AvatarFallback>
                      {monitor.displayName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span>{monitor.displayName}</span>
              </CardTitle>
              <CardDescription>{monitor.username}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>{monitor.email}</span>
              </div>
              <div className="mt-2 text-sm">{monitor.bio}</div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Joined {new Date(monitor.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Table view for medium and large screens */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monitors.map((monitor) => (
              <TableRow key={monitor.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      {monitor.avatarUrl ? (
                        <AvatarImage
                          src={monitor.avatarUrl}
                          alt={monitor.displayName}
                        />
                      ) : (
                        <AvatarFallback>
                          {monitor.displayName.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span>{monitor.displayName}</span>
                  </div>
                </TableCell>
                <TableCell>{monitor.username}</TableCell>
                <TableCell>{monitor.email}</TableCell>
                <TableCell>{monitor.bio}</TableCell>
                <TableCell>
                  {new Date(monitor.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MonitorsTable;
