import { Term } from "@/types/signup";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";

interface TermsSectionProps {
  terms: Term[];
  error?: string;
}

export const TermsSection: React.FC<TermsSectionProps> = ({ terms, error }) => (
  <div className="space-y-2">
    <Label>약관 동의</Label>
    {terms.map((term) => (
      <div key={term.termCode} className="flex items-center space-x-2">
        <Checkbox id={term.termCode} />
        <label
          htmlFor={term.termCode}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {term.termName} {term.chkTerm ? '(필수)' : '(선택)'}
        </label>
      </div>
    ))}
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

