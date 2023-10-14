import { type RouteProp, type LinkingOptions } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

type ScreenList = {
  HomeScreen: undefined;
  AboutScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type RoutePropList<T extends keyof ScreenList> = RouteProp<
  ScreenList,
  T
>;
export type NavigationProp = StackNavigationProp<ScreenList>;

const linkingPathConfigMap = {
  HomeScreen: {
    path: 'home',
  },
  AboutScreen: {
    path: 'about',
  },
  SignInScreen: {
    path: 'signin',
  },
  SignUpScreen: {
    path: 'signup',
  },
};

export const linkingConfig: LinkingOptions<
  typeof linkingPathConfigMap
>['config'] = {
  screens: linkingPathConfigMap,
};
