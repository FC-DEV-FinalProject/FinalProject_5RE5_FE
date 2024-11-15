import { Term } from "@/types/signup";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";

interface TermsSectionProps {
  terms: Term[];
  error?: string;
  onChange:(termCode: string, checked: boolean) => void;
}

export const TermsSection: React.FC<TermsSectionProps> = ({ terms, error, onChange }) => (
  <div className="space-y-2">
    <Label>약관 동의</Label>
    <div className="mb-4">
      <Checkbox
        id="select-all"
        onCheckedChange={(checked) => onChange?.('all', !!checked)}
      />
      <label htmlFor="select-all" className="ml-2">
        전체 동의
      </label>
    </div>
    {terms.map((term) => (
      <div key={term.termCode} className="flex items-center space-x-2">
        <Checkbox
          id={term.termCode}
          onCheckedChange={(checked) => onChange?.(term.termCode, !!checked)}
          aria-required={term.chkTerm}
          aria-describedby={`${term.termCode}-description`}
        />
        <label
          htmlFor={term.termCode}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {term.termName} {term.chkTerm ? '(필수)' : '(선택)'}
        </label>
        <span id={`${term.termCode}-description`} className="sr-only">
          {term.chkTerm ? '필수 약관입니다' : '선택 약관입니다'}
        </span>
      </div>
    ))}
    {error && <p className="text-red-500" role="alert">{error}</p>}
  </div>
);

