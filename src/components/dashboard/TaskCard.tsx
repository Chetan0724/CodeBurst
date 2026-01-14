import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";
import { CheckCircle } from "lucide-react";

interface taskProps {
  taskId: number;
  difficulty: string;
  topic: string;
  isSolved?: boolean;
}

const TaskCard = ({ taskId, difficulty, topic, isSolved }: taskProps) => {
  const { currTaskId } = useContext(EditorContext)!;

  return (
    <Card className={currTaskId == taskId ? "bg-border" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{`Task#${taskId}`}</CardTitle>
            <CardDescription>{difficulty}</CardDescription>
          </div>
          {isSolved && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
      </CardHeader>
      <CardContent>
        <p>{topic}</p>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
