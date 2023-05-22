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

type Props = {
  control: any;
  name: string;
  description?: string;
  format?: string;
  label?: string;
  list?: string[];
};

const getInputType = (format?: string) => {
  if (format === undefined) {
    return 'text';
  }
  if (format === 'date-time') {
    return 'datetime-local';
  }
  return format;
};

export default function ObservationFormItem({
  control,
  name,
  label,
  list,
  format,
  description,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {list !== undefined ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            ) : (
              <Input
                {...field}
                className="bg-input"
                type={getInputType(format)}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
