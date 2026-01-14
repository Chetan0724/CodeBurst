"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalSolved: number;
}

interface AdminUsersResponse {
  total: number;
  users: AdminUser[];
}

const fetchAdminUsers = async (): Promise<AdminUsersResponse> => {
  const res = await fetch("/api/admin/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

const AdminUsersSection = () => {
  const { data, isLoading, isError } = useQuery<AdminUsersResponse>({
    queryKey: ["admin-users"],
    queryFn: fetchAdminUsers,
  });

  if (isLoading) {
    return (
      <Card className="bg-primarytwo border border-border">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-32" />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-3 items-center text-sm"
            >
              <Skeleton className="h-4 w-28 col-span-1" />
              <Skeleton className="h-4 w-40 col-span-1" />
              <Skeleton className="h-4 w-16 col-span-1" />
              <Skeleton className="h-4 w-10 col-span-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="bg-primarytwo border border-border">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">
            Failed to load users. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-primarytwo border border-border">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-semibold">Users</CardTitle>
          <p className="text-xs text-muted-foreground">
            Total users: {data.total}
          </p>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border">
              <th className="text-left py-2 pr-4 font-medium">Name</th>
              <th className="text-left py-2 pr-4 font-medium">Email</th>
              <th className="text-left py-2 pr-4 font-medium">Role</th>
              <th className="text-left py-2 pr-4 font-medium">Solved</th>
              <th className="text-left py-2 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border/60 last:border-none"
              >
                <td className="py-2 pr-4">
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="py-2 pr-4">
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </td>
                <td className="py-2 pr-4">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide bg-secondary text-secondary-foreground">
                    {user.role}
                  </span>
                </td>
                <td className="py-2 pr-4">
                  <span className="text-xs">{user.totalSolved}</span>
                </td>
                <td className="py-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default AdminUsersSection;

