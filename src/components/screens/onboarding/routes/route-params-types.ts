import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';

type OnboardingStackParams = {
  [Routes.Onboarding.ONBOARDING]: undefined;
};

export type OnboardingStackProps = {
  navigation: StackNavigationProp<OnboardingStackParams, Routes.Onboarding.ONBOARDING>;
  route: RouteProp<OnboardingStackParams, Routes.Onboarding.ONBOARDING>;
};
