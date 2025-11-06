import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="mt-36">
      <h2 className="text-3xl font-bold">Profile</h2>
      <p className="text-xl text-neutral-500">Track your progress and achievements</p>
    </div>
  );
};

export default Profile;
