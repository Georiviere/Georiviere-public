import {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useId,
} from 'react';

import { cn } from '@/lib/utils';

import { InputProps } from './ui/input';
import { Label } from './ui/label';
import { TextareaProps } from './ui/textarea';

export type FormRowProps = {
  children: ReactNode;
  className?: string;
  helpText?: string;
  label?: string;
};

type FieldProps = InputProps | TextareaProps;

export default function FormRow({
  label,
  helpText,
  children,
  className,
}: FormRowProps) {
  const inputId = useId();
  const helpTextId = useId();
  return (
    <div className={cn('grid items-center gap-1.5', className)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(
            child,
            {
              id: inputId,
              ...(helpText && { ['aria-describedby']: helpTextId }),
              className: 'bg-input',
            } as FieldProps,
            null,
          );
        }
        return child;
      })}
      {helpText && (
        <p id={helpTextId} className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
    </div>
  );
}
