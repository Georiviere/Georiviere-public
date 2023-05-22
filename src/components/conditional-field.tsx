import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ObservationFormItem from './observation-form-item';

type Props = {
  control: any;
  name: string;
  description?: string;
  format?: string;
  label: string;
  list?: string[];
};

export default function ConditionalField(props: Props) {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(props.name);
    return () => {
      unregister(props.name);
    };
  }, [props.name, register, unregister]);

  return <ObservationFormItem {...props} />;
}
