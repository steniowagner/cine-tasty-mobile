import {useCallback, useEffect, useMemo, useState} from 'react';

import packageJson from '@dependencies';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const useSupportLibraries = () => {
  const [supportLibraries, setSupportLibraries] = useState([]);

  const translate = useTranslations();

  const texts = useMemo(
    () => ({
      title: translate.translate(
        Translations.Tags.SETTINGS_OPEN_SOURCE_LIBRARIES_TITLE,
      ),
      description: translate.translate(
        Translations.Tags.SETTINGS_OPEN_SOURCE_LIBRARIES_DESCRIPTION,
      ),
    }),
    [translate.translate],
  );

  const setDevDependencies = useCallback(() => {
    const devDependencies = Object.keys(packageJson.devDependencies);
    setSupportLibraries(libraries => [...libraries, ...devDependencies]);
  }, []);

  const setDependencies = useCallback(() => {
    const dependencies = Object.keys(packageJson.dependencies);
    setSupportLibraries(libraries => [...libraries, ...dependencies]);
  }, []);

  useEffect(() => {
    setDevDependencies();
    setDependencies();
  }, []);

  const libraries = useMemo(
    () => supportLibraries.sort((a, b) => a.localeCompare(b)),
    [supportLibraries],
  );

  return {
    libraries,
    texts,
  };
};
