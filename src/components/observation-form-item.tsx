import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

type Props = {
  form: UseFormReturn;
  name: string;
  description?: string;
  format?: string;
  label?: string;
  list?: string[];
  type?: string;
  fieldsProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

const getInputType = (format?: string) => {
  if (format === undefined) {
    return 'text';
  }
  if (['date-time', 'datetime-local'].includes(format)) {
    return 'datetime-local';
  }
  return format;
};

export default function ObservationFormItem({
  form,
  name,
  label,
  list,
  format,
  description,
  fieldsProps,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...props } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {list !== undefined ? (
                <Select onValueChange={onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {list.map(value => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : name !== 'description' ? (
                <Input
                  {...props}
                  className="bg-input"
                  type={getInputType(format)}
                  onChange={event => {
                    onChange(event);
                    if (fieldsProps?.type === 'number') {
                      form.setValue(name, event.target.valueAsNumber);
                    }
                  }}
                  value={value}
                  {...fieldsProps}
                  {...(format?.startsWith('date') && {
                    max: new Date().toISOString().split('T')[0],
                  })}
                />
              ) : (
                <Textarea
                  {...props}
                  className="bg-input"
                  type={getInputType(format)}
                  onChange={onChange}
                  value={value}
                  {...fieldsProps}
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
