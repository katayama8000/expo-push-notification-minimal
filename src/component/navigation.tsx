import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  type StackNavigationProp,
} from '@react-navigation/stack';
import { SignUpScreen } from '../page/SignUp';
import { SignInScreen } from '../page/SignIn';
import { HomeScreen } from '../page/Home';
import { AboutScreen } from '../page/About';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { linkingConfig } from '../navigation/navigate';

type ScreenList = {
  HomeScreen: undefined;
  AboutScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type NavigationProp = StackNavigationProp<ScreenList>;

const Stack = createStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Demo" component={AboutScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Tab" component={MyTabs} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

const linkingPrefix = Linking.createURL('/');

type Props = {
  onReady?: () => void;
  initialUrl: string;
};

export const Navigation: FC<Props> = ({ onReady, initialUrl }) => {
  return (
    <NavigationContainer
      onReady={onReady}
      linking={{
        prefixes: [linkingPrefix],
        config: linkingConfig,
        getInitialURL: () => {
          return initialUrl;
        },
        subscribe: (listener) => {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener(
            'url',
            onReceiveURL
          );

          // Listen to expo push notifications
          const notificationSubscription =
            Notifications.addNotificationResponseReceivedListener(
              (notificationResponse: any) => {
                (async () => {
                  // const url = await getUrlFromPushNotification(
                  //   notificationResponse
                  // );
                  // if (url === null) return;
                  listener('/home');
                })();
              }
            );

          return () => {
            eventListenerSubscription.remove();
            notificationSubscription.remove();
          };
        },
      }}>
      <RootStack />
    </NavigationContainer>
  );
};
