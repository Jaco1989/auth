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
import { fetchAllSkippers } from "../skippers/actions";

const SkippersTable = async () => {
  const { skippers, error } = await fetchAllSkippers();

  if (error) return <div>Error: {error}</div>;
  if (!skippers || skippers.length === 0) return <div>No skippers found.</div>;

  return (
    <div>
      {/* Card view for small screens */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {skippers.map((skipper) => (
          <Card key={skipper.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Avatar>
                  {skipper.avatarUrl ? (
                    <AvatarImage
                      src={skipper.avatarUrl}
                      alt={skipper.displayName}
                    />
                  ) : (
                    <AvatarFallback>
                      {skipper.displayName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span>{skipper.displayName}</span>
              </CardTitle>
              <CardDescription>{skipper.username}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>{skipper.email}</span>
              </div>
              <div className="mt-2 text-sm">{skipper.bio}</div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Joined {new Date(skipper.createdAt).toLocaleDateString()}
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
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skippers.map((skipper) => (
              <TableRow key={skipper.id}>
                <TableCell>
                  <Avatar>
                    {skipper.avatarUrl ? (
                      <AvatarImage
                        src={skipper.avatarUrl}
                        alt={skipper.displayName}
                      />
                    ) : (
                      <AvatarFallback>
                        {skipper.displayName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </TableCell>
                <TableCell>{skipper.displayName}</TableCell>
                <TableCell>{skipper.username}</TableCell>
                <TableCell>{skipper.email}</TableCell>
                <TableCell>
                  {skipper.bio ? skipper.bio.slice(0, 50) + "..." : "No bio"}
                </TableCell>
                <TableCell>
                  {new Date(skipper.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkippersTable;
