import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditorPage from "@/components/dashboard/Editor";
import LeftBar from "@/components/dashboard/LeftBar";
import TaskMain from "@/components/dashboard/TaskMain";
import ProgressComp from "@/components/dashboard/Progress";
import Console from "@/components/dashboard/Console";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 mt-36">
      <div className="row-span-3">
        <LeftBar />
      </div>
      <div className="col-span-2">
        <TaskMain />
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-2">
        <EditorPage />
      </div>
      <div className="col-start-4 row-start-1">
        <ProgressComp />
      </div>
      <div className="row-span-2 col-start-4 row-start-2">
        <Console />
      </div>
    </div>
  );
};

export default Dashboard;
