"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageDropdown = () => {
  return (
    <Select>
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
