'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Station, getStations } from '@/api/stations';
import {
  DataValidator,
  EditorState,
  ReactJSONForm,
} from '@bhch/react-json-form';
import { useTranslations } from 'next-intl';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';

const NewObservationForm = ({
  schema,
  id,
  stations,
}: {
  id: string;
  schema: any;
  stations: number[];
}) => {
  const t = useTranslations('observation');
  const [isLoading, setLoading] = useState(false);
  const [stationsDetails, setStationsDetails] = useState<Station[]>([]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.create(schema, {}),
  );

  const [errorMap, setErrorMap] = useState({});

  useEffect(() => {
    const fetchStations = async () => {
      const details = await getStations();
      setStationsDetails(details);
    };
    fetchStations();
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validator = new DataValidator(schema);
      const validation = validator.validate(editorState.state.data);
      const formData = new FormData(event.target as HTMLFormElement);

      const isValid = validation.isValid;
      if (isValid)
        console.log(
          'form info to send : ',
          editorState.state.data,
          formData.values(),
        );
      else {
        const errorMap = validation.errorMap;
        setErrorMap(errorMap);
      }
    },
    [schema, editorState],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Station</label>
        <div className="rjf-input-group">
          {stations.length > 0 ? (
            <select>
              {stations.map(station => (
                <option value={station}>
                  {stationsDetails.find(e => e.id === station)?.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex flex-row">
              <input type="text" placeholder="lat" />
              <input type="text" placeholder="lng" />
            </div>
          )}
        </div>
      </div>

      <ReactJSONForm
        errorMap={errorMap}
        editorState={editorState}
        onChange={setEditorState}
      />
      <div className="flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rjf-input-group">
            <div className="flex flex-row justify-between">
              <label htmlFor="" className="text-sm font-medium">
                Fichier {index + 1}
              </label>
              <select
                name={`file${index + 1}-category`}
                className="rounded bg-input p-1 text-sm"
              >
                <option value="photo">Photo</option>
                <option value="fiche">Fiche</option>
                <option value="cat_3">Catégorie 3</option>
                <option value="cat_4">Categorie 4</option>
              </select>
            </div>
            <input type="file" name={`file${index + 1}-file`} id="" />
          </div>
        ))}
      </div>
      <p className="my-8 text-sm">{t('gdpr')}</p>

      <Button className="my-3 flex gap-2" type="submit">
        {isLoading && (
          <>
            <Icons.loading
              className="animate-spin"
              {...propsForSVGPresentation}
              height="20"
            />
            <span className="sr-only">{t('loading')}</span>
          </>
        )}{' '}
        <span>{t('submit')}</span>
      </Button>
    </form>
  );
};

export default NewObservationForm;
