import React  from "react";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IOption {
  label: string;
  value: string;
}

export const Select: React.FC<{
  options: IOption[];
  value: IOption["value"];
  onChange: (value: IOption["value"]) => void;
  className?: string;
  placeholder: string;
}> = ({ options, value, onChange, className, placeholder = "Selecione" }) => {
  const handleOptionClick = (selectedValue: IOption["value"]) => {
    onChange(selectedValue);
  };

  return (
    <SelectComponent onValueChange={handleOptionClick} defaultValue={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
};
