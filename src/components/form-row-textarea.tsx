import { cn } from '@/lib/utils';

import FormRow from './form-row';
import { Textarea, TextareaProps } from './ui/textarea';

type Props = {
  className?: string;
  fieldProps?: TextareaProps;
  helpText?: string;
  label?: string;
};

export function FormRowTextArea({ className, fieldProps, ...props }: Props) {
  return (
    <FormRow className={cn('my-6 w-full', className)} {...props}>
      <Textarea {...fieldProps} />
    </FormRow>
  );
}
