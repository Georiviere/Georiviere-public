import { cn } from '@/lib/utils';

import FormRow from './form-row';
import { Input, InputProps } from './ui/input';

type Props = {
  className?: string;
  fieldProps?: InputProps;
  helpText?: string;
  label?: string;
};

export function FormRowInput({ className, fieldProps, ...props }: Props) {
  return (
    <FormRow className={cn('my-6 w-full', className)} {...props}>
      <Input type="text" {...fieldProps} />
    </FormRow>
  );
}
