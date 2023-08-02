import {useMemo} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {Routes} from '@routes/routes';
import {useTranslations} from '@hooks';

import items from './items';
import {Translations} from '@i18n/tags';

const screensAbleToShowTabNavigator: string[] = [
  Routes.Home.HOME,
  Routes.Famous.FAMOUS,
  Routes.Quiz.QUIZ,
  Routes.News.NEWS,
];

export const useTabNavigator = (props: BottomTabBarProps) => {
  const translations = useTranslations();

  const shouldShowTabNavigator = useMemo(() => {
    const currentTabState = props.state.routes[props.state.index].state;
    if (!currentTabState) {
      return true;
    }
    const {routes, index} = currentTabState;
    if (!index && typeof index !== 'number') {
      return false;
    }
    const {name} = routes[index];
    return screensAbleToShowTabNavigator.includes(name);
  }, [props.state]);

  const tabTitles = useMemo(
    () =>
      items.map(item => {
        const [, , title] = item.id.split('/');
        return title;
      }),
    [items],
  );

  const tabs = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        title: translations.translate(
          `${Translations.Tags.TABS}:${tabTitles[
            index
          ].toLowerCase()}` as Translations.Tags,
        ),
      })),
    [tabTitles],
  );

  return {
    shouldShowTabNavigator,
    tabs,
  };
};
