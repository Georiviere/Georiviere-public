'use client';

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Station, getStations } from '@/api/stations';
import { useMapContext } from '@/context/map';
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
  handleSubmitObservation,
}: {
  id?: number;
  schema: any;
  stations?: number[];
  handleSubmitObservation: Function;
}) => {
  const t = useTranslations('observation');
  const params = useSearchParams();
  const router = useRouter();
  const { observationCoordinates } = useMapContext();

  const [isLoading, setLoading] = useState(false);
  const [stationsDetails, setStationsDetails] = useState<Station[]>([]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.create(schema, {}),
  );

  const [errorMap, setErrorMap] = useState({});

  const [lng, lat] = observationCoordinates?.coordinates ?? [];

  useEffect(() => {
    const fetchStations = async () => {
      const details = await getStations();
      setStationsDetails(details);
    };
    fetchStations();
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validator = new DataValidator(schema);
      const validation = validator.validate(editorState.state.data);
      const formData = new FormData(event.target as HTMLFormElement);

      const isValid = validation.isValid;
      if (isValid && id) {
        setLoading(true);
        const contributedAt = new Date(
          `${formData.get('contributed_at_date')} ${formData.get(
            'contributed_at_time',
          )}`,
        );
        const result = await handleSubmitObservation(
          {
            ...(formData.get('lat') && formData.get('lng')
              ? { geom: `POINT(${formData.get('lng')} ${formData.get('lat')})` }
              : {}),
            ...(formData.get('station')
              ? { station: formData.get('station') }
              : {}),
            contributed_at: contributedAt.toISOString(),
            ...editorState.state.data,
          },
          id,
          formData,
        );
        setLoading(false);
        if (!result.error) {
          router.push(`/map?${params.toString()}`);
        } else {
          console.error(result.message);
        }
      } else {
        const errorMap = validation.errorMap;
        setErrorMap(errorMap);
      }
    },
    [
      schema,
      editorState.state.data,
      id,
      handleSubmitObservation,
      router,
      params,
    ],
  );

  return (
    <form onSubmit={handleSubmit}>
      {stations?.length && stations?.length > 0 ? (
        <div className="rjf-input-group">
          <label htmlFor="station" className="text-sm font-medium">
            {t('station')}
          </label>
          <select
            name="station"
            defaultValue={
              params.get('station')
                ? parseInt(params.get('station') ?? '')
                : undefined
            }
          >
            {stations?.map(station => (
              <option value={station}>
                {stationsDetails.find(e => e.id === station)?.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          <div className="rjf-form-row">
            <div className="rjf-input-group">
              <label htmlFor="lat">{t('lat')}</label>
              <input required name="lat" type="number" readOnly value={lat} />
            </div>
          </div>

          <div className="rjf-form-row">
            <div className="rjf-input-group">
              <label htmlFor="lng">{t('lng')}</label>
              <input required name="lng" type="number" readOnly value={lng} />
            </div>
            <div className="rjf-help-text">{t('coordinatesHelptext')}</div>
          </div>
        </>
      )}
      <div className="rjf-form-row">
        <div className="rjf-input-group">
          <label htmlFor="contributed_at_date">{t('date')}</label>
          <input required name="contributed_at_date" type="date" />
        </div>
      </div>
      <div className="rjf-form-row">
        <div className="rjf-input-group">
          <label htmlFor="contributed_at_time">{t('time')}</label>
          <input required name="contributed_at_time" type="time" />
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
                {t('photoLabel')} {index + 1}
              </label>
              <select
                name={`file${index + 1}-category`}
                className="rounded bg-input p-1 text-sm"
              >
                <option value="croquis">Croquis station</option>
                <option value="photos_comp">Photo complémentaire</option>
                <option value="photo_station">Photo station</option>
                <option value="photo_equipe">
                  Photo équipe de prélèvement
                </option>
                <option value="photos">Photographies</option>
                <option value="scan_fiche">Scan des fiches terrains</option>
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
