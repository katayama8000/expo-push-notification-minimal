import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const registerForPushNotificationsAsync = async (): Promise<
  string | null
> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }
    if (Constants.expoConfig === null) return null;
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra?.eas.projectId,
      })
    ).data;
    return token;
  }
  console.log('Must use physical device for Push Notifications');

  return null;
};
