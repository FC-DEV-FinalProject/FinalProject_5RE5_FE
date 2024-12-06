declare module '@/components/ui/input' {
  export const Input: React.ComponentType<
    React.InputHTMLAttributes<HTMLInputElement>
  >;
}

declare module '@/components/ui/label' {
  export const Label: React.ComponentType<
    React.LabelHTMLAttributes<HTMLLabelElement>
  >;
}

interface ExtComponentPropsWithoutRef
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

declare module '@/components/ui/checkbox' {
  export const Checkbox: React.ComponentType<ExtComponentPropsWithoutRef>;
}
