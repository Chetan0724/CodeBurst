"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";

const LanguageDropdown = () => {
  const { language, setLanguage, setTasks, allTasks } =
    useContext(EditorContext)!;

  const handleValueChange = (value: string) => {
    setLanguage(value);
    setTasks(allTasks.filter((task) => task.language === value));
  };

  return (
    <Select value={language} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Programming Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageDropdown;
