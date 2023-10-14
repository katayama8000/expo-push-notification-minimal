import React, { FC } from 'react';
import { Button, View } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/FBConfig';

export const TryDetailScreen: FC = () => {
  const add = async () => {
    const docRef = await addDoc(collection(db, 'myCollection'), {
      country: 'Japan',
      name: 'Tokyo',
    });
    console.log('Document written with ID: ', docRef.id);
  };
  return (
    <View>
      <Button title="detail" onPress={add} />
    </View>
  );
};
