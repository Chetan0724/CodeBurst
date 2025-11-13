import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";

interface taskProps {
  taskId: number;
  difficulty: string;
  topic: string;
}

const TaskCard = ({ taskId, difficulty, topic }: taskProps) => {
  const { currTaskId } = useContext(EditorContext)!;

  return (
    <Card
      className={currTaskId == taskId ? "bg-border" : ""}
    >
      <CardHeader>
        <CardTitle>{`Task#${taskId}`}</CardTitle>
        <CardDescription>{difficulty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{topic}</p>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
