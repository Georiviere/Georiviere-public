'use client';

import { useSettingsContext } from '@/context/settings';

import SuggestionList from './suggestion-list';

export default function SuggestionProvider() {
  const { settings } = useSettingsContext();

  if (settings === null) {
    return null;
  }

  const {
    homepage: { suggestions },
  } = settings.customization;

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <>
      {suggestions.map((props, index) => (
        <SuggestionList className="my-8" key={index} {...props} />
      ))}
    </>
  );
}
