"use client";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
import EditorPage from "@/components/dashboard/Editor";
import LeftBar from "@/components/dashboard/LeftBar";
import TaskMain from "@/components/dashboard/TaskMain";
import ProgressComp from "@/components/dashboard/Progress";
import Console from "@/components/dashboard/Console";
import { useContext } from "react";
import SidebarContext from "@/context/SidebarContext";

const Dashboard = () => {
  const { isSidebarOpen } = useContext(SidebarContext)!;

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/signin");
  // }

  return (
    <div>
      <div>
        <LeftBar />
      </div>

      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out
    ${isSidebarOpen ? "sm:ml-80" : "sm:ml-0"}
  `}
      >
        <div className="lg:col-span-3">
          <TaskMain />
        </div>
        <div className="lg:col-span-2">
          <EditorPage />
        </div>
        <div>
          <Console />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
