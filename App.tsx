import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AllTryScreen } from './src/page/AllTry';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TryDetailScreen } from './src/page/TryDetail';
import { type StackNavigationProp } from '@react-navigation/stack';
import { NewTryScreen } from './src/page/NewTry';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen } from './src/page/Account';
import { DemoScreen } from './src/page/Demo';
import { SignUpScreen } from './src/page/SignUp';
import { SignInScreen } from './src/page/SignIn';
import { TryingDetailScreen } from './src/page/TryingDetail';

type ScreenList = {
  AllTry: undefined;
  TryDetail: undefined;
  NewTry: undefined;
  Account: undefined;
  TryingDetail: undefined;
};

export type NavigationProp = StackNavigationProp<ScreenList>;

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AllTry" component={AllTryScreen} />
        <Stack.Screen name="TryingDetail" component={TryingDetailScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Demo" component={DemoScreen} />
        <Stack.Screen name="Tab" component={MyTabs} />
        <Stack.Screen name="TryDetail" component={TryDetailScreen} />
        <Stack.Screen name="NewTry" component={NewTryScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllTry" component={AllTryScreen} />
      <Tab.Screen name="NewTry" component={NewTryScreen} />
    </Tab.Navigator>
  );
};
