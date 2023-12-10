import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Subscription } from 'expo-notifications';
import axios, { AxiosResponse } from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string | undefined) {
  if (!expoPushToken) return;

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token: string | undefined;

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
      alert('Failed to get push token for push notification!');
      return undefined;
    }

    const expoPushTokenObject = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    token = expoPushTokenObject.data;
    console.log(token);
  } else {
    alert('Must use a physical device for Push Notifications');
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  interface Args {
    expo_push_token: string;
    title: string;
    body: string;
  }

  interface Response {
    success: boolean;
  }

  const apiUrl = 'http://localhost/submit';

  const pushMessage = async ({
    expo_push_token,
    title,
    body,
  }: Args): Promise<AxiosResponse<Response>> => {
    console.log(
      'Sending:',
      JSON.stringify({
        expo_push_token,
        title,
        body,
      })
    );
    const token = 'ExponentPushToken[b5nR6zALafV431QtOC7byo]';
    try {
      const response = await axios.post('http://127.0.0.1:3000/submit', {
        token,
        title,
        body,
      });

      console.log('Response:', response.data);
      return response;
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const handlePostSubmit = async () => {
    const expoPushToken = 'ExponentPushToken[b5nR6zALafV431QtOC7byo]';
    try {
      const response = await axios.post('http://127.0.0.1:3000/submit', {
        body: 'test-from-nextjs',
        expo_push_token: expoPushToken,
        title: 'test-from-nextjs',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification?.request.content.title || ''}</Text>
        <Text>Body: {notification?.request.content.body || ''}</Text>
        <Text>
          Data:{' '}
          {notification
            ? JSON.stringify(notification.request.content.data)
            : ''}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      <Button
        title="Post to server"
        onPress={async () => {
          await pushMessage({
            expo_push_token: expoPushToken || '',
            title: 'Hello',
            body: 'World',
          });
        }}
      />
      <Button
        title="Get from server"
        onPress={async () => {
          try {
            const response = await axios.get('http://127.0.0.1:3000/');
            console.log('Response:', response.data);
          } catch (error) {
            console.error(
              'Error:',
              error.response ? error.response.data : error.message
            );
          }
        }}
      />
      <Button
        title="Post to server2"
        onPress={async () => {
          await handlePostSubmit();
        }}
      />
      <Button
        title="Get from server2"
        onPress={async () => {
          try {
            fetch('https://jsonplaceholder.typicode.com/todos/1')
              .then((response) => response.json())
              .then((json) => console.log(json));
          } catch (error) {
            console.error(
              'Error:',
              error.response ? error.response.data : error.message
            );
          }
        }}
      />
    </View>
  );
}
