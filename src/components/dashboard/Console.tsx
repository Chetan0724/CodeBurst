import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsoleProps {
  output: string;
  status: string;
}

const Console = ({ output, status }: ConsoleProps) => {
  const getStatusColor = () => {
    if (status === "Accepted") return "text-green-500";
    if (status === "running") return "text-yellow-500";
    if (status.includes("Error") || status.includes("Failed"))
      return "text-red-500";
    return "text-neutral-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Console Output</span>
          {status && (
            <span className={`text-sm ${getStatusColor()}`}>{status}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {output ? (
          <pre className="bg-black/5 dark:bg-white/5 p-3 rounded-md overflow-x-auto">
            <code>{output}</code>
          </pre>
        ) : (
          <p className="text-neutral-500">
            No output yet. Run your code to see results!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Console;
