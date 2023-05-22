import { useId } from 'react';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import FormRow from './form-row';
import { InputProps } from './ui/input';
import { Label } from './ui/label';

type Props = {
  className?: string;
  fieldProps?: InputProps;
  helpText?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
};

export function FormRowSelect({
  className,
  label,
  helpText,
  fieldProps,
  options,
}: Props) {
  const selectId = useId();
  const helpTextId = useId();
  const selectValueProps = {
    ...(helpText && { ['aria-describedby']: helpTextId }),
    ...fieldProps,
  };
  return (
    <div className={cn('my-6 grid w-full items-center gap-1.5', className)}>
      {label && <Label htmlFor={selectId}>{label}</Label>}
      <Select>
        <SelectTrigger id={selectId} className="w-full bg-input">
          <SelectValue {...selectValueProps} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helpText && (
        <p id={helpTextId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  );
}
