import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  readOnly,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);