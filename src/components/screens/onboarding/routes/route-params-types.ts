import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';

type OnboardingStackParams = {
  [Routes.Onboarding.ONBOARDING]: {
    onFinishShowOnboarding: () => Promise<void>;
  };
};

/** Onboarding-Stack-Props */
export type OnboardingStackNavigationProp = StackNavigationProp<
  OnboardingStackParams,
  Routes.Onboarding.ONBOARDING
>;

export type OnboardingStackRouteProp = RouteProp<
  OnboardingStackParams,
  Routes.Onboarding.ONBOARDING
>;

export type OnboardingStackProps = {
  navigation: OnboardingStackNavigationProp;
  route: OnboardingStackRouteProp;
};
