import React, {
  ReactNode,
  useCallback,
  useContext,
  useState,
  Context,
  useMemo,
} from 'react';

import * as Types from '@local-types';

import {useMakeSelectableOptionsDatasets} from '../hooks/make-selectable-options-datasets/useMakeSelectableOptionsDatasets';
import * as options from '../hooks/make-selectable-options-datasets/options';

type ParsedQuizFilterOption = {
  isEquals?: (other: Types.QuizFilterOption) => boolean;
  label?: string;
};

type ModalOptionsListItem = Types.QuizFilterOption & ParsedQuizFilterOption;

type OptionsSelected = Record<Types.QuizOption, ModalOptionsListItem>;

type OptionsSelectedContextProps = {
  onPressOptionSection: (optionSection: Types.QuizOption) => void;
  selectedOptions: OptionsSelected;
  onPressModalOptionsCta: (optionSelected: ModalOptionsListItem) => void;
  activeOption: ModalOptionsListItem;
};

const OPTIONS_SELECTED_CONTEXT: OptionsSelectedContextProps = {
  onPressOptionSection: () => {},
  onPressModalOptionsCta: () => {},
  selectedOptions: {
    difficulty: options.difficulties[0],
    category: options.categories[0],
    type: options.types[0],
  },
  activeOption: undefined,
};

export const OptionsSelectedContext: Context<OptionsSelectedContextProps> =
  React.createContext(OPTIONS_SELECTED_CONTEXT);

type OptionsSelectedProviderProps = {
  children?: ReactNode;
};

export const OptionsSelectedProvider = (
  props: OptionsSelectedProviderProps,
) => {
  const selectableOptionsDatasets = useMakeSelectableOptionsDatasets();

  const [selectedOptions, setSelectedOptions] = useState<OptionsSelected>({
    difficulty: selectableOptionsDatasets.difficulties[0],
    category: selectableOptionsDatasets.categories[0],
    type: selectableOptionsDatasets.types[0],
  });

  const [sectionSelected, setSectionSelected] = useState<
    Types.QuizOption | undefined
  >();

  const handlePressModalOptionsCta = useCallback(
    (option: Types.QuizFilterOption) => {
      setSelectedOptions(currentOptionsSelected => ({
        ...currentOptionsSelected,
        [sectionSelected]: option,
      }));
    },
    [sectionSelected],
  );

  const context: OptionsSelectedContextProps = useMemo(
    () => ({
      onPressOptionSection: (optionSection: Types.QuizOption) =>
        setSectionSelected(optionSection),
      selectedOptions,
      onPressModalOptionsCta: handlePressModalOptionsCta,
      activeOption: selectedOptions[sectionSelected],
    }),
    [selectedOptions, sectionSelected],
  );

  return (
    <OptionsSelectedContext.Provider value={context}>
      {props.children}
    </OptionsSelectedContext.Provider>
  );
};

export const useOptionsSelected = () => useContext(OptionsSelectedContext);
