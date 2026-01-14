"use client";
import { Code, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useProgress } from "@/hooks/useProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProgressCardProps {
  language: string;
  solved: number;
  total: number;
}

const ProgressCard = ({ language, solved, total }: ProgressCardProps) => {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <Card className="bg-[--primarytwo] text-gray-50 border-gray-700/50 hover:border-gray-500 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {language}
        </CardTitle>
        <Code className="h-4 w-4 text-gray-50" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold mb-2">
          {solved} / {total} Tasks Solved
        </div>
        <Progress value={percentage} className="h-2 bg-gray-700" />
        <p className="text-xs text-gray-400 mt-1">{percentage}% Completed</p>
      </CardContent>
    </Card>
  );
};

const Profile = () => {
  const { data: session, isPending } = authClient.useSession();
  const { data: progressData, isLoading } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [session, isPending, router]);

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-[--primaryone] text-gray-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center space-x-4 p-6 bg-[--primarytwo] rounded-xl shadow-md">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[--primarytwo] rounded-xl border border-gray-700/50 p-4 space-y-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[--primarytwo] rounded-xl border border-gray-700/50 p-4 space-y-3"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session || !progressData) {
    return null;
  }

  const totalTasks = progressData.languageStats.reduce(
    (sum, lang) => sum + lang.total,
    0
  );
  const completionRate =
    totalTasks > 0
      ? Math.round((progressData.totalSolved / totalTasks) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-[--primaryone] text-gray-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Profile
          </p>
          <h1 className="text-2xl font-semibold">Your Progress Overview</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-6 bg-[--primarytwo] rounded-xl shadow-md">
        <Avatar className="h-20 w-20 border-4 border-gray-500">
          <AvatarImage src={session.user.image || ""} alt={session.user.name} />
          <AvatarFallback className="text-3xl font-bold bg-gray-500 text-black">
            {session.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-50">
            {session.user.name}
          </h1>
          <p className="text-lg text-gray-400">Welcome back to CodeBurst.</p>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      <h2 className="text-xl font-semibold mb-4 text-gray-50">
        Your Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[--primarytwo] text-gray-50 border-gray-700/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Solved
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progressData.totalSolved}</div>
            <p className="text-xs text-gray-400">
              Tasks completed across all languages
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[--primarytwo] text-gray-50 border-gray-700/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Languages
            </CardTitle>
            <Code className="h-5 w-5 text-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {progressData.languageStats.length}
            </div>
            <p className="text-xs text-gray-400">
              Total programming language sets
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[--primarytwo] text-gray-50 border-gray-700/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Overall Progress
            </CardTitle>
            <Star className="h-5 w-5 text-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <p className="text-xs text-gray-400">
              Completion rate ({totalTasks} total tasks)
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-gray-700" />
      <h2 className="text-xl font-semibold mb-4 text-gray-50">
        Language Progress
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {progressData.languageStats.map((lang) => (
          <ProgressCard
            key={lang.language}
            language={lang.language}
            solved={lang.solved}
            total={lang.total}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
