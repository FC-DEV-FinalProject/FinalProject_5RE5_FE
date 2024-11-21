import React from 'react';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, checked, onCheckedChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxPrimitive.Indicator />
      </CheckboxPrimitive.Root>
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};