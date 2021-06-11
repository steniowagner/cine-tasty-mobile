import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';

type OnboardingStackParams = {
  [Routes.Onboarding.ONBOARDING]: {
    onFinishShowOnboarding: () => Promise<void>;
  };
};

export type OnboardingStackProps = {
  navigation: StackNavigationProp<OnboardingStackParams, Routes.Onboarding.ONBOARDING>;
  route: RouteProp<OnboardingStackParams, Routes.Onboarding.ONBOARDING>;
};