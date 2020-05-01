import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import CustomModal from 'components/common/custom-modal/CustomModal';

import useSetupQuestions from './useSetupQuestions';
import DropdownOption from './DropdownOption';
import OptionListItem from './OptionListItem';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LineDivider = styled(View)`
  width: 100%;
  height: 1.8px;
  background-color: #f2f2f2;
`;

const SetupQuestions = () => {
  const {
    indexLastOptionSelected,
    onPressOptionDropdown,
    questionDifficulty,
    questionCategory,
    onSelectOption,
    onPressSelect,
    onCloseModal,
    questionType,
    isModalOpen,
    options,
  } = useSetupQuestions();

  return (
    <Wrapper>
      <DropdownOption
        onPress={() => onPressOptionDropdown('DIFFICULTY')}
        selectedOption={questionDifficulty}
        label="Difficulty"
      />
      <DropdownOption
        onPress={() => onPressOptionDropdown('CATEGORY')}
        selectedOption={questionCategory}
        label="Category"
      />
      <DropdownOption
        onPress={() => onPressOptionDropdown('TYPE')}
        selectedOption={questionType}
        label="Type"
      />
      {isModalOpen && (
        <CustomModal
          onPressSelect={onPressSelect}
          onClose={onCloseModal}
          headerText="HEUUHE"
          footerText="ASDSASD"
        >
          <FlatList
            renderItem={({ item, index }) => (
              <OptionListItem
                isSelected={indexLastOptionSelected === index}
                onPress={() => onSelectOption(index)}
                title={item}
              />
            )}
            ItemSeparatorComponent={() => <LineDivider />}
            keyExtractor={(item) => item}
            testID="options-list"
            data={options}
          />
        </CustomModal>
      )}
    </Wrapper>
  );
};

export default SetupQuestions;
