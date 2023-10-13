import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native';

import { useImperativeQuery } from '@hooks';
import { QueryNewsVariables, QueryNews, NewsLanguage } from '@schema-types';
import { gql } from '@apollo/client';
import { useAlertMessage } from '@providers';
import { ModalSheet } from '@/components/common';
// import { ModalSheet } from '@common-components';

const GET_NEWS = gql`
  query QueryNews($page: Int!, $language: NewsLanguage!) {
    news(page: $page, language: $language) {
      items {
        author
        content
      }
    }
  }
`;

export const NewsStack = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsModalOpen(true)} title="press" />
      <ModalSheet
        title={'Modal title'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ctaButtonTitle={'CTA'}
        onPressCTAButton={() => console.warn('press')}>
        <Text>QW</Text>
      </ModalSheet>
    </>
  );
};
