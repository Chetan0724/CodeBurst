import TaskCard from "@/components/TaskCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <TaskCard />
    </div>
  );
};

export default Dashboard;
