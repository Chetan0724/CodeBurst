import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressComp = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardAction>1/15</CardAction>
      </CardHeader>
      <CardContent>
        <Progress value={33} />
      </CardContent>
      <CardFooter>
        <p className="text-neutral-400">20% Complete</p>
      </CardFooter>
    </Card>
  );
};

export default ProgressComp;
