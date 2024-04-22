import { Alert, AlertDescription, AlertTitle } from '@/components/alert/alert';
import { Icons } from '@/components/icons';

type Props = {
  title?: string;
  message?: string;
};

export default function ErrorMessage({
  title = 'An error occured',
  message,
}: Props) {
  return (
    <div className="container my-10 grow">
      <Alert variant="destructive">
        <Icons.alert className="size-4" />
        <AlertTitle className="ml-6">{title}</AlertTitle>
        {message && <AlertDescription>{message}</AlertDescription>}
      </Alert>
    </div>
  );
}
